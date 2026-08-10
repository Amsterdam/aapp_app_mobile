import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {type VariableContentParams} from '@/app/navigation/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ArticlePreview} from '@/modules/construction-work/components/article/ArticlePreview'
import {useMarkArticleAsRead} from '@/modules/construction-work/hooks/useMarkArticleAsRead'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {useArticlesQuery} from '@/modules/construction-work/service'
import {type ArticlesItem} from '@/modules/construction-work/types/api'
import {getUniqueArticleId} from '@/modules/construction-work/utils/getUniqueArticleId'
import {type Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {getYearOfPublicationDate} from '@/utils/datetime/getYearOfPublicationDate'

type Props = {
  projectId: number
  projectTitle: string
  title: string
}

type YearlyArticleSection = {
  data: ArticlesItem[]
  title: string
}

export const ArticleOverview = ({projectId, projectTitle, title}: Props) => {
  const navigation = useNavigation<ConstructionWorkRouteName>()
  const styles = useThemable(createStyles)
  const {
    data: articles,
    isError,
    isLoading,
    refetch,
    startedTimeStamp,
  } = useArticlesQuery(
    projectId
      ? {
          project_ids: projectId.toString(),
        }
      : skipToken,
  )

  const {markMultipleAsRead} = useMarkArticleAsRead()

  const yearlyArticleSections = articles?.reduce(
    (result: YearlyArticleSection[], article) => {
      const year = getYearOfPublicationDate(article.publication_date)
      const section = result.find(s => s.title === year)

      if (section) {
        section.data.push(article)
      } else {
        result.push({title: year, data: [article]})
      }

      return result
    },
    [] as YearlyArticleSection[],
  )

  useEffect(
    () =>
      navigation.addListener('blur', () => {
        const {index, routes} = navigation.getState()

        if (
          (routes[index].name as ConstructionWorkRouteName) ===
            ConstructionWorkRouteName.constructionWork &&
          articles
        ) {
          markMultipleAsRead(articles)
        }
      }),
    [articles, markMultipleAsRead, navigation],
  )

  const navigateToArticle = ({
    meta_id: {id, type},
    title: articleTitle,
  }: ArticlesItem) => {
    const params: VariableContentParams & {projectId?: number} = {
      id,
      projectId,
      screenTitle: `${projectTitle} - ${articleTitle}`,
    }

    navigation.navigate(
      type === 'warning'
        ? ConstructionWorkRouteName.projectWarning
        : ConstructionWorkRouteName.projectNews,
      params,
    )
  }

  if (isLoading) {
    return (
      <PleaseWait
        startedTimeStamp={startedTimeStamp}
        testID="ConstructionWorkProjectArticlesSpinner"
      />
    )
  }

  if (!isError && !yearlyArticleSections?.length) {
    return null
  }

  return (
    <View style={styles.list}>
      <Column gutter="sm">
        <Title
          level="h2"
          testID="ConstructionWorkProjectArticlesTitle"
          text={title}
        />
        {yearlyArticleSections ? (
          yearlyArticleSections.map(({title: sectionTitle, data}, index) => (
            <View key={sectionTitle + index.toString()}>
              {index > 0 && (
                <View style={styles.year}>
                  <Paragraph>{sectionTitle}</Paragraph>
                  <View style={styles.line} />
                </View>
              )}
              {data.map((article, dataIndex) => (
                <ArticlePreview
                  article={article}
                  isFirst={index === 0 && dataIndex === 0}
                  isLast={
                    index === yearlyArticleSections.length - 1 &&
                    dataIndex === data.length - 1
                  }
                  key={getUniqueArticleId(article.meta_id)}
                  onPress={() => navigateToArticle(article)}
                  testID="ConstructionWorkProjectArticlePreview"
                />
              ))}
            </View>
          ))
        ) : (
          <SomethingWentWrong
            retryFn={refetch}
            testID="ConstructionWorkProjectArticlesSomethingWentWrong"
            text="De nieuwsberichten zijn nu niet te zien. Probeer het later nog een keer."
            title=""
          />
        )}
      </Column>
    </View>
  )
}

const yearInset = 4

const createStyles = ({color, size, z}: Theme) =>
  StyleSheet.create({
    line: {
      height: size.spacing.md,
      left: yearInset,
      width: 2,
      backgroundColor: color.text.default,
    },
    list: {
      marginBottom: size.spacing.lg,
    },
    year: {
      backgroundColor: color.articleOverview.year.background,
      left: -yearInset,
      position: 'relative',
      zIndex: z.articleOverviewYear,
    },
  })
