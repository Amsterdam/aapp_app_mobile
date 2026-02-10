// This file has been automatically migrated to valid ESM format by Storybook.
import {createRequire} from 'node:module'
import path, {dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {StorybookConfig} from '@storybook/react-native-web-vite'
import {mergeConfig} from 'vite'
import svgr from 'vite-plugin-svgr'
import alias from '../.config/alias.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

const aliases = Object.entries(alias as Record<string, string>).map(
  ([find, replacement]) => ({
    find,
    replacement: path.resolve(__dirname, `.${replacement}`),
  }),
)

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
    '@storybook/addon-docs',
  ],

  framework: {
    name: '@storybook/react-native-web-vite',
    options: {
      builder: {},
      pluginReactOptions: {
        babel: {
          parserOpts: {
            plugins: [],
          },
        },
      },
    },
  },

  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },

  docs: {},

  staticDirs: ['./public'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  viteFinal: viteConfig =>
    mergeConfig(viteConfig, {
      build: {
        commonjsOptions: {
          transformMixedEsModules: true,
        },
      },
      plugins: [
        svgr({
          svgrOptions: {
            exportType: 'default',
          },
          include: '**/*.svg',
        }),
      ],
      resolve: {
        // this list is ordered: higher items are matched first
        alias: [
          {
            find: 'react-native-image-crop-picker',
            replacement: require.resolve('./mocks/image-crop-picker'),
          },
          {
            find: 'react-native-barcode-creator',
            replacement: require.resolve(
              './mocks/react-native-barcode-creator',
            ),
          },
          {
            find: 'react-native-safe-area-context',
            replacement: require.resolve('./mocks/safe-area-context'),
          },
          {
            find: 'react-native-keyboard-controller',
            replacement: require.resolve(
              './mocks/react-native-keyboard-controller',
            ),
          },
          {
            find: 'react-native-svg',
            replacement: 'react-native-svg-web',
          },
          {
            find: 'react-native',
            replacement: 'react-native-web',
          },
          {
            find: '@env',
            replacement: require.resolve('./mocks/env'),
          },
          {
            find: '@notifee/react-native',
            replacement: require.resolve('./mocks/notifee'),
          },
          {
            find: '@react-native-firebase/messaging',
            replacement: require.resolve('./mocks/firebase'),
          },
          {
            find: '@microsoft/applicationinsights-web',
            replacement: require.resolve('./mocks/application-insights-web'),
          },
          {
            find: 'react-native-date-picker',
            replacement: require.resolve('./mocks/react-native-date-picker'),
          },
          {
            find: 'expo-clipboard',
            replacement: require.resolve('./mocks/expo-clipboard'),
          },
          ...aliases,
        ],
      },
    }),

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}

export default config
