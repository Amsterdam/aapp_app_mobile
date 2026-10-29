import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {BoatChargingSessionChargingTimeInfo} from '@/modules/boat-charging/components/session/BoatChargingSessionChargingTimeInfo'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'

export const BoatChargingSessionChargingTimeBottomSheet = () => {
  const {session, settings, isError, isLoading, ...rest} =
    useBoatChargingSession()

  const data = session && settings

  return (
    <Box
      insetBottom="md"
      insetHorizontal="md">
      <Column gutter="md">
        <Title
          level="h4"
          text="Over de laadtijd"
        />
        {!!isLoading && !isError && !data && (
          <PleaseWait testID="BoatChargingSessionChargingTimeBottomSheetPleaseWait" />
        )}
        {!!isError && !isLoading && !data && (
          <SomethingWentWrong testID="BoatChargingSessionChargingTimeBottomSheetSomethingWentWrong" />
        )}

        {!isError && !isLoading && data && (
          <BoatChargingSessionChargingTimeInfo
            {...rest}
            {...settings}
            session={session}
          />
        )}
      </Column>
    </Box>
  )
}
