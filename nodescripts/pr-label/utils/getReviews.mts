import {octokit, context} from './octokit.mts'

export const getReviews = async (pullNumber: number) =>
  octokit.paginate(octokit.rest.pulls.listReviews, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: pullNumber,
    per_page: 100,
  })
