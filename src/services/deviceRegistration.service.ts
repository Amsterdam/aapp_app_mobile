import {Platform} from 'react-native'
import {GlobalApiSlug} from '@/environment'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
import {DeviceRegistrationEndpointName} from '@/types/device'

type DeviceRegistrationQueryArg = {
  firebase_token: string
}

type DeviceRegistrationMutationResponse = {
  external_id: string
  firebase_token: string
  id: number
  last_seen: string
  os: string
}

export const deviceRegistrationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [DeviceRegistrationEndpointName.registerDevice]: builder.mutation<
      DeviceRegistrationMutationResponse,
      DeviceRegistrationQueryArg
    >({
      query: body => ({
        body: {
          os: Platform.OS,
          ...body,
        },
        method: 'POST',
        slug: GlobalApiSlug.notification,
        url: '/device/register',
        headers: deviceIdHeader,
      }),
    }),
    [DeviceRegistrationEndpointName.unregisterDevice]: builder.mutation<
      string,
      undefined
    >({
      query: () => ({
        method: 'DELETE',
        slug: GlobalApiSlug.notification,
        url: '/device/register',
        headers: deviceIdHeader,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useRegisterDeviceMutation, useUnregisterDeviceMutation} =
  deviceRegistrationApi
