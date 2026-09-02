import type {PackageConfig} from './config.mts'
import type {Label} from './types'

const replaceMatchesInString = (
  value: string,
  match: RegExpExecArray,
): string =>
  value.replace(
    /\$(\d+)/g,
    (_, groupIndex: string) => match[Number.parseInt(groupIndex, 10)] ?? '',
  )

export const getTouchedFilesLabels = (
  changedFiles: string[],
  config: Required<PackageConfig>,
): Label[] => {
  const labelsToAdd = new Map<string, Label>()

  for (const file of changedFiles) {
    Object.entries(config.labels).forEach(([pattern, label]) => {
      const match = new RegExp(pattern).exec(file)

      if (match) {
        const labelName = replaceMatchesInString(label.name, match)
        const labelDescription = label.description
          ? replaceMatchesInString(label.description, match)
          : undefined

        labelsToAdd.set(labelName, {
          color: label.color,
          name: labelName,
          description: labelDescription,
        })
      }
    })
  }

  return [...labelsToAdd.values()].sort((leftLabel, rightLabel) =>
    leftLabel.name.localeCompare(rightLabel.name),
  )
}
