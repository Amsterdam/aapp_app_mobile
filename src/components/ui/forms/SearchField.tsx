import {type Ref, useState} from 'react'
import {
  type GestureResponderEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  type TextInputFocusEventData,
  type TextInputKeyPressEventData,
  type TextInputProps,
  View,
} from 'react-native'
import type {TestProps} from '@/components/ui/types'
import type {Theme} from '@/themes/themes'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useSearchField} from '@/hooks/useSearchField'
import {usePiwikTrackSearchFromProps} from '@/processes/piwik/hooks/usePiwikTrackSearchFromProps'
import {PiwikDimension} from '@/processes/piwik/types'
import {useThemable} from '@/themes/useThemable'

export type SearchFieldProps = {
  onChangeText?: (event: string) => void
  onFocus?: () => void
  ref?: Ref<TextInput | null>
} & TestProps &
  TextInputProps

export const SearchField = ({
  ref,
  onChangeText,
  onFocus,
  testID,
  value = '',
  multiline = true,
  accessibilityLanguage = 'nl-NL',
  ...textInputProps
}: SearchFieldProps) => {
  const [hasFocus, setHasFocus] = useState(false)
  const styles = useThemable(createStyles({hasFocus}))
  const themedTextInputProps = useThemable(createTextInputProps)
  const {
    type: searchType,
    amount: searchResultAmount,
    setSearchFieldValue,
  } = useSearchField()

  const onEvent = usePiwikTrackSearchFromProps({
    keyword: value,
    options: {
      customDimensions: {
        [PiwikDimension.searchTerm]: value,
        [PiwikDimension.searchType]: searchType,
        [PiwikDimension.searchResultAmount]: searchResultAmount.toString(),
      },
      category: searchType,
      count: searchResultAmount,
    },
  })

  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setHasFocus(false)
    onEvent(event)
  }

  const handleChangeText = (text: string) => {
    setSearchFieldValue(text)
    onChangeText?.(text)
  }

  const handleClearText = (event: GestureResponderEvent) => {
    setSearchFieldValue('')
    onChangeText?.('')
    onEvent(event)
  }

  const handleFocus = () => {
    setHasFocus(true)
    onFocus?.()
  }

  const handleBackspaceKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (event.nativeEvent.key === 'Backspace') {
      onEvent(event)
    }
  }

  return (
    <View style={styles.frame}>
      <TextInput
        {...textInputProps}
        {...themedTextInputProps}
        accessibilityLanguage={accessibilityLanguage}
        multiline={multiline}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onKeyPress={handleBackspaceKeyPress}
        ref={ref}
        style={styles.textInput}
        testID={testID}
        textAlignVertical="top"
        value={value}
      />
      {!!value && (
        <View>
          <IconButton
            accessibilityHint="Maak dit zoekveld leeg"
            accessibilityLanguage={accessibilityLanguage}
            icon={
              <Icon
                name="close"
                size="ml"
                testID={`${testID}Icon`}
              />
            }
            onPress={handleClearText}
            testID={`${testID}ClearButton`}
          />
        </View>
      )}
    </View>
  )
}

const createStyles =
  ({hasFocus}: {hasFocus?: boolean} & Partial<SearchFieldProps>) =>
  ({color, size, text}: Theme) =>
    StyleSheet.create({
      frame: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: size.spacing.smd,
        paddingHorizontal: size.spacing.md,
        backgroundColor: color.textInput.container.background,
        borderStyle: 'solid',
        borderColor: hasFocus
          ? color.control.focus.border
          : color.control.default.border,
        borderWidth: 2,
      },
      textInput: {
        flex: 1,
        padding: 0, // Override an Android default
        color: color.text.default,
        fontFamily: text.fontFamily.regular,
        fontSize: text.fontSize.body,
      },
    })

const createTextInputProps = ({color}: Theme): TextInputProps => ({
  placeholderTextColor: color.text.secondary,
})
