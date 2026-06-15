import {skipToken} from '@reduxjs/toolkit/query'
import {ReactNode} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import ProjectWarningFallbackImage from '@/modules/construction-work/assets/images/project-warning-fallback.svg'
import {useProjectDetailsQuery} from '@/modules/construction-work/service'
import {ArticleType} from '@/modules/construction-work/types/api'
import {ApiImage} from '@/types/api'
import {formatDate} from '@/utils/datetime/formatDate'

type Props = {
  body: string | null
  children?: ReactNode
  id: number
  image?: ApiImage | null
  intro?: string | null
  projectId: number | undefined
  publicationDate: string
  title: string
  type?: ArticleType
}

export const ProjectArticle = ({
  body,
  children,
  id,
  image,
  intro,
  projectId,
  publicationDate,
  title,
}: Props) => {
  const {data: project, isLoading: isLoadingProject} = useProjectDetailsQuery(
    projectId
      ? {
          id: projectId,
        }
      : skipToken,
  )

  return (
    <>
      <LazyImage
        accessibilityLabel={image?.alternativeText ?? undefined}
        accessible={!!image?.alternativeText}
        aspectRatio="wide"
        fallbackInheritsAspectRatio={false}
        missingSourceFallback={
          <FigureWithFacadesBackground
            testID={`ConstructionWorkProjectArticle${id}ImageFallback`}>
            <ProjectWarningFallbackImage />
          </FigureWithFacadesBackground>
        }
        openInImageViewer
        source={image?.sources}
        testID={`ConstructionWorkProjectArticle${id}Image`}
      />
      {isLoadingProject ? (
        <PleaseWait testID={`ConstructionWorkProjectArticle${id}PleaseWait`} />
      ) : (
        <HorizontalSafeArea>
          <Box>
            <Column gutter="md">
              {(!!publicationDate || !!project) && (
                <Column>
                  {!!publicationDate && (
                    <Paragraph
                      testID={`ConstructionWorkProjectArticle${id}DateLabel`}>
                      {formatDate(publicationDate)}
                    </Paragraph>
                  )}
                  {!!project && (
                    <Phrase
                      emphasis="strong"
                      testID={`ConstructionWorkProjectArticle${id}ProjectTitle`}>
                      {project.title}
                    </Phrase>
                  )}
                </Column>
              )}
              {!!title && (
                <Title
                  testID={`ConstructionWorkProjectArticle${id}Title`}
                  text={title}
                />
              )}
              {!!intro && (
                <HtmlContent
                  content={intro}
                  isIntro
                  testID={`ConstructionWorkProjectArticle${id}Intro`}
                />
              )}
              {!!body && (
                <HtmlContent
                  content={body}
                  testID={`ConstructionWorkProjectArticle${id}Body`}
                />
              )}
            </Column>
          </Box>
          {children}
        </HorizontalSafeArea>
      )}
    </>
  )
}
