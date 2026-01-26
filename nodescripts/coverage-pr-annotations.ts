import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import * as core from '@actions/core'
import * as github from '@actions/github'

type CoverageData = {
  [filePath: string]: {
    branches: {covered: number; pct: number; skipped: number; total: number}
    functions: {covered: number; pct: number; skipped: number; total: number}
    lines: {covered: number; pct: number; skipped: number; total: number}
    statements: {covered: number; pct: number; skipped: number; total: number}
  }
}

// --- CONFIG ---
const COVERAGE_FILE = join(process.cwd(), 'coverage', 'coverage-final.json')
// eslint-disable-next-line no-process-env
const GITHUB_TOKEN = process.env.GH_TOKEN as string

if (!GITHUB_TOKEN) {
  core.setFailed(
    'GITHUB_TOKEN input is required. Set it as an action input or environment variable.',
  )
  process.exit(1)
}

const octokit = github.getOctokit(GITHUB_TOKEN)
const context = github.context

const getChangedFiles = async (): Promise<string[]> => {
  const pr = context.payload.pull_request

  if (!pr) {
    core.setFailed('No pull request found in GitHub context.')
    process.exit(1)
  }

  const {data: files} = await octokit.rest.pulls.listFiles({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: pr.number,
    per_page: 100,
  })

  return files.map(f => f.filename)
}

const getUncoveredLines = (coverage: CoverageData, file: string): number[] => {
  const fileCoverage = coverage[file]

  if (!fileCoverage?.lines) {
    return []
  }

  const uncovered: number[] = []

  for (const [line, hit] of Object.entries(fileCoverage.lines)) {
    if (typeof hit === 'number' && hit === 0) {
      uncovered.push(Number(line))
    }
  }

  return uncovered
}

const main = async () => {
  // Read coverage report
  const coverageRaw = readFileSync(COVERAGE_FILE, 'utf-8')
  const coverage = JSON.parse(coverageRaw) as CoverageData

  // Get changed files in PR
  const changedFiles = await getChangedFiles()

  core.info(`Changed files: ${changedFiles.join(', ')}`)

  let summary = '## Coverage for Changed Files\n\n'
  let hasAnnotations = false

  for (const file of changedFiles) {
    if (!coverage[file]) {
      continue
    }

    const fileCov = coverage[file]
    const pct = fileCov.lines.pct

    summary += `**${file}**: ${pct}% lines covered\n`
    const uncovered = getUncoveredLines(coverage, file)

    if (uncovered.length > 0) {
      summary += `  - Uncovered lines: ${uncovered.join(', ')}\n`

      // Add GitHub annotation for each uncovered line
      for (const line of uncovered) {
        core.warning('Uncovered line', {
          file,
          startLine: line,
          endLine: line,
        })
        hasAnnotations = true
      }
    }
  }

  if (!hasAnnotations) {
    summary += '\nAll changed files are fully covered!\n'
  }

  core.summary.addRaw(summary)
  await core.summary.write()
}

main().catch((e: Error) => core.setFailed(e.message))
