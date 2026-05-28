import type {Paginated, PaginationQueryArgs} from '@/types/api'
import type {ImageURISource} from 'react-native'

export type ArticleSummary = {
  id: number
  images: Pick<ImageURISource, 'uri' | 'width' | 'height'>[]
}
export enum NewsEndpointName {
  article = 'NewsArticle',
}

export type NewsArticleResponse = {
  content: string
  id: number
  modification_datetime: string
  publication_datetime: string
  title: string
}

export type ArticlesResponse = Paginated<ArticleSummary>

export type District =
  | 'west'
  | 'noord'
  | 'zuid'
  | 'oost'
  | 'centrum'
  | 'nieuw-west'
  | 'zuidoost'
  | 'weesp'

export type ArticlesType =
  | {
      district?: never
      type: 'article' | 'highlight' | 'liveblog'
    }
  | {
      district: District
      type: 'district'
    }

export type ArticlesQueryArgs = PaginationQueryArgs & ArticlesType
