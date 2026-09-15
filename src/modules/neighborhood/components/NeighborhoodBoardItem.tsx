import type {NeighborhoodNote} from '@/modules/neighborhood/types'
import {RouteButton} from '@/components/ui/buttons/RouteButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

export const NeighborhoodBoardItem = ({
  body,
  title,
  contact_name,
  contact_number,
  created_at,
  lat,
  lng,
}: NeighborhoodNote) => (
  <Box>
    <Box borderWidth="sm">
      <Column>
        <Title
          level="h2"
          text={`${contact_name} heeft een briefje achtergelaten`}
        />
        <Phrase color="secondary">{formatDateTimeToDisplay(created_at)}</Phrase>
        <Phrase color="secondary">tel:{contact_number}</Phrase>

        <Title
          level="h4"
          text={title}
        />
        <Paragraph>{body}</Paragraph>
        <RouteButton
          coordinates={{lat: Number(lat), lon: Number(lng)}}
          testID="NeighborhoodBoardItemRouteButton"
        />
      </Column>
    </Box>
  </Box>
)
