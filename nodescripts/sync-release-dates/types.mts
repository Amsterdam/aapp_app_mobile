export type EnvironmentSubDomain = 'ontw' | 'test' | 'acc' | 'prod'

export type Release = {
  created: string
  deprecated: string | null
  modified: string
  published: string | null
  unpublished: string | null
  version: string
}

export type ReleaseUpdate = Partial<{
  deprecated: Date | null
  published: Date | null
  unpublished: Date | null
}>

export type ParsedReleaseVersion = {
  major: number
  minor: number
  patch: number
}
