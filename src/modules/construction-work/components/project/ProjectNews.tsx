import {useEffect} from 'react'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {ConstructionWorkDetailFigure} from '@/components/ui/media/errors/ConstructionWorkDetailFigure'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ProjectArticle} from '@/modules/construction-work/components/project/ProjectArticle'
import {useMarkArticleAsRead} from '@/modules/construction-work/hooks/useMarkArticleAsRead'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {useProjectNewsQuery} from '@/modules/construction-work/service'
import {getUniqueArticleId} from '@/modules/construction-work/utils/getUniqueArticleId'

type Props = {
  id: number
  projectId?: number
}

export const ProjectNews = ({id, projectId: passedProjectId}: Props) => {
  const navigation = useNavigation()
  const {markAsRead} = useMarkArticleAsRead()

  const {
    data: article,
    isError: articleIsError,
    isLoading: articleIsLoading,
    error: articleError,
    startedTimeStamp,
  } = useProjectNewsQuery({
    id,
  })

  // If we come here via a deeplink, we don't have the projectId. Then we fetch the article first and use an ID from the response.
  // Note that the article has an array of project IDs, because there is a many-to-many relation between news articles and projects. We assume the first ID is the correct one.
  const projectId = passedProjectId ?? article?.projects?.[0]

  useEffect(() => {
    if (!article) {
      return
    }

    markAsRead({
      id: getUniqueArticleId({id, type: 'article'}),
      publicationDate: article.publication_date,
    })
  }, [article, id, markAsRead])

  if (articleIsLoading) {
    return (
      <PleaseWait
        startedTimeStamp={startedTimeStamp}
        testID="ConstructionWorkNewsLoadingSpinner"
      />
    )
  }

  if (!article || articleIsError) {
    return (
      <FullScreenError
        buttonLabel="Ga terug"
        error={articleError}
        Image={ConstructionWorkDetailFigure}
        onPress={() =>
          navigation.navigate(ConstructionWorkRouteName.project, {
            id,
          })
        }
        testID="ProjectDetailErrorScreen"
        title="Helaas is het nieuwsartikel niet gevonden"
        withFacadesBackground={false}
      />
    )
  }

  const {body, image, intro, publication_date, title} = article

  return (
    <ProjectArticle
      body={body}
      id={id}
      image={image}
      intro={intro}
      projectId={projectId}
      publicationDate={publication_date}
      title={title ?? ''}
    />
  )
}
