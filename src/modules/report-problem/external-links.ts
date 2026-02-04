import {EnvUrlMap, Environment} from '@/environment'

const reportProblemUrl = {
  prod: 'https://app.meldingen.amsterdam.nl/incident/beschrijf',
  acc: 'https://acc.app.meldingen.amsterdam.nl/incident/beschrijf',
}

export const reportProblemExternalLinks: EnvUrlMap = {
  [Environment.production]: reportProblemUrl.prod,
  [Environment.acceptance]: reportProblemUrl.acc,
  [Environment.test]: reportProblemUrl.acc,
  [Environment.development]: reportProblemUrl.acc,
  [Environment.custom]: reportProblemUrl.acc,
}
