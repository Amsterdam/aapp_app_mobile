/* eslint-disable no-console */
const {mergeConfig} = require('@react-native/metro-config')
const {getDefaultConfig: getExpoDefaultConfig} = require('expo/metro-config')

const expoConfig = getExpoDefaultConfig(__dirname)

const {serializer, transformer, resolver} = expoConfig

const config = {
  serializer: {
    ...expoConfig.serializer,
    customSerializer: serializer.customSerializer,
  },
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
    enhanceMiddleware: metroMiddleware => {
      const {execFile} = require('node:child_process')

      try {
        execFile(process.execPath, ['nodescripts/codegen/codegen.watch.mts'], {
          stdio: 'inherit',
          cwd: process.cwd(),
        })
        console.log('Started CodeGen watcher.')
      } catch (error) {
        console.error('Failed to start CodeGen watcher:', error)
      }

      return metroMiddleware
    },
  },
}

module.exports = mergeConfig(expoConfig, config)
