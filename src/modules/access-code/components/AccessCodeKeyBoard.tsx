import {OrientationLock} from 'expo-screen-orientation'
import {useCallback, useMemo} from 'react'
import {View, StyleSheet} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {useAccessibilityAnnounce} from '@/hooks/accessibility/useAccessibilityAnnounce'
import {useLockScreen} from '@/hooks/useLockScreen'
import {AccessCodeKeyBoardKey} from '@/modules/access-code/components/AccessCodeKeyboardKey'
import {useAccessCodeBiometrics} from '@/modules/access-code/exports/useAccessCodeBiometrics'
import {useEnterAccessCode} from '@/modules/access-code/exports/useEnterAccessCode'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {useConfirmAccessCode} from '@/modules/access-code/hooks/useConfirmAccessCode'
import {useSetAccessCode} from '@/modules/access-code/hooks/useSetAccessCode'
import {AccessCodeType} from '@/modules/access-code/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  onPressAuthenticate?: () => void
  type: AccessCodeType
}

export const AccessCodeKeyBoard = ({onPressAuthenticate, type}: Props) => {
  const insets = useSafeAreaInsets()
  const styles = useThemable(createStyles(insets))
  const {iconName, isEnrolled, useBiometrics} = useAccessCodeBiometrics()
  const {addDigit, removeDigit, codeLength} = useAccessCode()
  const accessibilityAnnounce = useAccessibilityAnnounce()
  const {codeEntered} = useEnterAccessCode()
  const {codeSet} = useSetAccessCode()
  const {codeConfirmed} = useConfirmAccessCode()

  useLockScreen(OrientationLock.PORTRAIT_UP)

  const nextTextField = useMemo(() => {
    switch (type) {
      case AccessCodeType.codeEntered:
        return codeEntered.length + 2
      case AccessCodeType.codeSet:
        return codeSet.length + 2
      case AccessCodeType.codeConfirmed:
        return codeConfirmed.length + 2
      default:
        return 0
    }
  }, [codeEntered, codeSet, codeConfirmed, type])

  const onPressNumber = useCallback(
    (number: number) => {
      accessibilityAnnounce(
        nextTextField <= codeLength
          ? `${number}, ingevoerd. Tekstveld ${nextTextField} van ${codeLength}`
          : '',
      )

      addDigit(number, type)
    },
    [accessibilityAnnounce, addDigit, codeLength, nextTextField, type],
  )

  return (
    <View style={styles.container}>
      <Box inset="sm">
        <Column gutter="sm">
          <Row gutter="sm">
            <AccessCodeKeyBoardKey
              keyNumber={1}
              onPress={() => onPressNumber(1)}
            />
            <AccessCodeKeyBoardKey
              keyNumber={2}
              onPress={() => onPressNumber(2)}
            />
            <AccessCodeKeyBoardKey
              keyNumber={3}
              onPress={() => onPressNumber(3)}
            />
          </Row>
          <Row gutter="sm">
            <AccessCodeKeyBoardKey
              keyNumber={4}
              onPress={() => onPressNumber(4)}
            />
            <AccessCodeKeyBoardKey
              keyNumber={5}
              onPress={() => onPressNumber(5)}
            />
            <AccessCodeKeyBoardKey
              keyNumber={6}
              onPress={() => onPressNumber(6)}
            />
          </Row>
          <Row gutter="sm">
            <AccessCodeKeyBoardKey
              keyNumber={7}
              onPress={() => onPressNumber(7)}
            />
            <AccessCodeKeyBoardKey
              keyNumber={8}
              onPress={() => onPressNumber(8)}
            />
            <AccessCodeKeyBoardKey
              keyNumber={9}
              onPress={() => onPressNumber(9)}
            />
          </Row>
          <Row
            align="end"
            gutter="sm">
            {!!useBiometrics &&
              !!isEnrolled &&
              type === AccessCodeType.codeEntered &&
              !!iconName && (
                <AccessCodeKeyBoardKey
                  accessibilityLabel="Geef toegang met biometrische gegevens"
                  iconName={iconName}
                  iconSize="lg"
                  onPress={() => {
                    onPressAuthenticate?.()
                  }}
                />
              )}
            <AccessCodeKeyBoardKey
              keyNumber={0}
              onPress={() => addDigit(0, type)}
            />
            <AccessCodeKeyBoardKey
              accessibilityLabel="Verwijder laatste cijfer"
              iconName="backspace"
              iconSize="xl"
              onPress={() => removeDigit(type)}
            />
          </Row>
        </Column>
      </Box>
    </View>
  )
}

const createStyles =
  (insets: EdgeInsets) =>
  ({border, color}: Theme) =>
    StyleSheet.create({
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.customKeyboard.background,
        paddingBottom: insets.bottom,
        borderRadius: border.radius.xs,
      },
    })
