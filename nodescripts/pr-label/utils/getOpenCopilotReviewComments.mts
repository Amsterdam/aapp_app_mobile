import * as core from '@actions/core'

import {isCopilotLogin} from './isCopilotLogin.mts'
import {octokit, context} from './octokit.mts'
import type {PackageConfig} from './config.mts'

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

export const getOpenCopilotReviewComments = async (
  pullNumber: number,
  config: Required<PackageConfig>,
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

        const hasCopilotComment = thread.comments.nodes.some(comment =>
          isCopilotLogin(comment.author?.login, config),
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
