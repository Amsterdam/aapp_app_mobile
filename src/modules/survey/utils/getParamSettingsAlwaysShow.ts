import {getPassesFraction} from '@/modules/survey/utils/getPassesFraction'

export const getParamSettingsAlwaysShow = (
  cooldown: number | undefined,
  minimum_actions: number | undefined,
  fraction: number | undefined,
) => cooldown === 0 && minimum_actions === 0 && getPassesFraction(fraction)
