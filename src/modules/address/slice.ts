import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {ModuleSlug} from '@/modules/slugs'
import {useSelector} from '@/hooks/redux/useSelector'
import {MAX_RECENT_ADDRESSES} from '@/modules/address/constants'
import {
  Address,
  AddressState,
  HighAccuracyPurposeKey,
  LocationType,
} from '@/modules/address/types'
import {selectIsPermissionGranted} from '@/store/slices/permissions'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'
import {Permissions} from '@/types/permissions'

const initialState: AddressState = {
  address: undefined,
  location: undefined,
  highAccuracyPurposeKey: HighAccuracyPurposeKey.PreciseLocationAddressLookup,
  locationType: undefined,
  locationFetchRequested: undefined,
  getLocationIsError: undefined,
  isGettingLocation: undefined,
  recentAddresses: [],
  moduleLocationType: {},
  moduleCustomAddress: {},
}

export const addressSlice = createSlice({
  name: ReduxKey.address,
  initialState,
  reducers: {
    addAddress: (state, {payload: address}: PayloadAction<Address>) => ({
      ...state,
      address,
    }),
    addRecentAddress: (state, {payload: address}: PayloadAction<Address>) => ({
      ...state,
      recentAddresses: [
        address,
        ...state.recentAddresses.filter(a => a.bagId !== address.bagId),
      ].slice(0, MAX_RECENT_ADDRESSES),
    }),
    addLocation: (state, {payload: location}: PayloadAction<Address>) => ({
      ...state,
      location,
      getLocationIsError: false,
    }),
    removeAddress: ({address: _address, ...rest}) => rest,
    requestLocationFetch: (
      state,
      {
        payload: highAccuracyPurposeKey,
      }: PayloadAction<HighAccuracyPurposeKey | undefined>,
    ) => ({
      ...state,
      highAccuracyPurposeKey:
        highAccuracyPurposeKey ?? initialState.highAccuracyPurposeKey,
      locationFetchRequested: true,
      getLocationIsError: false,
    }),
    setGetLocationIsError: (
      state,
      {payload: getLocationIsError}: PayloadAction<boolean>,
    ) => ({
      ...state,
      getLocationIsError,
      ...(getLocationIsError && {locationFetchRequested: false}),
    }),
    setIsGettingLocation: (
      state,
      {payload: isGettingLocation}: PayloadAction<boolean>,
    ) => ({
      ...state,
      isGettingLocation,
      ...(isGettingLocation && {
        locationFetchRequested: false,
        getLocationIsError: false,
      }),
    }),
    setLocationType: (
      state,
      {
        payload: {locationType, moduleSlug},
      }: PayloadAction<{locationType: LocationType; moduleSlug: ModuleSlug}>,
    ) => ({
      ...state,
      moduleLocationType: {
        ...state.moduleLocationType,
        [moduleSlug]: locationType,
      },
    }),
    setModuleCustomAddress: (
      state,
      {
        payload: {moduleSlug, address},
      }: PayloadAction<{address: Address | undefined; moduleSlug: ModuleSlug}>,
    ) => ({
      ...state,
      moduleCustomAddress: {
        ...state.moduleCustomAddress,
        [moduleSlug]: address
          ? {...address, showSaveAsMyAddress: false}
          : undefined,
      },
    }),
    setShowSaveAsMyAddress: (
      state,
      {
        payload: {moduleSlug, show},
      }: PayloadAction<{
        moduleSlug: ModuleSlug
        show: boolean
      }>,
    ) => {
      const customAddress = state.moduleCustomAddress?.[moduleSlug]

      if (customAddress) {
        customAddress.showSaveAsMyAddress = show
      }
    },
  },
})

export const {
  addAddress,
  addRecentAddress,
  addLocation,
  removeAddress,
  requestLocationFetch,
  setGetLocationIsError,
  setIsGettingLocation,
  setLocationType,
  setModuleCustomAddress,
  setShowSaveAsMyAddress,
} = addressSlice.actions

export const selectMyAddress = (state: RootState) =>
  state[ReduxKey.address].address

export const selectLocation = (state: RootState) =>
  state[ReduxKey.address].location

export const selectLocationFetchRequested = (state: RootState) =>
  state[ReduxKey.address].locationFetchRequested
export const selectGetLocationIsError = (state: RootState) =>
  state[ReduxKey.address].getLocationIsError

export const selectHighAccuracyPurposeKey = (state: RootState) =>
  state[ReduxKey.address].highAccuracyPurposeKey
export const selectIsGettingLocation = (state: RootState) =>
  state[ReduxKey.address].isGettingLocation ?? false

export const selectRecentAddresses = (state: RootState) =>
  state[ReduxKey.address].recentAddresses

export const selectCustomAddress =
  (moduleSlug: ModuleSlug) => (state: RootState) =>
    state[ReduxKey.address].moduleCustomAddress?.[moduleSlug]

export const useRecentAddresses = () => useSelector(selectRecentAddresses)

export const useMyAddress = () => useSelector(selectMyAddress)

export const useLocation = () => ({
  locationFetchRequested: useSelector(selectLocationFetchRequested),
  getLocationIsError: useSelector(selectGetLocationIsError),
  highAccuracyPurposeKey: useSelector(selectHighAccuracyPurposeKey),
  isGettingLocation: useSelector(selectIsGettingLocation),
  location: useSelector(selectLocation),
})

export const selectLocationType =
  (moduleSlug: ModuleSlug) =>
  (state: RootState): LocationType | undefined => {
    const locationType =
      state[ReduxKey.address].moduleLocationType?.[moduleSlug] ??
      state[ReduxKey.address].locationType
    const address = selectMyAddress(state)
    const customAddress = selectCustomAddress(moduleSlug)(state)
    const hasLocationPermission = selectIsPermissionGranted(
      Permissions.location,
    )(state)

    // If location type is custom and there is an address available, return address
    if (locationType === 'custom' && customAddress) {
      return 'custom'
    }

    // If location type is address and my address is available, return my address
    if (locationType === 'address' && address) {
      return 'address'
    }

    // If location type is location and location permission is granted, return location
    if (locationType === 'location' && hasLocationPermission) {
      return 'location'
    }

    // If address is set, return address
    if (address) {
      return 'address'
    }

    // If location permission is granted, return location
    if (hasLocationPermission) {
      return 'location'
    }

    // Otherwise, return address
    return undefined
  }

export const useLocationType = (moduleSlug: ModuleSlug) =>
  useSelector(selectLocationType(moduleSlug))
