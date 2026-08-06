import {Platform, StyleSheet} from 'react-native'
import {
  WebView as WebViewRN,
  type WebViewProps as WebViewRNProps,
} from 'react-native-webview'
import type {Ref} from 'react'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {type TestProps} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'

type Props = {
  grow?: boolean
  ref?: Ref<WebViewRN | null>
  sliceFromTop?: {
    landscape: number
    portrait: number
  }
  url: string
  urlParams?: Record<string, string>
} & Omit<
  WebViewRNProps,
  'renderLoading' | 'source' | 'startInLoadingState' | 'style'
> &
  TestProps

const webViewInjection = (fontScale: number, injectedJavaScript?: string) => {
  const iosFontScaleScript = `
      document.getElementsByTagName("html")[0].style.fontSize = "${
        fontScale * 100
      }%";
    `
  const iosFontScale = Platform.OS === 'ios' ? iosFontScaleScript : ''

  return `(function() {
    ${injectedJavaScript ?? ''}
    ${iosFontScale}
  })()`
}

export type WebViewRef = WebViewRN

export const WebView = ({
  ref,
  grow,
  sliceFromTop,
  url,
  urlParams,
  injectedJavaScript,
  testID,
  ...webViewProps
}: Props) => {
  const {isPortrait, fontScale} = useDeviceContext()

  const params = new URLSearchParams(urlParams)
  const urlWithParams =
    urlParams && Object.keys(urlParams).length
      ? url + '?' + params.toString()
      : url

  return (
    <WebViewRN
      containerStyle={!!grow && styles.grow}
      nestedScrollEnabled
      ref={ref}
      renderLoading={() => (
        <Column grow={1}>
          <PleaseWait
            showFeedback
            testID={testID}
          />
        </Column>
      )}
      source={{uri: urlWithParams}}
      startInLoadingState
      style={
        !!sliceFromTop && {
          marginTop: isPortrait
            ? -sliceFromTop.portrait
            : -sliceFromTop.landscape,
        }
      }
      textZoom={Math.round(fontScale * 100)}
      {...webViewProps}
      injectedJavaScript={webViewInjection(fontScale, injectedJavaScript)}
    />
  )
}

const styles = StyleSheet.create({
  grow: {
    flexGrow: 1,
  },
})
