import fs from 'node:fs'
import path from 'node:path'
import {config} from '../../codegen.config.mts'
import {runCodeGen} from './utils/runCodegen.mts'

const watchDir = (dir: string, files: string[], watchAllEvents = false) => {
  fs.watch(dir, (_eventType, filename) => {
    if (watchAllEvents || files.some(file => filename === file)) {
      runCodeGen()
    }
  })
}

// Recursively set up watchers for all subdirectories in 'modules'
const setupDirWatchers = (dir: string, files: string[]) => {
  watchDir(dir, files)
  const entries = fs.readdirSync(dir, {withFileTypes: true})

  for (const entry of entries) {
    if (entry.isDirectory()) {
      setupDirWatchers(path.join(dir, entry.name), files)
    }
  }
}

const setupWatchers = () => {
  const dirToMatches = new Map<string, Set<string>>()
  const rootDirectoriesToWatch = new Set<string>()

  config.forEach(configItem => {
    const fullPath = path.resolve(configItem.inputDir)

    if (configItem.type === 'directories') {
      rootDirectoriesToWatch.add(fullPath)

      return
    }

    if (!dirToMatches.has(fullPath)) {
      dirToMatches.set(fullPath, new Set())
    }

    dirToMatches.get(fullPath)!.add(configItem.match)
  })

  for (const [fullPath, matchesSet] of dirToMatches.entries()) {
    console.log(
      `Watching directory: ${fullPath} for changes in: ${Array.from(matchesSet).join(', ')}`,
    )
    setupDirWatchers(fullPath, Array.from(matchesSet))
  }

  for (const fullPath of rootDirectoriesToWatch) {
    console.log(`Watching root directory entries: ${fullPath}`)
    watchDir(fullPath, [], true)
  }
}

setupWatchers()
