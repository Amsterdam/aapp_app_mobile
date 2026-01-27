import {useCallback, useEffect, useRef, useState} from 'react'
import {WebViewMessageEvent} from 'react-native-webview'
import {NavigationProps} from '@/app/navigation/types'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {WebView, type WebViewRef} from '@/components/ui/containers/WebView'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useOnAndroidBackPress} from '@/hooks/useOnAndroidBackPress'
import {useUrlForEnv} from '@/hooks/useUrlForEnv'
import {reportProblemExternalLinks} from '@/modules/report-problem/external-links'
import {useAlertBeforeNavigation} from '@/modules/report-problem/hooks/useAlertBeforeNavigation'
import {useOnNavigationStateChange} from '@/modules/report-problem/hooks/useOnNavigationStateChange'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {Survey} from '@/modules/survey/exports/Survey'
import {useOpenBottomsheetIfSurveyShouldShow} from '@/modules/survey/exports/useOpenBottomsheetIfSurveyShouldShow'
import {devLog} from '@/processes/development'
import {
  PiwikAction,
  useTrackEvents,
} from '@/processes/logging/hooks/useTrackEvents'

type Props = NavigationProps<ReportProblemRouteName.reportProblemWebView>

const injectedJavaScript = `
  window.postMessage = function(data) {
    window.ReactNativeWebView.postMessage(data);
  };

  let telFilled = false;
  let emailFilled = false;
  function preFillInputIfFound() {
    // Delay to ensure elements are rendered
    setTimeout(() => {
      window.postMessage('Checking for tel input');
      const telInput = document.querySelector('input[type="tel"]');
      if (telInput) {
        if (!telFilled) {
          window.postMessage('found');
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeInputValueSetter.call(telInput, '12346');
          telInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          telInput.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
          telFilled = true;
        } else {
          window.postMessage('tel already filled: ' + telInput.value);
        }
      } else {
        window.postMessage('not found');
      }
      const emailInput = document.querySelector('input[type="email"]');
      if (emailInput) {
        if (!emailFilled) {
          window.postMessage('found');
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeInputValueSetter.call(emailInput, '12346@as.nl');
          emailInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          emailInput.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
          emailFilled = true;
        } else {
          window.postMessage('email already filled: ' + emailInput.value);
        }
      } else {
        window.postMessage('not found');
      }
    }, 100);
  }
  // Initial check
  preFillInputIfFound();
  // Observe DOM changes
  const observer = new MutationObserver(preFillInputIfFound);
  observer.observe(document.body, { childList: true, subtree: true });
  `

const signalsCloseMessage = 'signals/close'

export const ReportProblemWebViewScreen = ({navigation}: Props) => {
  const reportProblemUrl = useUrlForEnv(reportProblemExternalLinks)
  const [hasFinishedAtLeastOnce, setHasFinishedAtLeastOnce] = useState(false)
  const {trackCustomEvent} = useTrackEvents()
  const open = useOpenBottomsheetIfSurveyShouldShow('report-problem')

  const onBlur = useCallback(() => {
    trackCustomEvent(
      hasFinishedAtLeastOnce
        ? 'ReportProblemFinishedBlur'
        : 'ReportProblemNotFinishedBlur',
      PiwikAction.blur,
    )
  }, [hasFinishedAtLeastOnce, trackCustomEvent])

  useBlurEffect(onBlur)

  const isEndUrl = useRef(false)

  const onMessage = useCallback(
    (event: WebViewMessageEvent) => {
      if (event.nativeEvent.data === signalsCloseMessage) {
        trackCustomEvent('ReportProblemCloseButton', PiwikAction.buttonPress)
        isEndUrl.current = true
        navigation.getParent()?.goBack()
      } else {
        devLog('WebView message:', event.nativeEvent.data)
      }
    },
    [navigation, trackCustomEvent],
  )

  const canGoBack = useRef<boolean>(false)
  const onNavigationStateChange = useOnNavigationStateChange(
    navigation,
    canGoBack,
    reportProblemUrl,
    isEndUrl,
    setHasFinishedAtLeastOnce,
    trackCustomEvent,
  )

  const webViewRef = useRef<WebViewRef>(null)
  const onHandleBackPress = useCallback(() => {
    if (webViewRef.current && canGoBack.current) {
      webViewRef.current.goBack()

      return true
    }

    return false
  }, [])

  useOnAndroidBackPress(onHandleBackPress)
  useAlertBeforeNavigation(navigation, onHandleBackPress, !isEndUrl.current)

  useEffect(() => {
    if (isEndUrl.current) {
      setTimeout(open, 500)
    }
  }, [open])

  return (
    <Screen
      bottomSheet={
        <BottomSheet testID="ReportProblemBottomSheet">
          <Survey />
        </BottomSheet>
      }
      hasStickyAlert
      scroll={false}
      testID="ReportProblemWebViewScreen">
      <WebView
        allowsBackForwardNavigationGestures
        injectedJavaScript={injectedJavaScript}
        onMessage={onMessage}
        onNavigationStateChange={onNavigationStateChange}
        ref={webViewRef}
        testID="ReportProblemWebView"
        url={reportProblemUrl}
      />
    </Screen>
  )
}
