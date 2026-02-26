import {Linking} from 'react-native'
import type {TestProps} from '@/components/ui/types'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'

type Props = TestProps

export const CarouselRenderItemNotificationSettings = ({testID}: Props) => (
  <Box
    borderColor="default"
    borderStyle="solid"
    borderWidth="md">
    <Column
      gutter="sm"
      halign="start">
      <Row gutter="sm">
        <Icon
          name="bell-off"
          size="lg"
        />
        <Phrase emphasis="strong">Meldingen staan uit</Phrase>
      </Row>
      <Paragraph>U zet meldingen aan in Instellingen</Paragraph>
      <Button
        icon={{name: 'link-external', size: 'md'}}
        label={'Ga naar Instellingen'}
        noPadding
        onPress={() => Linking.openSettings()}
        testID={`${testID}ContentButton`}
        variant="tertiary"
      />
    </Column>
  </Box>
)
