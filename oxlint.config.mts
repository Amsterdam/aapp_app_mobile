import sonarjs from 'eslint-plugin-sonarjs'
import {defineConfig} from 'oxlint'
import {getRulesFromPluginConfig} from './oxlint.utils.mts'

const {rules: sonarjsRecommendedLegacyRules} = getRulesFromPluginConfig(
  sonarjs,
  'recommended-legacy',
)

// eslint-disable-next-line import-x/no-default-export
export default defineConfig({
  plugins: ['typescript', 'unicorn', 'oxc', 'react'],
  jsPlugins: [
    './eslint-plugin-amsterdam/index.mts',
    'eslint-plugin-storybook',
    'eslint-plugin-sonarjs',
  ],
  categories: {
    correctness: 'error',
  },
  rules: {
    ...sonarjsRecommendedLegacyRules,
    'sonarjs/no-misleading-array-reverse': 'off', // not (yet) supported in Hermes
    'sonarjs/no-ignored-exceptions': 'off', // does not (yet) detect a correct catch implementation
    'sonarjs/no-nested-conditional': 'off',
    'sonarjs/todo-tag': 'off',
    'sonarjs/no-selector-parameter': 'off',
    'sonarjs/void-use': 'off',
    'sonarjs/deprecation': 'off',
    'sonarjs/function-return-type': 'off', // temporarily off because of the high number of hits
    'eslint/no-async-promise-executor': 'warn',
    'amsterdam/no-relative-file-import': 'warn',
    'amsterdam/no-type-import-for-function-component': 'warn',
    'amsterdam/jsx-strict-logical-expression': 'error',
    'amsterdam/jsx-prefer-coerced-and-over-null-ternary': 'error',
    'amsterdam/todo-comment-requires-ticket': 'warn',
    'no-process-env': 'error',
    '@typescript-eslint/no-empty-function': 'warn',
    'no-shadow': 'error',
    'no-void': ['error', {allowAsStatement: true}],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@/providers/piwik.context',
            importNames: ['PiwikContext'],
            message:
              'Do not use PiwikContext directly. The logging methods are exposed via the usePiwik hook.',
          },
          {
            name: '@react-navigation/stack',
            importNames: ['createStackNavigator'],
            message:
              'Import createStackNavigator from @/utils/navigation/createStackNavigator.',
          },
          {
            name: '@react-native-community/netinfo',
            message: 'Get the internet state from the internet redux slice.',
          },
          {
            name: 'dayjs',
            importNames: ['default'],
            message:
              'Import dayjs from @/utils/datetime to prevent timezone issues.',
          },
          {
            name: 'react-native-device-info',
            importNames: ['getUniqueId', 'getUniqueIdSync'],
            message:
              'Do not use getUniqueId, this is considered personal (privacy sensitive) information.',
          },
          {
            name: 'react-redux',
            importNames: ['useDispatch', 'useSelector', 'useStore'],
            message: 'Import useDispatch and useSelector from @/hooks/redux.',
          },
          {
            name: '@react-navigation/core',
            message: 'Import from @react-navigation/native instead.',
          },
          {
            name: '@react-navigation/native',
            importNames: [
              'NavigationProp',
              'RouteProp',
              'useNavigation',
              'useRoute',
            ],
            message:
              'Import NavigationProp and RouteProp from @/app/navigation/types; useNavigation and useRoute from @/hooks/navigation/.',
          },
          {
            name: 'react-native',
            importNames: ['Pressable', 'PressableProps'],
            message:
              'Import Pressable and PressableProps from @/components/ui/buttons/Pressable.',
          },
          {
            name: 'react-native-maps',
            importNames: ['Marker'],
            message: 'Import Marker from @/components/features/map/marker.',
          },
          {
            name: 'react-native-clusterer',
            importNames: ['Clusterer'],
            message:
              'Import Clusterer from @/components/features/map/cluster/Clusterer.',
          },
          {
            name: 'react-native-reanimated-carousel',
            importNames: ['default', 'Pagination'],
            message:
              'Import Carousel and Pagination from @/components/ui/carousel/Carousel.',
          },
        ],
      },
    ],
    'restrict-template-expressions': 'error',
  },
  env: {
    builtin: true,
  },
  overrides: [
    {
      files: ['eslint-plugin-amsterdam/*.test.ts'],
      rules: {
        'amsterdam/prefer-multiline-eslint-test-strings': 'warn',
      },
    },
    {
      files: [
        'react-native-block-screenshot/**/*',
        'react-native-salesforce-messaging-in-app/**/*',
      ],
      rules: {
        'amsterdam/no-relative-file-import': 'off',
        'no-restricted-imports': 'off',
      },
    },
    {
      files: ['.storybook/**/*', '*.stories.tsx'],
      rules: {
        'import-x/no-default-export': 'off',
        'no-restricted-imports': 'off',
        'sonarjs/no-identical-functions': 'off',
        'amsterdam/no-relative-file-import': 'off',
      },
    },
    {
      files: ['*.stories.tsx'],
      rules: {
        'storybook/await-interactions': 'error',
        'storybook/context-in-play-function': 'error',
        'storybook/csf-component': 'error',
        'storybook/default-exports': 'error',
        'storybook/hierarchy-separator': 'error',
        'storybook/meta-satisfies-type': 'error',
        'storybook/no-redundant-story-name': 'error',
        'storybook/no-renderer-packages': 'error',
        'storybook/no-stories-of': 'error',
        'storybook/no-title-property-in-meta': 'error',
        'storybook/no-uninstalled-addons': 'error',
        'storybook/prefer-pascal-case': 'error',
        'storybook/story-exports': 'error',
        'storybook/use-storybook-expect': 'error',
        'storybook/use-storybook-testing-library': 'error',
        'storybook/meta-inline-properties': 'error',
      },
    },
    // Jest
    {
      files: ['*.test.ts', '*.test.tsx', '*.test.mts', '*.test.mtsx'],
      rules: {
        'no-restricted-imports': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'sonarjs/no-duplicate-string': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        'sonarjs/no-undefined-argument': 'off',
      },
    },
    {
      files: ['eslint-plugin-amsterdam/*.test.ts'],
      rules: {
        'amsterdam/prefer-multiline-eslint-test-strings': 'warn',
      },
    },
  ],
  ignorePatterns: [
    '**/*.d.ts',
    '!.storybook',
    '!.*',
    'node_modules',
    'android',
    'patches',
    'pipelines',
    'storybook-static',
    'coverage',
    '.git',
    'ios',
    '.jest',
    '.expo',
    'android/link-assets-manifest.json',
    'ios/link-assets-manifest.json',
  ],
})
