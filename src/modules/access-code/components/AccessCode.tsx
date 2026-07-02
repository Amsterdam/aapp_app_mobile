import {useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {AccessCodeError} from '@/modules/access-code/components/AccessCodeError'
import {useAccessCodeError} from '@/modules/access-code/hooks/useAccessCodeError'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  accessCode: number[]
  codeLength: number
  error?: string
  isCodeEntered?: boolean
}

export const AccessCode = ({
  accessCode,
  codeLength,
  error,
  isCodeEntered,
}: Props) => {
  const styles = useThemable(createStyles)
  const {resetError} = useAccessCodeError()

  useEffect(
    () => () => {
      resetError()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <Column gutter="sm">
      <Row
        align="center"
        gutter="md">
        {Array.from({length: codeLength}).map((_, index) => (
          <View
            accessibilityLabel={`Tekstveld, ${index + 1} van ${codeLength}`}
            key={index}
            style={[
              styles.item,
              index === accessCode.length ? styles.active : undefined,
            ]}>
            {/* eslint-disable-next-line sonarjs/different-types-comparison */}
            {!!(accessCode[index] !== undefined || isCodeEntered) && ( // Just `accessCode[index]` excludes 0 value
              <Icon
                name="asterisk"
                testID="AccessCodeDigitAsteriskIcon"
              />
            )}
          </View>
        ))}
      </Row>
      {!!error && <AccessCodeError error={error} />}
    </Column>
  )
}

const createStyles = ({border, color}: Theme) =>
  StyleSheet.create({
    active: {
      borderWidth: border.width.md,
    },
    item: {
      backgroundColor: color.accessToken.digit.background,
      borderWidth: border.width.sm,
      borderColor: color.accessToken.digit.border,
      height: 52,
      width: 52,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
