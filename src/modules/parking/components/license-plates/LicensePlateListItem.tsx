import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingLicensePlate} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  licensePlate: ParkingLicensePlate
  number: string
}

export const LicensePlateListItem = ({
  licensePlate: {activated_at, id, is_future, vehicle_id, visitor_name},
  number,
}: Props) => {
  const {forced_license_plate_list} = useCurrentParkingPermit()
  const licensePlate = `${vehicle_id}${visitor_name ? ' - ' + visitor_name : ''}`
  const {navigate} = useNavigation()

  const title = `${is_future ? '-' : number + '.'}  ${licensePlate}`

  if (forced_license_plate_list) {
    // TODO: Change this to ObjectButton once new component has been set up (https://gemeente-amsterdam.atlassian.net/browse/AM-1013)
    return (
      <Box
        insetHorizontal="no"
        insetVertical="sm">
        <Title
          accessibilityLabel={`Kenteken ${licensePlate}`}
          color="link"
          level="h5"
          testID="NavigationButtonTitle"
          text={title}
        />
      </Box>
    )
  }

  return (
    // TODO: Change this to ObjectButton once new component has been set up (https://gemeente-amsterdam.atlassian.net/browse/AM-1013)
    <NavigationButton
      accessibilityLabel={`Kenteken ${licensePlate}`}
      chevronColor="secondary"
      chevronSize="lg"
      description={
        is_future && activated_at
          ? `Actief vanaf ${dayjs(activated_at).format('D MMMM YYYY')}`
          : undefined
      }
      insetHorizontal="no"
      onPress={() => {
        if (!forced_license_plate_list) {
          navigate(ParkingRouteName.editLicensePlate, {licensePlateId: id})
        }
      }}
      testID="LicensePlateListItemNavigationButton"
      title={title}
    />
  )
}
