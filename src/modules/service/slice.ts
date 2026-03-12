import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  type ServiceMapResponse,
  type ServicePointDetails,
} from '@/modules/service/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type ServiceState = {
  selectedServicePointDetails?: ServicePointDetails
  servicePropertiesToInclude?: ServiceMapResponse['properties_to_include']
}

const initialState: ServiceState = {}

export const serviceSlice = createSlice({
  name: ReduxKey.service,
  initialState,
  reducers: {
    setPropertiesToInclude: (
      state,
      {payload}: PayloadAction<ServiceMapResponse['properties_to_include']>,
    ) => {
      state.servicePropertiesToInclude = payload
    },
    resetPropertiesToInclude: state => {
      state.servicePropertiesToInclude = undefined
    },
    setSelectedServiceDetails: (
      state,
      {payload}: PayloadAction<ServicePointDetails>,
    ) => {
      state.selectedServicePointDetails = payload
    },
    resetSelectedServiceDetails: state => {
      state.selectedServicePointDetails = undefined
    },
  },
})

export const {
  setSelectedServiceDetails,
  resetSelectedServiceDetails,
  setPropertiesToInclude,
  resetPropertiesToInclude,
} = serviceSlice.actions

export const selectSelectedServicePointDetails = (state: RootState) =>
  state[ReduxKey.service].selectedServicePointDetails

export const selectServicePropertiesToInclude = (state: RootState) =>
  state[ReduxKey.service].servicePropertiesToInclude

export const useSelectedServicePointDetails = () => {
  const details = useSelector(selectSelectedServicePointDetails)

  const propertiesToInclude =
    useSelector(selectServicePropertiesToInclude) || []

  if (!details) {
    return
  }

  return {
    id: details.id,
    title: details.aapp_title,
    coordinates: details.coordinates,
    properties: propertiesToInclude.map(
      ({property_key, property_type, icon, label}) => ({
        [property_type]: details[property_key],
        icon,
        label,
      }),
    ),
  }
}
