import type {
  VehicleInformationSuccess,
  VehicleInformationFailure,
  VehicleInformationEndpointResponse,
} from '@/modules/parking/types'
import type {ApiMockHandler} from '@/storybook/mocks/api'

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
