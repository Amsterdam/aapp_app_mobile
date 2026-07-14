import fs from 'node:fs'
import path from 'node:path'
import {config} from '../../codegen.config.mts'
import {runCodeGen} from './utils/runCodegen.mts'
import {sleep} from '@/utils/sleep'

const IGNORE_DIRS = ['generated', 'utils']

const watchDir = (dir: string, files: string[]) => {
  fs.watch(dir, (eventType, filename) => {
    if (files.some(file => filename === file)) {
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
  // Group all match properties by inputDir
  const dirToMatches = new Map<string, Set<string>>()

  config.forEach(({inputDir, match}) => {
    const fullPath = path.resolve(inputDir)

    if (!dirToMatches.has(fullPath)) {
      dirToMatches.set(fullPath, new Set())
    }

    dirToMatches.get(fullPath)!.add(match)
  })

  for (const [fullPath, matchesSet] of dirToMatches.entries()) {
    console.log(
      `Watching directory: ${fullPath} for changes in: ${Array.from(matchesSet).join(', ')}`,
    )
    setupDirWatchers(fullPath, Array.from(matchesSet))
  }

  fs.watch('src/modules', async eventType => {
    if (eventType !== 'rename') {
      return
    }

    await sleep(1000) // Wait for the filesystem to settle

    const modules = await fs.promises.readdir('src/modules', {
      withFileTypes: true,
    })
    const moduleDirs = modules
      .filter(
        dirent => dirent.isDirectory() && !IGNORE_DIRS.includes(dirent.name),
      )
      .map(dirent => dirent.name)

    await fs.promises.writeFile(
      path.join('src/modules', 'generated', 'slugs.generated.ts'),
      `// This file is auto-generated. Do not edit manually.

      export enum ModuleSlug {
      ${moduleDirs.map(dir => `'${dir}' = '${dir}'`).join(',\n  ')}
    }
    `,
    )
  })
}

setupWatchers()
