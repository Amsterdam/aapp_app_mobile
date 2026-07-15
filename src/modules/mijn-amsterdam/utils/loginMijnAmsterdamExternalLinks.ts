import {EnvUrlMap, Environment} from '@/environment'

const getLoginUrlMijnAmsterdam = (env: string) =>
  `https://${env}mijn.amsterdam.nl/api/v1/services/amsapp/auth/login/`

const loginUrlMijnAmsterdam = {
  acc: getLoginUrlMijnAmsterdam('az-acc.'),
  prod: getLoginUrlMijnAmsterdam(''),
  test: getLoginUrlMijnAmsterdam('test.'),
}

export const loginMijnAmsterdamExternalLinks: EnvUrlMap = {
  [Environment.production]: loginUrlMijnAmsterdam.prod,
  [Environment.acceptance]: loginUrlMijnAmsterdam.acc,
  [Environment.test]: loginUrlMijnAmsterdam.acc,
  [Environment.development]: loginUrlMijnAmsterdam.test,
  [Environment.custom]: loginUrlMijnAmsterdam.test,
}
