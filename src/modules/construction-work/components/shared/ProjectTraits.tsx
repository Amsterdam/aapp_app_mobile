import {memo} from 'react'
import {View, type ViewProps} from 'react-native'
import simplur from 'simplur'
import type {ProjectsListItem} from '@/modules/construction-work/types/project'
import {Badge} from '@/components/ui/feedback/Badge'
import {Trait} from '@/components/ui/feedback/Trait'
import {Row} from '@/components/ui/layout/Row'
import {Project} from '@/modules/construction-work/types/api'
import {getDistance} from '@/modules/construction-work/utils/getDistance'

export type ProjectTraitsProps = {
  byDistance?: boolean
  project: Project | ProjectsListItem
  unreadArticlesLength?: number
}

type Props = ProjectTraitsProps & ViewProps

export const ProjectTraits = memo(
  ({project, unreadArticlesLength, ...viewProps}: Props) => {
    const {followed, meter} = project

    if (!followed && !meter) {
      return null
    }

    const {distanceA11yText, distanceText} = getDistance(meter)

    return (
      <View {...viewProps}>
        <Row
          gutter="md"
          wrap>
          {!!followed &&
            (unreadArticlesLength ? (
              <Trait
                label={simplur`${[unreadArticlesLength]} Bericht[|en]`}
                testID="ConstructionWorkProjectArticlesTrait">
                <Badge
                  testID="ConstructionWorkProjectArticlesBadge"
                  value={unreadArticlesLength}
                  variant="small"
                />
              </Trait>
            ) : (
              <Trait
                iconName="check-mark"
                label="Volgend"
                testID="ConstructionWorkProjectFollowingTrait"
              />
            ))}
          {!!distanceText && (
            <Trait
              accessibilityLabel={distanceA11yText}
              iconName="map-marker"
              label={distanceText}
              testID="ConstructionWorkProjectMetersTrait"
            />
          )}
        </Row>
      </View>
    )
  },
)
