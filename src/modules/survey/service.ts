import type {
  SurveyConfigByLocationResponse,
  SurveyVersionEntryParams,
} from '@/modules/survey/types'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {baseApi} from '@/services/baseApi'

export const surveyService = baseApi.injectEndpoints({
  endpoints: builder => ({
    createSurveyVersionEntry: builder.mutation<void, SurveyVersionEntryParams>({
      query: ({unique_code, version, ...body}) => ({
        slug: ModuleSlug.survey,
        url: `/surveys/${unique_code}/versions/${version}/entries`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Form'],
    }),
    surveyConfigByLocation: builder.query<
      SurveyConfigByLocationResponse,
      string
    >({
      query: location => ({
        slug: ModuleSlug.survey,
        url: `/config/${location}`,
      }),
      providesTags: ['Form'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateSurveyVersionEntryMutation,
  useSurveyConfigByLocationQuery,
} = surveyService
