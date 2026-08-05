import * as core from '@actions/core'
import * as github from '@actions/github'

// eslint-disable-next-line no-process-env
const GITHUB_TOKEN = process.env.GH_TOKEN as string

if (!GITHUB_TOKEN) {
  core.setFailed(
    'GH_TOKEN environment variable is required (typically provided as secrets.GITHUB_TOKEN).',
  )
  process.exit(1)
}

export const octokit = github.getOctokit(GITHUB_TOKEN)
export const context = github.context
