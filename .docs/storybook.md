# Storybook

We use React Native Web to render the native components in the Storybook web interface. The Storybook build is published to a GitHub Pages site after each push to the main branch.

## Creating stories

Create stories using the Storybook guides: https://storybook.js.org/docs/react/writing-stories/introduction

Run storybook with the command `npm run storybook` to run it in dev mode (with HMR) or build once with `npm run storybook:build`.

### Known issues

- Animation will not loop if `useNativeDriver` is true. When using RNW, `useNativeDriver` cannot be used, because animations are handled by javascript. The solution is to simply set `useNativeDriver` to `Platform.OS !== 'web'`, but we prefer not to modify the app code to fix this minor issue.

## Storybook + Vite

We use Vite to build Storybook. Webpack can no longer be used: it is not clear if we can make React Native Web work with Webpack 5. If we keep using Webpack 4, we cannot update the Node version, which will in turn block React Native updates.

Theoretically Storybook will support React Native Web via an addon, however at the time of writing (Oct 2023) it does not seem to work with Vite: https://storybook.js.org/addons/@storybook/addon-react-native-web

For now, we simply use an alias to replace any reference to `react-native` with `react-native-web` in the final Vite config (`main.ts`):

```javascript
{
  resolve: {
    alias: [
      {
        find: 'react-native',
        replacement: 'react-native-web',
      },
      // ...
    ]
  }
  // ...
}
```

### Known issues

- In `.storybook/preview.tsx`, adding the `SafeAreaProvider` from `react-native-safe-area-context` to the decorator will cause an import error. We could mock the `SafeAreaProvider` to fix this, but since the provider can be safely omitted, we will remove it for now.

## Configuration

See the folder `.storybook`, which contains:

- `components` - Helper components for stories.
- `mocks` - Mocked versions of packages that do not work in a web context, either because they offer no RNW support or because they offer functionality that is purely native (see [Mocks](#mocks) below).
- `utils` - Various functions and definitions that can be shared between multiple stories.
- `main.ts` - The main config file.
- `preview.css` - Fonts and shared styling for stories.
- `preview.tsx` - Shared config for the stories, including:
  - _decorators_: wrappers for the story components, in this case to make the navigation and redux state available;
  - _actions_: handle user input events;
  - _backgrounds_: define the available background colors;
  - _controls_: configure controls, e.g. map the name of a prop to a contol type;
  - _viewport_: define available viewport sizes and the default.

<a id="mocks"></a>

### Mocks

These mocked packages are referenced in the alias config in `main.ts`:

- `env` - Mock the @env package which exposes environment vars.
- `image-crop-picker` - Replace the native image pick/resize functionality with something that does nothing.
- `notifee` - Replace the push notifications with something that does nothing.
- `application-insights` - Replace Application insights logging with something that does nothing.

## Required dev dependencies

- `@storybook/addon-a11y` - Storybook addon: a11y tools.
- `@storybook/addon-essentials` - Storybook addon: the basic controls.
- `@storybook/react-vite` - The Vite-built version of Storybook.
- `@vitejs/plugin-react` - Allows Vite to handle ReactJS.
- `eslint-plugin-storybook` - Linting.
- `lodash/merge` - Helper to merge the Vite config objects. One would usually use Vite's `mergeConfig` function, but that would require making Vite a dev dependency.
- `path` - Helper to resolve various folders in the Storybook `main.ts` config.
- `react-docgen-typescript-plugin` - Generates Storybook controls and documentation from props, types, JSDoc comments and other code patterns.
- `react-native-web` - React Native Web itself.
- `storybook` - Storybook core.
- `vite-plugin-svgr` -Required by Vite to render raw SVG files.
