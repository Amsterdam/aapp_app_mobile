import {useFocusEffect} from '@react-navigation/native'
import {useCallback} from 'react'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {ConstructionWorkFigure} from '@/components/ui/media/errors/ConstructionWorkFigure'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {NotificationHistoryBanner} from '@/modules/mijn-amsterdam/exports/NotificationHistoryBanner'
import {NotificationHistoryEmpty} from '@/modules/notification-history/components/NotificationHistoryEmpty'
import {NotificationHistoryList} from '@/modules/notification-history/components/NotificationHistoryList'
import {useGetNotificationsQuery} from '@/modules/notification-history/service'

export const NotificationHistory = () => {
  const navigation = useNavigation()
  const {data, isLoading, isError, error, refetch} = useGetNotificationsQuery()

  useFocusEffect(
    useCallback(() => {
      void refetch()
    }, [refetch]),
  )

  if (isLoading) {
    return (
      <>
        <NotificationHistoryBanner />
        <PleaseWait testID="NotificationHistoryPleaseWait" />
      </>
    )
  }

  if (isError) {
    return (
      <FullScreenError
        buttonLabel="Ga terug"
        error={error}
        Image={ConstructionWorkFigure}
        onPress={() => navigation.goBack()}
        testID="NotificationHistoryFullScreenError"
        title="Er kunnen geen meldingen worden getoond"
      />
    )
  }

  if (data?.length === 0) {
    return (
      <>
        <NotificationHistoryBanner />
        <NotificationHistoryEmpty />
      </>
    )
  }

  return <NotificationHistoryList data={data} />
}
