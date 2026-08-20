import {ReactNode} from 'react'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {ListItemMarker} from '@/components/ui/text/list/ListItemMarker'
import {ListMarkerProp} from '@/components/ui/text/list/types'
import {type TestProps} from '@/components/ui/types'

type Props = {
  accessible?: boolean
  text: string | ReactNode
} & ListMarkerProp &
  TestProps

export const ListItem = ({accessible = true, text, marker, testID}: Props) => (
  <Row>
    <ListItemMarker
      marker={marker}
      testID={`${testID}Marker`}
    />
    {typeof text === 'string' ? (
      <Phrase
        accessible={accessible}
        testID={`${testID}Text`}>
        {text}
      </Phrase>
    ) : (
      text
    )}
  </Row>
)
