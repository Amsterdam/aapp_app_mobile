import {skipToken} from '@reduxjs/toolkit/query'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ProjectArticle} from '@/modules/construction-work/components/project/ProjectArticle'
import {ProjectContacts} from '@/modules/construction-work/components/project/ProjectContacts'
import {
  useProjectDetailsQuery,
  useProjectWarningQuery,
} from '@/modules/construction-work/service'

type Props = {
  id: number
  projectId?: number
}

export const ProjectWarning = ({id, projectId: passedProjectId}: Props) => {
  const {
    data: warningData,
    isError: warningIsError,
    isLoading: warningIsLoading,
  } = useProjectWarningQuery({
    id,
  })

  // If we come here via a deeplink, we don't have the projectId. Then we fetch the warning article first and use the ID from the response.
  const projectId = passedProjectId ?? warningData?.project ?? undefined

  const {data: projectData, isLoading: projectIsLoading} =
    useProjectDetailsQuery(
      projectId
        ? {
            id: projectId,
          }
        : skipToken,
    )

  // useSetScreenTitle(projectData?.title)

  if (projectIsLoading || warningIsLoading) {
    return <PleaseWait testID="ConstructionWorkWarningLoadingSpinner" />
  }

  if (!warningData || warningIsError) {
    return (
      <SomethingWentWrong testID="ConstructionWorkWarningSomethingWentWrong" />
    )
  }

  const {body, images, publication_date, title} = warningData

  return (
    <ProjectArticle
      body={body}
      id={id}
      image={images?.[0]}
      projectId={projectId}
      publicationDate={publication_date}
      title={title}>
      {!!projectData?.contacts && (
        <Box>
          <ProjectContacts contacts={projectData.contacts} />
        </Box>
      )}
    </ProjectArticle>
  )
}
