import {EnvUrlMap, Environment} from '@/environment'

const reportProblemUrl = {
  prod: 'https://app.meldingen.amsterdam.nl/incident/beschrijf',
  acc: 'https://acc.app.meldingen.amsterdam.nl/incident/beschrijf',
}

const reportProblemMapUrl = {
  prod: 'https://meldingen.amsterdam.nl/meldingenkaart',
  acc: 'https://acc.meldingen.amsterdam.nl/meldingenkaart',
}

const myReportsUrl = {
  prod: 'https://meldingen.amsterdam.nl/mijn-meldingen/login',
  acc: 'https://acc.meldingen.amsterdam.nl/mijn-meldingen/login',
}

export const reportProblemExternalLinks: EnvUrlMap = {
  [Environment.production]: reportProblemUrl.prod,
  [Environment.acceptance]: reportProblemUrl.acc,
  [Environment.test]: reportProblemUrl.acc,
  [Environment.development]: reportProblemUrl.acc,
  [Environment.custom]: reportProblemUrl.acc,
}

export const reportProblemMapExternalLinks: EnvUrlMap = {
  [Environment.production]: reportProblemMapUrl.prod,
  [Environment.acceptance]: reportProblemMapUrl.acc,
  [Environment.test]: reportProblemMapUrl.acc,
  [Environment.development]: reportProblemMapUrl.acc,
  [Environment.custom]: reportProblemMapUrl.acc,
}

export const myReportsExternalLinks: EnvUrlMap = {
  [Environment.production]: myReportsUrl.prod,
  [Environment.acceptance]: myReportsUrl.acc,
  [Environment.test]: myReportsUrl.acc,
  [Environment.development]: myReportsUrl.acc,
  [Environment.custom]: myReportsUrl.acc,
}
