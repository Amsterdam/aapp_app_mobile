import type {Paginated, PaginationQueryArgs} from '@/types/api'
import type {ImageURISource} from 'react-native'

export type NewsArticleBase = {
  id: number
  images: Pick<ImageURISource, 'uri' | 'width' | 'height'>[]
  modification_datetime: string
  publication_datetime: string
  title: string
}

export enum NewsEndpointName {
  article = 'NewsArticle',
  articles = 'NewsArticles',
}

export type NewsArticleResponse = NewsArticleBase & {
  body: string
  creation_datetime: string
  district: 'noord'
  expiration_datetime: string
  foreign_id: number
  id: number
  intro: string
  is_active_liveblog: true
  last_seen: string
  liveblog_notification_send: true
  modification_datetime: string
  publication_datetime: string
  summary: string
  title: string
  type: 'article'
  url: string
}

export type NewsArticlesResponse = Paginated<NewsArticleBase>

export type District =
  | 'west'
  | 'noord'
  | 'zuid'
  | 'oost'
  | 'centrum'
  | 'nieuw-west'
  | 'zuidoost'
  | 'weesp'

export type NewsArticlesType =
  | {
      district?: never
      type: 'article' | 'highlight' | 'liveblog'
    }
  | {
      district: District
      type: 'district'
    }

export type NewsArticlesQueryArgs = PaginationQueryArgs & NewsArticlesType
