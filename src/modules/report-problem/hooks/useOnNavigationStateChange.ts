import {useCallback} from 'react'
import type {WebViewNavigation} from 'react-native-webview'
import type {StackNavigationProp} from '@/app/navigation/types'
import type {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {PiwikAction} from '@/processes/piwik/types'

const ReportProblemEndUrlPath = '/incident/bedankt'

export const useOnNavigationStateChange = (
  navigation: StackNavigationProp<ReportProblemRouteName.reportProblemWebView>,
  canGoBack: React.RefObject<boolean>,
  reportProblemUrl: string,
  isEndUrl: React.RefObject<boolean>,
  setHasFinishedAtLeastOnce: React.Dispatch<React.SetStateAction<boolean>>,
  trackCustomEvent: (eventName: string, action: PiwikAction) => void,
) =>
  useCallback(
    ({url, canGoBack: newCanGoBack}: WebViewNavigation) => {
      if (url === reportProblemUrl || url.includes(ReportProblemEndUrlPath)) {
        canGoBack.current = false
      } else {
        canGoBack.current = newCanGoBack
      }

      if (url.includes(ReportProblemEndUrlPath)) {
        isEndUrl.current = true
        setHasFinishedAtLeastOnce(true)
        trackCustomEvent(
          'ReportProblemFinishedReport',
          PiwikAction.finishedReport,
        )
      } else {
        isEndUrl.current = false
      }

      navigation.setOptions({
        gestureEnabled: !canGoBack.current,
      })
    },
    [
      canGoBack,
      isEndUrl,
      navigation,
      reportProblemUrl,
      setHasFinishedAtLeastOnce,
      trackCustomEvent,
    ],
  )
