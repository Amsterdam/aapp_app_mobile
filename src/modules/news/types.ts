import type {Paginated, PaginationQueryArgs} from '@/types/api'
import type {ImageURISource} from 'react-native'

export type NewsArticleBase = {
  id: number
  images: Pick<ImageURISource, 'uri' | 'width' | 'height'>[]
  is_active_liveblog?: boolean
  modification_datetime: string
  publication_datetime: string
  title: string
  type?: NewsArticleType
}

type NewsArticleType = 'article' | 'highlight' | 'liveblog' | 'district'

export enum NewsEndpointName {
  article = 'NewsArticle',
  articles = 'NewsArticles',
  deleteLiveblogNotifications = 'NewsDeleteLiveblogNotifications',
  districts = 'NewsDistricts',
  getLiveblogNotifications = 'NewsGetLiveblogNotifications',
  liveblog = 'NewsLiveblog',
  postLiveblogNotifications = 'NewsPostLiveblogNotifications',
}

export type NewsArticleResponse = NewsArticleBase & {
  body: string
  creation_datetime: string
  district: string | null
  expiration_datetime: string | null
  foreign_id: number
  id: number
  intro: string
  last_seen: string
  modification_datetime: string
  publication_datetime: string
  summary: string
  title: string
  url: string
}

type LiveblogItem = {
  body: string
  creation_datetime: string
  id: number
  images: Pick<ImageURISource, 'uri' | 'width' | 'height'>[]
  message_order: number
  title: string
}

export type LiveblogResponse = NewsArticleResponse & {
  liveblog_items: Array<LiveblogItem>
  liveblog_notification_send: boolean
  liveblog_version: number | null
}

export type NewsArticlesResponse = Paginated<NewsArticleBase>

export type NewsArticlesType =
  | {
      district?: never
      type: Exclude<NewsArticleType, 'district'>
    }
  | {
      district: string
      type: 'district'
    }

export type NewsArticlesQueryArgs = PaginationQueryArgs & NewsArticlesType

export type District = {
  label: string
  name: string
}

export type DistrictsResponse = {
  data: District[]
}

export type NewsLiveblogNotificationsResponse = {
  article: number
  device_id: string
  id: number
}

export enum DashboardHighlightStatus {
  active = 'Active',
  stale = 'Stale',
}
