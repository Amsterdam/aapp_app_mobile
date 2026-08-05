import {MODULE_PATH_RE} from '../constants.mts'

export const getTouchedModuleNames = (changedFiles: string[]): string[] => {
  const moduleNames = new Set<string>()

  for (const file of changedFiles) {
    const match = MODULE_PATH_RE.exec(file)

    if (match?.[1]) {
      moduleNames.add(match[1])
    }
  }

  return [...moduleNames].sort((a, b) => a.localeCompare(b))
}
