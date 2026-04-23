import {type NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {ProjectContacts} from '@/modules/construction-work/components/project/ProjectContacts'
import {ProjectContentSections} from '@/modules/construction-work/components/project/ProjectContentSections'
import {ProjectTimeline} from '@/modules/construction-work/components/project/ProjectTimeline'
import {ProjectSegmentTitle} from '@/modules/construction-work/hooks/useProjectSegmentOptions'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {Survey} from '@/modules/survey/exports/Survey'

type Props = NavigationProps<ConstructionWorkRouteName.projectSegment>

export const ProjectSegmentScreen = ({route}: Props) => {
  const {
    body: {contacts, sections, timeline},
    screenHeaderTitle,
  } = route.params

  useSetScreenTitle()

  return (
    <Screen
      keyboardAware
      testID="ConstructionWorkProjectSegmentScreen">
      <Column gutter="md">
        <Box>
          <Column gutter="md">
            {!!contacts && <ProjectContacts contacts={contacts} />}
            {!!sections && (
              <ProjectContentSections
                sections={sections}
                testID="ConstructionWorkProjectSections"
              />
            )}
            {!!timeline?.intro && (
              <HtmlContent
                content={timeline.intro}
                testID="ConstructionWorkProjectIntro"
              />
            )}
            {timeline?.items && timeline?.items?.length > 0 && (
              <ProjectTimeline items={timeline.items} />
            )}
          </Column>
        </Box>
      </Column>
      {screenHeaderTitle === (ProjectSegmentTitle.about as string) && (
        <Survey entryPoint="construction-work-project-info" />
      )}
    </Screen>
  )
}
