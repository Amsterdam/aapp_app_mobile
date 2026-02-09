import {useRoute} from '@/hooks/navigation/useRoute'
import {buildMetadata} from '@/modules/survey/utils/buildMetadata'

export const useBuildSurveyMetaData = () => {
  const route = useRoute()

  return buildMetadata(route)
}
