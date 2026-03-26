/* eslint-disable no-console */
const {mergeConfig} = require('@react-native/metro-config')
const {getDefaultConfig} = require('expo/metro-config')

const defaultConfig = getDefaultConfig(__dirname)

const {transformer, resolver} = defaultConfig
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  },
  resolver: {
    ...resolver,
    assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  },

  server: {
    enhanceMiddleware: (metroMiddleware, metroServer) => {
      /* CodeGen watcher start */
      const {execFile} = require('node:child_process')

      try {
        // eslint-disable-next-line sonarjs/no-os-command-from-path
        execFile('node', ['nodescripts/codegen/codegen.watch.mts'], {
          stdio: 'inherit',
          cwd: process.cwd(),
        })
        console.log('Started CodeGen watcher.')
      } catch (error) {
        console.error('Failed to start CodeGen watcher:', error)
      }

      /* CodeGen watcher end */
      return metroMiddleware
    },
  },
}

module.exports = mergeConfig(defaultConfig, config)
