import {ModuleSlug} from '@/modules/slugs'
import {
  SportEndpointName,
  type SportLocationsResponse,
} from '@/modules/sport/types'
import {baseApi} from '@/services/baseApi'
import {generateRequestUrl} from '@/utils/api'

export const sportsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [SportEndpointName.sportLocations]: builder.query<
      SportLocationsResponse,
      void
    >({
      query: () => ({
        method: 'GET',
        slug: ModuleSlug.sport,
        url: '/swim/locations',
      }),
    }),
    [SportEndpointName.locationActivities]: builder.query<unknown, string>({
      query: detailName => ({
        method: 'GET',
        slug: ModuleSlug.sport,
        url: `/swim/activities/${detailName}`,
      }),
    }),
    [SportEndpointName.locationSchedule]: builder.query<
      unknown,
      {calender_days: string; detailName: string}
    >({
      query: ({detailName, ...params}) => ({
        method: 'GET',
        slug: ModuleSlug.sport,
        url: generateRequestUrl({path: `/swim/schedule/${detailName}`, params}),
      }),
    }),
  }),
  overrideExisting: false,
})

export const {useSportLocationsQuery} = sportsApi
