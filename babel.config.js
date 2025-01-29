const alias = require('./.config/alias.js')

module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        allowlist: [
          'API_KEY_DEV',
          'API_KEY_TEST',
          'API_KEY_ACC',
          'API_KEY_PROD',
          'BUILD_NUMBER',
          'PIWIK_PRO_ID',
          'PIWIK_PRO_ID_ACCEPT',
          'PIWIK_PRO_URL',
          'PIWIK_PRO_URL_ACCEPT',
          'VERSION',
          'APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_DEV',
          'APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_TEST',
          'APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_ACC',
          'APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_PROD',
          'CHAT_DEVELOPER_NAME_DEV',
          'CHAT_ORGANIZATION_ID_DEV',
          'CHAT_URL_DEV',
          'CHAT_DEVELOPER_NAME_TEST',
          'CHAT_ORGANIZATION_ID_TEST',
          'CHAT_URL_TEST',
          'CHAT_DEVELOPER_NAME_ACC',
          'CHAT_ORGANIZATION_ID_ACC',
          'CHAT_URL_ACC',
          'CHAT_DEVELOPER_NAME_PROD',
          'CHAT_ORGANIZATION_ID_PROD',
          'CHAT_URL_PROD',
          'WASTE_CONTAINER_SERVICE_PRINCIPAL_NAME',
          'WASTE_CONTAINER_SERVICE_PRINCIPAL_SECRET',
          'WASTE_CONTAINER_ORGANISATION_ID',
        ],
      },
    ],
    [
      'module-resolver',
      {
        // note: setting the root to ./src does not work; for now we prepend src to all paths
        root: ['.'],
        extensions: ['.tsx', '.ts', '.html'],
        alias,
      },
    ],
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-flow-strip-types', {allowDeclareFields: true}],
  ],
}
