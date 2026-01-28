import {type ReactNode} from 'react'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase, type PhraseProps} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {type LogProps, PiwikAction} from '@/processes/piwik/types'

type Props = {
  children: ReactNode
  emphasis?: PhraseProps['emphasis']
  isExternal?: boolean
  isInverse?: boolean
  onPress: () => void
  phraseVariant?: PhraseProps['variant']
} & TestProps &
  PhraseProps &
  LogProps

export const InlineLink = ({
  accessibilityRole = 'link',
  children,
  emphasis,
  isInverse,
  onPress,
  phraseVariant,
  logAction = PiwikAction.buttonPress,
  isExternal = false,
  testID,
  ...otherProps
}: Props) => {
  const onEvent = usePiwikTrackCustomEventFromProps({
    ...otherProps,
    testID,
    logAction,
    onEvent: onPress,
  })

  return (
    <Phrase
      accessibilityRole={accessibilityRole}
      color={isInverse ? 'inverse' : 'link'}
      emphasis={emphasis}
      onPress={onEvent}
      testID={testID}
      underline={!isExternal}
      variant={phraseVariant}
      {...otherProps}>
      {children}
      {isExternal ? (
        <>
          {'  '}
          <Icon
            color="link"
            name="link-external"
            size="smd"
            testID={`${testID}Icon`}
          />
        </>
      ) : null}
    </Phrase>
  )
}
