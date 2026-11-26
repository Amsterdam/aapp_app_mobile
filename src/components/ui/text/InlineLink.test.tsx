import {fireEvent, render} from '@testing-library/react-native'
import {ExternalInlineLink} from '@/components/ui/text/ExternalInlineLink'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Phrase} from '@/components/ui/text/Phrase'
import {StoreProvider} from '@/providers/store.provider'

jest.mock('@/hooks/linking/useOpenExternalLink', () => ({
  useOpenExternalLink: () => ({
    onPress: jest.fn(),
    isError: false,
    isLoading: false,
  }),
}))

describe('InlineLink', () => {
  it('exposes accessibility props on one interactive view, not its text', () => {
    const onPress = jest.fn()
    const onAccessibilityAction = jest.fn()
    const {getByRole, getByTestId, getByText, getAllByRole} = render(
      <StoreProvider>
        <InlineLink
          accessibilityActions={[{name: 'open', label: 'Open details'}]}
          accessibilityHint="Opent details."
          accessibilityLabel="Meer informatie"
          accessibilityLanguage="nl-NL"
          accessibilityState={{expanded: false}}
          accessibilityValue={{text: 'Samengevouwen'}}
          onAccessibilityAction={onAccessibilityAction}
          onPress={onPress}
          testID="DetailsInlineLink">
          Bekijk details
        </InlineLink>
      </StoreProvider>,
    )

    const link = getByRole('button', {name: 'Meer informatie'})
    const text = getByText('Bekijk details')

    expect(link.type).not.toBe(text.type)
    expect(link.props.accessibilityHint).toBe('Opent details.')
    expect(link.props.accessibilityLanguage).toBe('nl-NL')
    expect(link.props.accessibilityState).toEqual({expanded: false})
    expect(link.props.accessibilityValue).toEqual({text: 'Samengevouwen'})
    expect(link.props.accessibilityActions).toEqual([
      {name: 'open', label: 'Open details'},
    ])
    expect(text.props.accessible).toBe(false)
    expect(text.props.onPress).toBeUndefined()
    expect(getAllByRole('button')).toHaveLength(1)

    fireEvent.press(link)
    expect(onPress).toHaveBeenCalledTimes(1)

    const event = {nativeEvent: {actionName: 'open'}}

    fireEvent(getByTestId('DetailsInlineLink'), 'accessibilityAction', event)
    expect(onAccessibilityAction).toHaveBeenCalledWith(event)
  })

  it('derives its accessible name from nested visible text', () => {
    const {getByRole} = render(
      <StoreProvider>
        <InlineLink
          onPress={jest.fn()}
          testID="DetailsInlineLink">
          Bekijk <Phrase emphasis="strong">details</Phrase>
        </InlineLink>
      </StoreProvider>,
    )

    expect(getByRole('button', {name: 'Bekijk, details'})).toBeTruthy()
  })

  it('retains the external link role and generated browser hint', () => {
    const {getByRole} = render(
      <StoreProvider>
        <ExternalInlineLink
          testID="TermsExternalInlineLink"
          url="https://example.com/terms">
          Bekijk alle voorwaarden
        </ExternalInlineLink>
      </StoreProvider>,
    )
    const link = getByRole('link', {name: 'Bekijk alle voorwaarden'})

    expect(link.props.accessibilityHint).toBe('Opent in webbrowser.')
  })

  it('keeps embedded links as interactive text without a pressable wrapper', () => {
    const onPress = jest.fn()
    const {getByRole, getByText} = render(
      <StoreProvider>
        <Phrase>
          Lees de{' '}
          <InlineLink
            accessibilityHint="Opent voorwaarden."
            isInline
            onPress={onPress}
            testID="TermsInlineLink"
            variant="external">
            voorwaarden
          </InlineLink>
        </Phrase>
      </StoreProvider>,
    )
    const link = getByRole('link', {name: 'voorwaarden'})

    expect(link).toBe(getByText('voorwaarden'))
    expect(link.props.accessibilityHint).toBe('Opent voorwaarden.')
    fireEvent.press(link)
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('preserves text styling, truncation and the icon in both modes', () => {
    const {getByTestId} = render(
      <StoreProvider>
        {[false, true].map(isInline => (
          <InlineLink
            actionIcon={{name: 'download'}}
            ellipsizeMode="tail"
            flexShrink={0}
            isInline={isInline}
            isInverse
            key={String(isInline)}
            numberOfLines={1}
            onPress={jest.fn()}
            phraseVariant="intro"
            testID={isInline ? 'EmbeddedInlineLink' : 'StandaloneInlineLink'}
            textAlign="center"
            variant="action">
            Download voorwaarden
          </InlineLink>
        ))}
      </StoreProvider>,
    )
    const standaloneText = getByTestId('StandaloneInlineLinkPhrase')
    const embeddedText = getByTestId('EmbeddedInlineLink')

    expect(standaloneText.props.style).toEqual(embeddedText.props.style)
    expect(standaloneText.props.numberOfLines).toBe(1)
    expect(standaloneText.props.ellipsizeMode).toBe('tail')
    expect(getByTestId('StandaloneInlineLink')).toHaveStyle({flexShrink: 0})
    expect(getByTestId('StandaloneInlineLinkIcon')).toBeTruthy()
    expect(getByTestId('EmbeddedInlineLinkIcon')).toBeTruthy()
  })
})
