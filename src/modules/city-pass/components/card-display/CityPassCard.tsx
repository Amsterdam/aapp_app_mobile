import {StyleSheet} from 'react-native'
import {Pressable, PressableProps} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {CityPass, CityPassPass} from '@/modules/city-pass/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {capitalizeString} from '@/utils/transform/capitalizeString'

type Props = {
  cityPass: CityPass | CityPassPass
} & Omit<PressableProps, 'children' | 'variant'>

export const CityPassCard = ({
  accessibilityRole = 'button',
  cityPass,
  onPress,
  testID,
  ...pressableProps
}: Props) => {
  const styles = useThemable(createStyles)
  const firstname =
    'owner' in cityPass ? cityPass?.owner.firstname : cityPass?.firstname

  return (
    <Pressable
      accessibilityLabel={`Stadspas details van ${firstname}.${cityPass.type ? ` Type ${capitalizeString(cityPass.type)}.` : ''}${cityPass.actief === false ? ' Geblokkeerd.' : ''}`}
      accessibilityLanguage="nl-NL"
      accessibilityRole={accessibilityRole}
      onPress={onPress}
      testID={testID}
      {...pressableProps}
      insetHorizontal="md"
      insetVertical="sm"
      style={styles.card}>
      <Row gutter="md">
        <Box insetTop="sm">
          <Icon
            color="link"
            name="city-pass"
            size="xl"
            testID={`${testID}Icon`}
          />
        </Box>
        <Column
          align="center"
          grow={1}
          gutter="xs"
          shrink={1}>
          <Title
            accessible={false}
            color="link"
            level="h3"
            testID={`${testID}Title`}
            text="Stadspas details"
          />
          <Title
            accessible={false}
            color="link"
            level="h3"
            testID={`${testID}NameTitle`}
            text={firstname}
          />
          {cityPass.actief === false && (
            <Phrase
              accessible={false}
              testID={`${testID}BlockedPhrase`}
              variant="small">
              Geblokkeerd
            </Phrase>
          )}
          {!!cityPass.type && (
            <Phrase
              accessible={false}
              color="secondary"
              testID={`${testID}TypePhrase`}
              variant="small">
              {capitalizeString(cityPass.type)}
            </Phrase>
          )}
        </Column>
        <Row>
          <Icon
            color="link"
            name="chevron-right"
            size="lg"
            testID={`${testID}Icon`}
          />
        </Row>
      </Row>
    </Pressable>
  )
}

const createStyles = ({color, border}: Theme) =>
  StyleSheet.create({
    card: {
      borderColor: color.cityPass.card.border,
      borderWidth: border.width.sm,
      borderStyle: 'solid',
    },
  })
