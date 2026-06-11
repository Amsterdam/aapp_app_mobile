import {skipToken} from '@reduxjs/toolkit/query'
import type {NewsArticleBase} from '@/modules/news/types'
import type {ReactNode} from 'react'
import {NewsArticleContext} from '@/modules/news/hooks/useNewsArticle'
import {useNewsArticleQuery} from '@/modules/news/service'

type Props = {
  children: ReactNode
  id?: NewsArticleBase['id']
}

export const NewsArticleProvider = ({children, id}: Props) => {
  const {
    data: article,
    isError,
    isLoading,
  } = useNewsArticleQuery(id ?? skipToken)

  return (
    <NewsArticleContext.Provider
      value={{
        article,
        isError,
        isLoading,
      }}>
      {children}
    </NewsArticleContext.Provider>
  )
}
