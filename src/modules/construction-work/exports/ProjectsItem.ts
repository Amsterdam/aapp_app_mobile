import type {
  ProjectBase,
  ArticleStub,
} from '@/modules/construction-work/types/api'

export type ProjectsItem = ProjectBase & {
  recent_articles: ArticleStub[]
}
