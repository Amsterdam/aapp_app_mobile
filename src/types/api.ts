type Links = {
  next: {href: string}
  previous: {href: string}
  self: {href: string}
}

type Page = {
  number: number
  size: number
  totalElements: number
  totalPages: number
}

export type Paginated<T> = {
  _links: Links
  page: Page
  result: T[]
}

export enum CacheLifetime {
  none = 0,
  second = 1,
  minute = 60,
  fiveMinutes = 300, // 5 * 60
  hour = 3600, // 60 * 60
  day = 86400, // 60 * 60 * 24
  week = 604800, // 60 * 60 * 24 * 7
}

export type ApiImageSource = {
  height: number
  url: string
  width: number
}

export type ApiImage = {
  alternativeText: string | null
  aspectRatio: number
  id: string
  sources: ApiImageSource[]
}

export type AddressQueryArgs = {
  address?: string
  lat?: number
  lon?: number
}

export type PaginationQueryArgs = {
  // page?: number is omitted because it is handled by the infinite query hook
  page_size?: number
}

export type SortQueryArgs = {
  sort_by?: string
  sort_order?: 'asc' | 'desc'
}

export enum TimeOutDuration {
  short = 1000,
  medium = 15000,
  long = 30000,
}

export type ApiError<CodesEnum = unknown> = {
  code: CodesEnum
  detail: string
}
