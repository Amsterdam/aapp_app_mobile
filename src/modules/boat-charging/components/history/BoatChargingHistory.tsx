import {useMemo} from 'react'
import {SectionList} from 'react-native'
import {Divider} from '@/components/ui/Divider'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {BoatChargingHistoryEmpty} from '@/modules/boat-charging/components/history/BoatChargingHistoryEmpty'
import {BoatChargingHistoryItem} from '@/modules/boat-charging/components/history/BoatChargingHistoryItem'
import {BoatChargingHistoryLogin} from '@/modules/boat-charging/components/history/BoatChargingHistoryLogin'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {useBoatChargingSessionsQuery} from '@/modules/boat-charging/service'
import {SessionStatus} from '@/modules/boat-charging/types'
import {groupBoatChargingSessionsByDate} from '@/modules/boat-charging/utils/groupBoatChargingSessionsByDate'
import {layoutStyles} from '@/styles/layoutStyles'

export const BoatChargingHistory = () => {
  const {isLoggedIn} = useIsLoggedIn()

  const {data, isLoading, isError} = useBoatChargingSessionsQuery(undefined, {
    skip: !isLoggedIn,
  })

  const history = data?.filter(
    session => session.status === SessionStatus.COMPLETED,
  )

  const sections = useMemo(
    () => groupBoatChargingSessionsByDate(history),
    [history],
  )

  if (!isLoggedIn) {
    return <BoatChargingHistoryLogin />
  }

  if (isLoading) {
    return <PleaseWait testID="BoatChargingHistoryPleaseWait" />
  }

  if (isError || !history) {
    return <SomethingWentWrong testID="BoatChargingHistorySomethingWentWrong" />
  }

  return (
    <SectionList
      contentContainerStyle={layoutStyles.grow}
      ListEmptyComponent={isLoading ? null : <BoatChargingHistoryEmpty />}
      renderItem={({item}) => <BoatChargingHistoryItem session={item} />}
      renderSectionFooter={() => <Gutter height="md" />}
      renderSectionHeader={({section}) => (
        <>
          {section !== sections[0] && <Divider />}
          <Gutter height="md" />
          <Phrase
            emphasis="strong"
            testID="BoatChargingHistorySessionDatePhrase">
            {section.title}
          </Phrase>
        </>
      )}
      sections={sections}
      stickySectionHeadersEnabled={false}
    />
  )
}
