import * as core from '@actions/core'
import * as github from '@actions/github'

// eslint-disable-next-line no-process-env
const GITHUB_TOKEN = process.env.GH_TOKEN as string

const MODULE_LABEL_PREFIX = 'module:'
const MODULE_LABEL_COLOR = '0366d6'
const GENERAL_LABEL_COLOR = '036d66'
const COPILOT_READY_LABEL = 'Copilot ready'
const APPROVED_LABEL = 'Approved'
const HTTP_STATUS_UNPROCESSABLE_ENTITY = 422

const COPILOT_LOGINS = new Set(['github-copilot[bot]'])

const MODULE_PATH_RE = /^src\/modules\/([^/]+)\//

if (!GITHUB_TOKEN) {
  core.setFailed(
    'GH_TOKEN environment variable is required (typically provided as secrets.GITHUB_TOKEN).',
  )
  process.exit(1)
}

const octokit = github.getOctokit(GITHUB_TOKEN)
const context = github.context

const isCopilotLogin = (login: string | null | undefined): boolean => {
  if (!login) {
    return false
  }

  const normalized = login.toLowerCase()

  return (
    COPILOT_LOGINS.has(normalized) ||
    normalized.includes('copilot') ||
    normalized === 'copilot'
  )
}

const getPullRequestNumber = (): number => {
  const pr = context.payload.pull_request

  if (!pr) {
    core.setFailed('No pull request found in GitHub context.')
    process.exit(1)
  }

  return pr.number
}

const getChangedFiles = async (pullNumber: number): Promise<string[]> => {
  const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: pullNumber,
    per_page: 100,
  })

  return files.map(f => f.filename)
}

const getTouchedModuleNames = (changedFiles: string[]): string[] => {
  const moduleNames = new Set<string>()

  for (const file of changedFiles) {
    const match = MODULE_PATH_RE.exec(file)

    if (match?.[1]) {
      moduleNames.add(match[1])
    }
  }

  return [...moduleNames].sort((a, b) => a.localeCompare(b))
}

const getTouchedGeneralLabels = (changedFiles: string[]): string[] => {
  const generalLabels = new Set<string>()

  for (const file of changedFiles) {
    if (
      file.startsWith('pipelines/') ||
      file.startsWith('.github/workflows/') ||
      file.startsWith('.github/actions/')
    ) {
      generalLabels.add('pipelines')
    }

    if (file.startsWith('android/')) {
      generalLabels.add('android')
    }

    if (file.startsWith('ios/') && file !== 'ios/Podfile.lock') {
      generalLabels.add('ios')
    }

    if (
      file === 'package-lock.json' ||
      file === 'ios/Podfile.lock' ||
      file === 'Gemfile' ||
      file === 'Gemfile.lock'
    ) {
      generalLabels.add('dependencies')
    }
  }

  return [...generalLabels].sort((a, b) => a.localeCompare(b))
}

const getLabelsAlreadyOnPullRequest = async (
  pullNumber: number,
): Promise<Set<string>> => {
  const labels = await octokit.paginate(octokit.rest.issues.listLabelsOnIssue, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: pullNumber,
    per_page: 100,
  })

  return new Set(labels.map(l => l.name))
}

const ensureRepoLabelExists = async (
  labelName: string,
  color: string,
  description: string,
) => {
  try {
    await octokit.rest.issues.createLabel({
      owner: context.repo.owner,
      repo: context.repo.repo,
      name: labelName,
      color,
      description,
    })
    core.info(`Created missing label: ${labelName}`)
  } catch (e: unknown) {
    const status = (e as {status?: number})?.status

    // 422 = already exists / validation error
    if (status === HTTP_STATUS_UNPROCESSABLE_ENTITY) {
      return
    }

    throw e
  }
}

const addLabels = async (
  pullNumber: number,
  labelNames: string[],
  color: string,
  description: string,
) => {
  if (labelNames.length === 0) {
    core.info('No new labels to add.')
  } else {
    core.info(`Ensuring labels exist: ${labelNames.join(', ')}`)

    for (const label of labelNames) {
      await ensureRepoLabelExists(label, color, description)
    }

    core.info(`Adding labels to PR: ${labelNames.join(', ')}`)
    await octokit.rest.issues.addLabels({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pullNumber,
      labels: labelNames,
    })
  }
}

const getIsReviewedByCopilotAndTeam = async (
  pullNumber: number,
): Promise<{copilot: boolean; team: boolean}> => {
  const reviews = await octokit.paginate(octokit.rest.pulls.listReviews, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: pullNumber,
    per_page: 100,
  })

  return {
    copilot: reviews.some(r => isCopilotLogin(r.user?.login)),
    team: reviews.some(
      r =>
        (r.author_association === 'OWNER' ||
          r.author_association === 'MEMBER') &&
        r.state === 'APPROVED',
    ),
  }
}

