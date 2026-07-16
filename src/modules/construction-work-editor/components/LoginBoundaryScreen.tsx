import {FC, ReactNode, useCallback, useEffect, useMemo} from 'react'
import {WebViewMessageEvent} from 'react-native-webview'
import {Screen, ScreenProps} from '@/components/features/screen/Screen'
import {WebView} from '@/components/ui/containers/WebView'
import {Column} from '@/components/ui/layout/Column'
import {TestProps} from '@/components/ui/types'
import {GlobalApiSlug} from '@/environment'
import {useRoute} from '@/hooks/navigation/useRoute'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {
  saveConstructionWorkEditorToken,
  selectConstructionWorkEditorAccessToken,
} from '@/modules/construction-work-editor/slice'
import {isTokenValid as checkIsTokenValid} from '@/modules/construction-work-editor/utils/token'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {selectApi} from '@/store/slices/environment'
import {addAuthorizedModule} from '@/store/slices/modules'

type Props = {
  children: ReactNode
} & TestProps

export const LoginBoundary: FC<Props> = ({children, testID}) => {
  const {params} =
    useRoute<ConstructionWorkEditorRouteName.authorizedProjects>()
  const dispatch = useDispatch()
  const onMessage = useCallback(
    (event: WebViewMessageEvent) => {
      const data = JSON.parse(event.nativeEvent.data) as {accessToken?: string}

      if (data.accessToken) {
        dispatch(saveConstructionWorkEditorToken(data.accessToken))
      }
    },
    [dispatch],
  )

  useEffect(() => {
    if (params?.accessToken?.length) {
      dispatch(saveConstructionWorkEditorToken(params.accessToken))
    }
  }, [dispatch, params?.accessToken])

  const token = useSelector(selectConstructionWorkEditorAccessToken)

  useEffect(() => {
    dispatch(addAuthorizedModule(ModuleSlug['construction-work-editor']))
  }, [dispatch])

  const url = useSelector(selectApi(GlobalApiSlug.admin, ''))
  const isTokenValid = useMemo(() => checkIsTokenValid(token), [token])

  if (isTokenValid) {
    return <>{children}</>
  }

  return (
    <Screen testID={testID}>
      <Column grow={1}>
        <WebView
          grow
          onMessage={onMessage}
          testID="ConstructionWorkEditorLoginWebView"
          url={url}
        />
      </Column>
    </Screen>
  )
}

export const LoginBoundaryScreen: FC<ScreenProps> = ({
  children,
  testID,
  ...props
}) => (
  <LoginBoundary testID={testID}>
    <Screen
      testID={testID}
      {...props}>
      {children}
    </Screen>
  </LoginBoundary>
)
