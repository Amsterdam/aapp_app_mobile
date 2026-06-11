import {createContext, useContext} from 'react'
import type {NewsArticleResponse} from '@/modules/news/types'

export const NewsArticleContext = createContext<{
  article: NewsArticleResponse | undefined
  isError: boolean
  isLoading: boolean
} | null>(null)

export const useNewsArticle = () => {
  const context = useContext(NewsArticleContext)

  if (!context)
    throw new Error('useNewsArticle must be used within NewsArticleProvider')

  return context
}