type ReviewThreadCommentNode = {
  author: {login: string | null} | null
}

type ReviewThreadNode = {
  comments: {nodes: ReviewThreadCommentNode[]}
  isOutdated: boolean
  isResolved: boolean
}

type ReviewThreadsQueryResponse = {
  repository: {
    pullRequest: {
      reviewThreads: {
        nodes: ReviewThreadNode[]
        pageInfo: {endCursor: string | null; hasNextPage: boolean}
      }
    }
  }
}

const REVIEW_THREADS_QUERY = `query($owner: String!, $repo: String!, $number: Int!, $after: String) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $number) {
      reviewThreads(first: 100, after: $after) {
        nodes {
          isResolved
          isOutdated
          comments(first: 50) {
            nodes {
              author {
                login
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
}`

const getOpenCopilotReviewComments = async (
  pullNumber: number,
): Promise<number> => {
  try {
    let after: string | null = null
    let openCopilotThreads = 0

    while (true) {
      const data: ReviewThreadsQueryResponse =
        await octokit.graphql<ReviewThreadsQueryResponse>(
          REVIEW_THREADS_QUERY,
          {
            owner: context.repo.owner,
            repo: context.repo.repo,
            number: pullNumber,
            after,
          },
        )

      const threads = data.repository.pullRequest.reviewThreads.nodes

      for (const thread of threads) {
        if (thread.isResolved || thread.isOutdated) {
          continue
        }

        const hasCopilotComment = thread.comments.nodes.some(c =>
          isCopilotLogin(c.author?.login),
        )

        if (hasCopilotComment) {
          openCopilotThreads += 1
        }
      }

      if (!data.repository.pullRequest.reviewThreads.pageInfo.hasNextPage) {
        break
      }

      after = data.repository.pullRequest.reviewThreads.pageInfo.endCursor
    }

    return openCopilotThreads
  } catch (e: unknown) {
    core.info(`GraphQL reviewThreads query failed: ${(e as Error).message}`)
    throw e
  }
}

const main = async () => {
  const pullNumber = getPullRequestNumber()
  const changedFiles = await getChangedFiles(pullNumber)

  const alreadyOnPr = await getLabelsAlreadyOnPullRequest(pullNumber)

  core.info(`Changed files: ${changedFiles.join(', ')}`)

  const moduleNames = getTouchedModuleNames(changedFiles)

  if (moduleNames.length === 0) {
    core.info(
      'No changes detected under src/modules/*; skipping module labels.',
    )
  } else {
    const labelsToAdd = moduleNames
      .map(name => `${MODULE_LABEL_PREFIX}${name}`)
      .filter(l => !alreadyOnPr.has(l))

    await addLabels(
      pullNumber,
      labelsToAdd,
      MODULE_LABEL_COLOR,
      'Module touched based on changed src/modules folder(s).',
    )
  }

  const generalNames = getTouchedGeneralLabels(changedFiles)

  if (generalNames.length === 0) {
    core.info(
      'No changes detected in pipelines/, .github/*, android/, ios/, or dependency lockfiles; skipping general labels.',
    )
  } else {
    const labelsToAdd = generalNames.filter(l => !alreadyOnPr.has(l))

    await addLabels(
      pullNumber,
      labelsToAdd,
      GENERAL_LABEL_COLOR,
      'Auto-added label, based on modified files.',
    )
  }

  const openCopilotReviewComments =
    await getOpenCopilotReviewComments(pullNumber)
  const {copilot: isReviewedByCopilot, team: isReviewedByTeam} =
    await getIsReviewedByCopilotAndTeam(pullNumber)

  if (isReviewedByCopilot && openCopilotReviewComments === 0) {
    if (!alreadyOnPr.has(COPILOT_READY_LABEL)) {
      core.info(`Adding labels to PR: ${COPILOT_READY_LABEL}`)
      await addLabels(
        pullNumber,
        [COPILOT_READY_LABEL],
        GENERAL_LABEL_COLOR,
        'Copilot review completed with no open comments.',
      )
    }
  } else if (alreadyOnPr.has(COPILOT_READY_LABEL)) {
    core.info(`Removing label from PR: ${COPILOT_READY_LABEL}`)
    await octokit.rest.issues.removeLabel({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pullNumber,
      name: COPILOT_READY_LABEL,
    })
  }

  if (isReviewedByTeam) {
    core.info('PR has been approved by a team member.')
    await addLabels(
      pullNumber,
      [APPROVED_LABEL],
      GENERAL_LABEL_COLOR,
      'PR has been approved by a team member.',
    )
  } else {
    await octokit.rest.issues.removeLabel({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pullNumber,
      name: APPROVED_LABEL,
    })
  }
}

try {
  await main()
} catch (e: unknown) {
  core.setFailed((e as Error).message)
}
