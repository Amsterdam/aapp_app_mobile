import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import type {BoatChargingSettings} from '@/modules/boat-charging/types'
import type {NonOptional} from '@/types/utils'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

type Props = Omit<
  NonOptional<ReturnType<typeof useBoatChargingSession>, 'session'>,
  'isLoading' | 'isError'
> &
  Pick<
    BoatChargingSettings,
    'session_expiry_hours' | 'standard_fine' | 'vat_fraction'
  >

export const BoatChargingSessionChargingTimeInfo = ({
  session,
  session_expiry_hours,
  chargingTimeString,
  standard_fine,
  vat_fraction,
}: Props) => (
  <Column gutter="md">
    <Column gutter="xs">
      <Title
        level="h5"
        text="Gestart op"
      />
      <Phrase>{formatDateTimeToDisplay(session.start_date_time, true)}</Phrase>
    </Column>

    <Column gutter="xs">
      <Title
        level="h5"
        text="Laadtijd"
      />
      <Phrase>
        {chargingTimeString ??
          formatTimeRangeToDisplay(session.start_date_time, dayjs())}
      </Phrase>
    </Column>

    {!!session_expiry_hours && !!standard_fine && vat_fraction && (
      <Column gutter="xs">
        <Title
          level="h5"
          text="Maximale laadtijd"
        />
        <Phrase>{session_expiry_hours} uur</Phrase>
        <Paragraph>
          Uw boot mag maximaal {session_expiry_hours} uur laden. Daarna betaalt
          u {formatNumber(standard_fine * vat_fraction, 'EUR')} per uur. Ook als
          u maar een deel van een uur gebruikt, betaalt u voor het hele uur.
        </Paragraph>
      </Column>
    )}
  </Column>
)
