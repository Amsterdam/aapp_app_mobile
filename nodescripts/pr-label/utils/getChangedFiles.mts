import {octokit, context} from './octokit.mts'

export const getChangedFiles = async (pullNumber: number): Promise<string[]> => {
  const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: pullNumber,
    per_page: 100,
  })

  return files.map(file => file.filename)
}