/* eslint-disable sonarjs/redundant-type-aliases */

import {ProgressStatus} from '@/components/ui/progressSteps/types'
import {
  AddressQueryArgs,
  ApiImage,
  Paginated,
  PaginationQueryArgs,
  SortQueryArgs,
} from '@/types/api'

export enum ConstructionWorkEndpointName {
  articles = 'articles',
  projectDetails = 'projectDetails',
  projectFollow = 'projectFollow',
  projectNews = 'projectNews',
  projectUnfollow = 'projectUnfollow',
  projectWarning = 'projectWarning',
  projects = 'projects',
  projectsFollowedArticles = 'projectsFollowedArticles',
  projectsSearch = 'projectsSearch',
}

// shared

export type ArticleType = 'article' | 'warning'

export type ArticleMetaId = {
  id: number
  type: ArticleType
}

export type ArticleStub = {
  meta_id: ArticleMetaId
  modification_date: string
}

export type ArticleBase = ArticleStub & {
  body: string | null
  id: number
  modification_date: string
  publication_date: string
  title: string
}

export type ArticleNews = ArticleBase & {
  active: boolean
  creation_date: string
  expiration_date: string | null
  foreign_id: number
  image: ApiImage | null
  intro: string | null
  last_seen: string | null
  projects: number[]
  url: string
}

export type ArticleWarning = ArticleBase & {
  author_email: string | null
  images: ApiImage[] | null
  project: number | null
}

export type ProjectBase = {
  followed: boolean
  id: number
  image: ApiImage | null
  meter: number | null
  subtitle: string | null
  title: string
}

export type ProjectIdQueryArgs = {id: number}

// /articles

export type ArticlesQueryArgs = {
  limit?: number
  project_ids?: string
} & SortQueryArgs

export type ArticlesItem = {
  images: ApiImage[] | null
  meta_id: ArticleMetaId
  publication_date: string
  title: string
}

export type ArticlesResponse = ArticlesItem[]

// /project/details

export type ProjectDetailsQueryArgs = {
  id: number
} & AddressQueryArgs

export type ProjectContact = {
  address: string | null // @TODO: not in API definition (100764)
  email: string | null
  extra: string | null
  id: number
  name: string | null
  phone: string | null
  position: string | null
}

export type ProjectSection = {
  body: string | null
  links?: Array<{
    label: string
    url: string
  }>
  title: string | null
}

export type ProjectSections = {
  contact: ProjectSection[] | null
  what: ProjectSection[] | null
  when: ProjectSection[] | null
  where: ProjectSection[] | null
  work: ProjectSection[] | null
}

export type ProjectTimelineSubItem = {
  body: string | null
  date: string
  title?: string
}

export type ProjectTimelineItem = {
  body: string | null
  collapsed: boolean
  date: string
  items: ProjectTimelineSubItem[] | null
  progress: ProgressStatus
  title: string
}

export type ProjectTimeline = {
  intro: string | null
  items: ProjectTimelineItem[]
  title: string
}

export type Project = ProjectBase & {
  active: boolean
  contacts: ProjectContact[] | null
  coordinates: {
    lat: number
    lon: number
  } | null
  creation_date: string
  expiration_date: string | null
  followers: number
  foreign_id: number
  images: ApiImage[] | null
  last_seen: string | null
  modification_date: string
  publication_date: string
  recent_articles: (ArticleNews | ArticleWarning)[]
  sections: ProjectSections | null
  timeline: ProjectTimeline | null
  url: string
}

export type ProjectDetailsResponse = Project

// /project/news

export type ProjectNewsQueryArgs = ProjectIdQueryArgs

export type ProjectNewsResponse = ArticleNews

// /project/warning

export type ProjectWarningQueryArgs = ProjectIdQueryArgs

export type ProjectWarningResponse = ArticleWarning

// /projects

export type ProjectsQueryArgs = PaginationQueryArgs & AddressQueryArgs

export type ProjectsItem = ProjectBase & {
  recent_articles: ArticleStub[]
}

export type ProjectsResponse = Paginated<ProjectsItem>

// /projects/follow

export type FollowProjectBody = {id: number}

// /projects/search

export type ProjectsSearchQueryArgs = {
  fields: (keyof ProjectsItem)[]
  query_fields: (keyof ProjectsItem)[]
  text: string
} & AddressQueryArgs &
  PaginationQueryArgs

export type ProjectsSearchApiQueryArgs = Omit<
  ProjectsSearchQueryArgs,
  'fields' | 'query_fields'
> & {
  fields: string
  query_fields: string
}

export type ProjectsSearchResponse = Paginated<ProjectsItem>
