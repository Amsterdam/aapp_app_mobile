import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Row} from '@/components/ui/layout/Row'
import {Size} from '@/components/ui/layout/Size'
import {Phrase} from '@/components/ui/text/Phrase'
import {BurningGuideRecommendationTag} from '@/modules/burning-guide/components/BurningGuideRecommendationTag'
import type {ListItem} from '@/modules/burning-guide/types'

type ListItemProps = Omit<ListItem, 'id'>

export const BurningGuideForecastListItem = ({
  variant,
  isFixed = false,
  timeWindow,
}: ListItemProps) => (
  <SingleSelectable
    accessibilityLabel={`${timeWindow}, Code ${variant}${isFixed ? '' : ', Deze verwachting kan nog veranderen.'}`}>
    <Row align="between">
      <Phrase accessible={false}>{timeWindow}</Phrase>
      <Row>
        <BurningGuideRecommendationTag
          fontSize="small"
          variant={variant}
        />
        <Size width={20}>
          {!isFixed && (
            <Phrase
              accessible={false}
              textAlign="center">
              *
            </Phrase>
          )}
        </Size>
      </Row>
    </Row>
  </SingleSelectable>
)
