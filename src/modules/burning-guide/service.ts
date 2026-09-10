import {
  BurningGuideEndpointName,
  type BurningGuideApiResponse,
} from '@/modules/burning-guide/types'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {baseApi} from '@/services/baseApi'

export const burningGuideApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [BurningGuideEndpointName.burningGuide]: builder.query<
      BurningGuideApiResponse,
      string
    >({
      query: postal_code => ({
        method: 'GET',
        params: {postal_code},
        slug: ModuleSlug['burning-guide'],
        url: '/advice',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {useBurningGuideQuery} = burningGuideApi
