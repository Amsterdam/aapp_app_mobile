import {useCallback} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {setShouldShowOnboarding} from '@/modules/onboarding/slice'

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
