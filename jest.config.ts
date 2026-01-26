import {Config} from 'jest'

// eslint-disable-next-line no-process-env
process.env.TZ = 'UTC+1'

const config: Config = {
  preset: 'react-native',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
    'mts',
    'mtsx',
  ],
  // testMatch: ['**/?(*.)+(spec|test).[tj]s', '**/?(*.)+(spec|test).mts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mts|mtsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '@microsoft/applicationinsights-react-native':
      '<rootDir>/.storybook/mocks/application-insights-react-native',
    '@microsoft/applicationinsights-web':
      '<rootDir>/.storybook/mocks/application-insights-web',
  },
  setupFiles: [
    './.config/jest-init.js',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/node_modules/react-native/jest/setup.js',
  ],
  testPathIgnorePatterns: [
    'node_modules',
    'android',
    'ios',
    '.git',
    '.storybook',
    '.vscode',
    '.husky',
    'logs',
    'patches',
  ],
  cacheDirectory: '.jest/cache',
  coverageReporters: ['json', 'json-summary', 'cobertura'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/*.stories.{ts,tsx}',
    '!src/processes/piwik/init.ts',
    '!**/*.screen.{ts,tsx}',
    '!**/*.d.ts',
    '!**/*.mock.ts',
    '!**/slice.ts',
    '!**/types.ts',
    '!**/alerts.ts',
    '!**/constants.ts',
    '!**/index.ts',
  ],
  reporters: [
    ['github-actions', {silent: false}],
    'summary',
    [
      'jest-trx-results-processor',
      {
        outputFile: './.jest/jestTestResults.trx',
        defaultUserName: 'user name to use if automatic detection fails',
      },
    ],
  ],
  testTimeout: 30000,
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@notifee|@react-navigation)',
  ],
  globals: {
    API_KEY_DEV: '',
    API_KEY_TEST: '',
    API_KEY_ACC: '',
    API_KEY_PROD: '',
    VERSION: '0.0.0',
    BUILD_NUMBER: 0,
    PIWIK_PRO_URL: '',
    PIWIK_PRO_ID: '',
    PIWIK_PRO_URL_ACCEPT: '',
    PIWIK_PRO_ID_ACCEPT: '',
    APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_DEV: '',
    APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_TEST: '',
    APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_ACC: '',
    APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_PROD: '',
  },
}

// eslint-disable-next-line import-x/no-default-export
export default config
