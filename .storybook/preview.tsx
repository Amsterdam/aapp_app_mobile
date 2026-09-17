/* eslint-disable react-refresh/only-export-components */
import {NavigationContainer} from '@react-navigation/native'
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from '@storybook/addon-docs/blocks'
import {Preview, type StoryContext} from '@storybook/react-native-web-vite'
import {FC} from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import {DeviceProvider} from '../src/providers/device.provider'
import {StoreProvider} from '../src/providers/store.provider'
import {baseColor} from '../src/themes/tokens/base-color'
import {devLog} from '@/processes/development'
import {AppInsightsProvider} from '@/providers/appinsights.provider'

import './preview.css'

const MainDecorator = (Story: FC, context: StoryContext) => {
  const theme = context.globals.theme as 'dark' | 'light'

  devLog(`TODO: process storybook ${theme} theme switching and inject into app. For example:

  const MainDecorator = (Story, context) => {
    const selectedTheme =
      context.globals.theme === 'dark' ? 'dark' : 'light'

    return (
      <StoreProvider initialTheme={selectedTheme}>
        <Story />
      </StoreProvider>
    )
}`)

  return (
    <AppInsightsProvider>
      <NavigationContainer>
        <StoreProvider>
          <DeviceProvider>
            <Story />
          </DeviceProvider>
        </StoreProvider>
      </NavigationContainer>
    </AppInsightsProvider>
  )
}

const preview: Preview = {
  decorators: [MainDecorator],

  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          {value: 'light', title: 'Light'},
          {value: 'dark', title: 'Dark'},
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    docs: {
      codePanel: true,
      toc: {
        disable: false,
        headingSelector: 'h1, h2, h3',
      },
      page: () => (
        // Customize the order in which the docs are structured and add/remove blocks https://storybook.js.org/docs/writing-docs/doc-blocks#available-blocks
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
    },

    backgrounds: {
      options: {
        'custom-grey0': {
          name: 'custom-grey0',
          value: baseColor.custom.grey0,
        },

        'primary-blue': {
          name: 'primary-blue',
          value: baseColor.primary.blue,
        },

        'primary-red': {
          name: 'primary-red',
          value: baseColor.primary.red,
        },

        'primary-black': {
          name: 'primary-black',
          value: baseColor.primary.black,
        },

        'secondary-yellow': {
          name: 'secondary-yellow',
          value: baseColor.secondary.yellow,
        },

        'secondary-purple': {
          name: 'secondary-purple',
          value: baseColor.secondary.purple,
        },
      },
    },

    controls: {
      disableSaveFromUI: true,
      exclude: [
        'ref',
        'logDimensions',
        'logAction',
        'logCategory',
        'logging-label',
        'logName',
        'testID',
        'logValue',
      ],
      sort: 'requiredFirst', // 'none', 'alpha', or 'requiredFirst'
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    viewport: {
      options: INITIAL_VIEWPORTS,
    },
  },

  tags: ['autodocs'],

  initialGlobals: {
    theme: 'light', // Default theme
    viewport: {
      value: 'iphonex',
      isRotated: false,
    },
  },
}

export default preview
