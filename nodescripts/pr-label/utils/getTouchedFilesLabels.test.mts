import {getTouchedFilesLabels} from './getTouchedFilesLabels.mts'
import type {PackageConfig} from './config.mts'

const createConfig = (
  labels: NonNullable<Required<PackageConfig>['labels']>,
): Required<PackageConfig> => ({
  codeReviewedColor: '#05b103',
  codeReviewedEnabled: true,
  codeReviewedLabel: 'Code reviewed',
  copilotLogins: ['github-copilot[bot]'],
  copilotReadyColor: '#05b103',
  copilotReadyEnabled: true,
  copilotReadyLabel: 'Copilot ready',
  labels,
  prDescriptionCopilotSectionAfter: '## Test instructions',
  prDescriptionCopilotSectionBefore: '# Changes',
  reviewerUsernames: [],
  prDescriptionUpdateEnabled: true,
})

describe('getTouchedFilesLabels', () => {
  it('returns label objects sorted by name', () => {
    const config = createConfig({
      '^ios/': {
        color: '#111111',
        name: 'ios',
      },
      '^android/': {
        color: '#222222',
        name: 'android',
      },
    })

    expect(
      getTouchedFilesLabels(
        ['ios/App.tsx', 'android/app/build.gradle'],
        config,
      ),
    ).toEqual([
      {color: '#222222', name: 'android'},
      {color: '#111111', name: 'ios'},
    ])
  })

  it('deduplicates labels by resolved name', () => {
    const config = createConfig({
      '^src/modules/([^/]+)/': {
        color: '#0366d6',
        name: 'module:$1',
      },
      '^src/shared/': {
        color: '#f9d0c4',
        name: 'shared',
      },
    })

    expect(
      getTouchedFilesLabels(
        [
          'src/modules/home/index.ts',
          'src/modules/home/view.ts',
          'src/shared/theme.ts',
        ],
        config,
      ),
    ).toEqual([
      {color: '#0366d6', name: 'module:home'},
      {color: '#f9d0c4', name: 'shared'},
    ])
  })
})
