import type {
  VehicleInformationSuccess,
  VehicleInformationFailure,
  VehicleInformationEndpointResponse,
} from '@/modules/parking/types'
import type {ApiMockHandler} from '@/storybook/mocks/api'
import type {ParkingStorybookParameters} from '@/storybook/mocks/parking'

const vehicleInformationMockSuccess: VehicleInformationSuccess = {
  success: true,
  content: {
    brand: 'PEUGEOT',
    color: 'GEEL',
    type: '208',
  },
}

const vehicleInformationMockError: VehicleInformationFailure = {
  success: false,
  content: null,
}

export const vehicleInformationMockHandler: ApiMockHandler<
  {license_plate: string},
  VehicleInformationEndpointResponse
> = ({params: {license_plate: licensePlate}}) => {
  if (licensePlate?.length !== 6) {
    return {
      data: vehicleInformationMockError,
      status: 200,
    }
  }

  return {
    data: vehicleInformationMockSuccess,
    status: 200,
  }
}

export const parkingDashboardMockHandler =
  (parameters: ParkingStorybookParameters): ApiMockHandler =>
  ({url}) => {
    const {parkingSessions = [], visitorParkingSessions = []} = parameters

    if (url.includes('/visitor/sessions')) {
      return {
        data: visitorParkingSessions,
        status: 200,
      }
    }

    if (url.includes('/sessions')) {
      return {
        data: {
          _links: {
            next: {href: ''},
            previous: {href: ''},
            self: {href: ''},
          },
          page: {
            number: 1,
            size: parkingSessions.length,
            totalElements: parkingSessions.length,
            totalPages: 1,
          },
          result: parkingSessions,
        },
        status: 200,
      }
    }

    return {data: null, status: 200}
  }
