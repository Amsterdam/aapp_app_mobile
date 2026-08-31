import type {PackageConfig} from './nodescripts/pr-label/utils/config.mts'

export const config: PackageConfig = {
  labels: {
    '^(?:pipelines/|\\.github/(?:workflows|actions)/)': {
      name: 'pipelines',
      color: '#036d66',
      description: 'Pipeline related',
    },
    '^(?:package-lock\\.json|ios/Podfile\\.lock|Gemfile(?:\\.lock)?)$': {
      name: 'dependencies',
      color: '#634991',
      description: 'Dependency related',
    },
    '^android/': {
      name: 'android',
      color: '#036d66',
      description: 'Android related',
    },
    '^ios/(?!Podfile.lock$)': {
      name: 'ios',
      color: '#036d66',
      description: 'iOS related',
    },
    '^src/modules/([^/]+)//': {
      name: 'module:$1',
      color: '#0366d6',
      description: 'Module related',
    },
    '^nodescripts/': {
      name: 'nodescripts',
      color: '#634991',
      description: 'Node scripts related',
    },
  },
  prDescriptionCopilotSectionBefore: '# Changes',
  prDescriptionCopilotSectionAfter: '## Test instructions',
  reviewerUsernames: [
    'frankfe-amsterdam',
    'RikSchefferAmsterdam',
    'WouterAms',
    'fhaver-amsterdam',
    'jjbeekman',
  ],
}
