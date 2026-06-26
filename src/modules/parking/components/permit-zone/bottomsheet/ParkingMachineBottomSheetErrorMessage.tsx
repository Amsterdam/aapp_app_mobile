import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

const isSSPError = (error: unknown): error is {data: {code: string}} =>
  !!error &&
  typeof error === 'object' &&
  'data' in error &&
  typeof error.data === 'object' &&
  !!error.data &&
  'code' in error.data &&
  !!error.data.code

export const ParkingMachineBottomSheetErrorMessage = ({
  error,
}: {
  error: unknown
}) => (
  <Column gutter="sm">
    <Title
      level="h5"
      text={
        isSSPError(error) &&
        error.data.code === 'SSP_PARKING_MACHINE_NOT_IN_ZONE'
          ? 'Deze parkeerautomaat hoort niet bij uw vergunninggebied'
          : 'Er is een fout opgetreden'
      }
    />
    <Paragraph>U kunt hier geen parkeersessie starten</Paragraph>
  </Column>
)
