import {skipToken} from '@reduxjs/toolkit/query'
import {useFormContext} from 'react-hook-form'
import {DelayedRender} from '@/components/features/DelayedRender'
import {Notice} from '@/components/ui/feedback/Notice'
import {useVehicleInformationQuery} from '@/modules/parking/service'
import {capitalizeString} from '@/utils/transform/capitalizeString'

type Props = {
  /**
   * The name of the formContextProperty that holds the vehicle ID
   */
  name?: string
}

type NotInRegisterProps = {withDelay?: boolean}
const NotInRegisterNotice = ({withDelay = false}: NotInRegisterProps) => (
  <DelayedRender
    delay={withDelay ? 1000 : 0}
    show>
    <Notice
      text={`Niet gevonden in het RDW-register\nBuitenlandse kentekens staan hier niet in.`}
      variant="information"
    />
  </DelayedRender>
)

const MINIMUM_LENGTH_FOR_WARNING = 5
const MAXIMUM_LENGTH_FOR_WARNING = 7

export const VehicleInformation = ({name = 'vehicle_id'}: Props) => {
  const {watch} = useFormContext()
  const licensePlate = watch(name) as string

  const licensePlateLength = licensePlate?.length ?? 0
  const {data, isFetching} = useVehicleInformationQuery(
    licensePlateLength === 6 ? licensePlate : skipToken,
  )

  if (
    licensePlateLength === MINIMUM_LENGTH_FOR_WARNING ||
    licensePlateLength === MAXIMUM_LENGTH_FOR_WARNING
  ) {
    return (
      <NotInRegisterNotice
        withDelay={licensePlateLength === MINIMUM_LENGTH_FOR_WARNING}
      />
    )
  }

  // make sure no old data is rendered, so no data for another license plate is shown
  if (
    !data ||
    isFetching ||
    licensePlateLength < MINIMUM_LENGTH_FOR_WARNING ||
    licensePlateLength > MAXIMUM_LENGTH_FOR_WARNING
  ) {
    return null
  }

  if (!data.success) {
    return <NotInRegisterNotice />
  }

  const {brand, type, color} = data.content

  return (
    <Notice
      text={`${brand} ${type} - ${capitalizeString(color.toLocaleLowerCase())}\nBron: RDW-register`}
      variant="positive"
    />
  )
}
