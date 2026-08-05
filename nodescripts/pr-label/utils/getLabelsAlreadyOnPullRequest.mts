import {octokit, context} from './octokit.mts'

export const getLabelsAlreadyOnPullRequest = async (
  pullNumber: number,
): Promise<Set<string>> => {
  const labels = await octokit.paginate(octokit.rest.issues.listLabelsOnIssue, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: pullNumber,
    per_page: 100,
  })

  return new Set(labels.map(label => label.name))
}
