import {useCallback, useRef, useState} from 'react'
import {
  Keyboard,
  StyleSheet,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native'
import {sendTypingEvent} from 'react-native-salesforce-messaging-in-app/src'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useBoolean} from '@/hooks/useBoolean'
import {useKeyboardHeight} from '@/hooks/useKeyboardHeight'
import {ChatAttachment} from '@/modules/chat/components/ChatAttachment'
import {ChatEnded} from '@/modules/chat/components/ChatEnded'
import {useChatContext} from '@/modules/chat/providers/chat.context'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  onSubmit: (message: string) => void
}

export const ChatInput = ({onSubmit}: Props) => {
  const isScreenReaderEnabled = useIsScreenReaderEnabled()
  const trackException = useTrackException()

  const styles = useThemable(createStyles)
  const themedTextInputProps = useThemable(createTextInputProps)

  const [input, setInput] = useState('')
  const inputRef = useRef<TextInput | null>(null)
  const {
    value: selectAttachment,
    disable: hideSelectAttachment,
    enable: showSelectAttachment,
  } = useBoolean(false)

  const onChangeText = useCallback(
    (text: string) => {
      setInput(text)
      void sendTypingEvent().catch(error =>
        trackException(ExceptionLogKey.chatSendTypingEvent, 'ChatInput.tsx', {
          error,
        }),
      )
    },
    [trackException],
  )

  const handleSubmit = useCallback(
    (message: string) => {
      onSubmit(message)
      setInput('')
    },
    [onSubmit],
  )
  const {height: keyboardHeight, visible: keyboardVisible} = useKeyboardHeight()

  const {agentInChat, isEnded} = useChatContext()

  if (isEnded) {
    return <ChatEnded />
  }

  return (
    <>
      <Box variant="distinct">
        <Row gutter="sm">
          {!!agentInChat && (
            <IconButton
              accessibilityLabel={
                selectAttachment ? 'Naar toetsenbord' : 'Naar bijlages'
              }
              hitSlop={16}
              icon={
                <Icon
                  color="link"
                  name={selectAttachment ? 'keyboard' : 'attachment'}
                  size="xl"
                  testID="ChatAttachmentsIcon"
                />
              }
              onPress={() => {
                if (selectAttachment) {
                  inputRef.current?.focus()
                  hideSelectAttachment()
                } else {
                  Keyboard.dismiss()
                  setTimeout(showSelectAttachment, 300)
                }
              }}
              testID="ChatAttachmentsButton"
            />
          )}
          <View
            style={styles.container}
            testID="ChatTextInputContainer">
            <TextInput
              {...themedTextInputProps}
              autoFocus={isScreenReaderEnabled}
              multiline
              onChangeText={onChangeText}
              onFocus={hideSelectAttachment}
              placeholder="Typ uw bericht"
              ref={inputRef}
              style={styles.textInput}
              testID="ChatTextInput"
              value={input}
            />
            {input.length > 0 && (
              <View style={styles.buttonWrapper}>
                <View style={styles.spacePlaceholder} />
                <PressableBase
                  accessibilityLabel="Verstuur bericht"
                  onPress={() => handleSubmit(input)}
                  style={styles.button}
                  testID="ChatTextInputSendButton">
                  <Icon
                    color="inverse"
                    name="chevron-right"
                    testID="ChatTextInputSendButtonIcon"
                  />
                </PressableBase>
              </View>
            )}
          </View>
        </Row>
      </Box>
      {!!selectAttachment && !keyboardVisible && (
        <ChatAttachment
          minHeight={keyboardHeight}
          onSelect={hideSelectAttachment}
        />
      )}
    </>
  )
}

const SEND_BUTTON_DIMENSION = 40

const createStyles = ({border, color, text, size}: Theme) =>
  StyleSheet.create({
    button: {
      backgroundColor: color.pressable.primary.default.background,
      alignItems: 'center',
      justifyContent: 'center',
      height: SEND_BUTTON_DIMENSION,
      width: SEND_BUTTON_DIMENSION,
    },
    buttonWrapper: {
      height: '100%',
    },
    spacePlaceholder: {
      flexGrow: 1,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: border.width.sm,
      padding: size.spacing.xs,
      columnGap: size.spacing.sm,
      flex: 1,
    },
    textInput: {
      flex: 1,
      color: color.text.default,
      fontFamily: text.fontFamily.regular,
      fontSize: text.fontSize.body,
      padding: 0, // Override an Android default
      paddingLeft: size.spacing.md,
      paddingTop: size.spacing.sm,
      paddingBottom: size.spacing.sm,
    },
  })

const createTextInputProps = ({color}: Theme): TextInputProps => ({
  placeholderTextColor: color.text.secondary,
})
