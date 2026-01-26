/* eslint-disable sonarjs/no-dead-store */
/* eslint-disable sonarjs/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {summary} from '@actions/core'

const coverageSummaryPath = join(
  process.cwd(),
  'coverage',
  'coverage-summary.json',
)

const displayCoverageSummary = () => {
  const coverageSummaryRaw = readFileSync(coverageSummaryPath, 'utf-8')
  const coverageSummary = JSON.parse(coverageSummaryRaw) as {
    total: {
      branches: {covered: number; pct: number; skipped: number; total: number}
      functions: {covered: number; pct: number; skipped: number; total: number}
      lines: {covered: number; pct: number; skipped: number; total: number}
      statements: {covered: number; pct: number; skipped: number; total: number}
    }
  }

  summary.addRaw('## Coverage Summary from typescript ##')

  //   for (const [filePath, metrics] of Object.entries(coverageSummary)) {
  const metrics = coverageSummary.total

  // if (filePath === 'total') continue
  // info(`\nFile: ${filePath}`)
  for (const [metricName, metricData] of Object.entries(metrics.lines)) {
    summary.addRaw(
      `  Lines - Total: ${metrics.lines.total}, Covered: ${
        metrics.lines.covered
      }, Percentage: ${metrics.lines.pct}%`,
    )
  }

  for (const [metricName, metricData] of Object.entries(metrics.functions)) {
    summary.addRaw(
      `  Functions - Total: ${metrics.functions.total}, Covered: ${
        metrics.functions.covered
      }, Percentage: ${metrics.functions.pct}%`,
    )
  }

  for (const [metricName, metricData] of Object.entries(metrics.statements)) {
    summary.addRaw(
      `  Statements - Total: ${metrics.statements.total}, Covered: ${
        metrics.statements.covered
      }, Percentage: ${metrics.statements.pct}%`,
    )
  }

  for (const [metricName, metricData] of Object.entries(metrics.branches)) {
    summary.addRaw(
      `  Branches - Total: ${metrics.branches.total}, Covered: ${
        metrics.branches.covered
      }, Percentage: ${metrics.branches.pct}%`,
    )
  }
  //   }
}

displayCoverageSummary()
