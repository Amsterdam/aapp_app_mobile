type RuleSeverity = 'off' | 'warn' | 'error'

type RuleConfiguration = RuleSeverity | readonly [RuleSeverity, ...unknown[]]

type RulesRecord = Record<string, RuleConfiguration>

type EslintPluginWithConfigs = {
  configs?: Record<string, unknown>
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

export const getRulesFromPluginConfig = (
  plugin: EslintPluginWithConfigs,
  configName: string,
): RulesRecord => {
  const pluginConfig = plugin.configs?.[configName]

  if (!pluginConfig) {
    throw new Error(
      `Unable to load plugin config rules for "${configName}". Ruleset does not exist, available rulesets: ${JSON.stringify(Object.keys(plugin.configs ?? {}))}`,
    )
  }

  if (!isRecord(pluginConfig) || Array.isArray(pluginConfig)) {
    throw new Error(
      `Unable to load plugin config rules for "${configName}", ${JSON.stringify(pluginConfig)}`,
    )
  }

  const {rules} = pluginConfig

  if (!isRecord(rules)) {
    throw new Error(
      `Unable to load plugin config rules for "${configName}". Ruleset does not contain a "rules" property, available properties: ${JSON.stringify(Object.keys(pluginConfig))}`,
    )
  }

  return Object.fromEntries(
    Object.entries(rules).filter(([, value]) => value !== undefined),
  ) as RulesRecord
}
