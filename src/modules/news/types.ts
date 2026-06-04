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
  deleteLiveblogNotifications = 'NewsDeleteLiveblogNotifications',
  districts = 'NewsDistricts',
  getLiveblogNotifications = 'NewsGetLiveblogNotifications',
  postLiveblogNotifications = 'NewsPostLiveblogNotifications',
}

export type NewsArticleResponse = NewsArticleBase & {
  body: string
  creation_datetime: string
  district: string
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

export type NewsArticlesType =
  | {
      district?: never
      type: 'article' | 'highlight' | 'liveblog'
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
