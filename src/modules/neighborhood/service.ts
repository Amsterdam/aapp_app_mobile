import type {ImageSource} from 'react-native'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {
  NeighborhoodEndpointName,
  type NeighborhoodNote,
  type NeighborhoodNoteRequest,
} from '@/modules/neighborhood/types'
import {baseApi} from '@/services/baseApi'
import {CacheLifetime} from '@/types/api'

export const neighborhoodApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [NeighborhoodEndpointName.getNeighborhoodNotes]: builder.query<
      NeighborhoodNote[],
      {lat: number; lng: number}
    >({
      query: ({lat, lng}) => ({
        params: {lat, lng},
        slug: ModuleSlug.neighborhood,
        url: '/notes',
      }),
      providesTags: ['NeighborhoodBoardItems'],
      keepUnusedDataFor: CacheLifetime.fiveMinutes,
    }),
    [NeighborhoodEndpointName.getMyNeighborhoodNote]: builder.query<
      NeighborhoodNote[],
      string
    >({
      query: deviceId => ({
        headers: {DeviceId: deviceId},
        slug: ModuleSlug.neighborhood,
        url: '/own-notes',
      }),
      providesTags: ['NeighborhoodBoardItems'],
      keepUnusedDataFor: CacheLifetime.fiveMinutes,
    }),
    [NeighborhoodEndpointName.postNeighborhoodNotesImages]: builder.mutation<
      {image_set_id: string},
      {description?: string; image: ImageSource}
    >({
      query: body => ({
        body,
        method: 'POST',
        slug: ModuleSlug.neighborhood,
        url: '/notes/images',
      }),
    }),
    [NeighborhoodEndpointName.postNeighborhoodNotes]: builder.mutation<
      {
        note_id: number
      },
      NeighborhoodNoteRequest & {deviceId: string}
    >({
      invalidatesTags: ['NeighborhoodBoardItems'],
      query: ({deviceId, ...body}) => ({
        body,
        headers: {DeviceId: deviceId},
        method: 'POST',
        slug: ModuleSlug.neighborhood,
        url: '/notes',
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetNeighborhoodNotesQuery,
  usePostNeighborhoodNotesImagesMutation,
} = neighborhoodApi
