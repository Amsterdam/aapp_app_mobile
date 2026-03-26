import {useCallback, useEffect, useRef, useState} from 'react'
import {Platform} from 'react-native'
import {WebViewMessageEvent} from 'react-native-webview'
import {NavigationProps} from '@/app/navigation/types'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {WebView, type WebViewRef} from '@/components/ui/containers/WebView'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useOnAndroidBackPress} from '@/hooks/useOnAndroidBackPress'
import {useUrlForEnv} from '@/hooks/useUrlForEnv'
import {reportProblemExternalLinks} from '@/modules/report-problem/external-links'
import {useAlertBeforeNavigation} from '@/modules/report-problem/hooks/useAlertBeforeNavigation'
import {useOnNavigationStateChange} from '@/modules/report-problem/hooks/useOnNavigationStateChange'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {Survey} from '@/modules/survey/exports/Survey'
import {useOpenBottomsheetIfSurveyShouldShow} from '@/modules/survey/exports/useOpenBottomsheetIfSurveyShouldShow'
import {
  PiwikAction,
  useTrackEvents,
} from '@/processes/logging/hooks/useTrackEvents'
import {Permissions} from '@/types/permissions'

type Props = NavigationProps<ReportProblemRouteName.reportProblemWebView>

const injectedJavaScript = `
  window.postMessage = function(data) {
    window.ReactNativeWebView.postMessage(data);
  };`

const signalsCloseMessage = 'signals/close'

export const ReportProblemWebViewScreen = ({navigation}: Props) => {
  const reportProblemUrl = useUrlForEnv(reportProblemExternalLinks)
  const [hasFinishedAtLeastOnce, setHasFinishedAtLeastOnce] = useState(false)
  const {trackCustomEvent} = useTrackEvents()
  const open = useOpenBottomsheetIfSurveyShouldShow('report-problem')
  const {requestPermission} = usePermission(Permissions.camera)

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

  useEffect(() => {
    if (Platform.OS === 'android') {
      void requestPermission()
    }
  }, [requestPermission])

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
