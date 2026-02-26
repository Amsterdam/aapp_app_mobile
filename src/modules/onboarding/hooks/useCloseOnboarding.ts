import {useCallback} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {setShouldShowOnboarding} from '@/modules/onboarding/slice'
import {ModuleSlug} from '@/modules/slugs'

const navigationResetParam = {index: 0, routes: [{name: ModuleSlug.home}]}

export const useCloseOnboarding = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  return useCallback(() => {
    dispatch(setShouldShowOnboarding(false))

    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.reset(navigationResetParam)
    }
  }, [dispatch, navigation])
}
