export const getTouchedGeneralLabels = (changedFiles: string[]): string[] => {
  const generalLabels = new Set<string>()

  for (const file of changedFiles) {
    if (
      file.startsWith('pipelines/') ||
      file.startsWith('.github/workflows/') ||
      file.startsWith('.github/actions/')
    ) {
      generalLabels.add('pipelines')
    }

    if (file.startsWith('android/')) {
      generalLabels.add('android')
    }

    if (file.startsWith('ios/') && file !== 'ios/Podfile.lock') {
      generalLabels.add('ios')
    }

    if (
      file === 'package-lock.json' ||
      file === 'ios/Podfile.lock' ||
      file === 'Gemfile' ||
      file === 'Gemfile.lock'
    ) {
      generalLabels.add('dependencies')
    }
  }

  return [...generalLabels].sort((a, b) => a.localeCompare(b))
}