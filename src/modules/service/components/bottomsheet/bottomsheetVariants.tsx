import {type FC} from 'react'
import type {Service} from '@/modules/service/types'
import {ServiceMapLayers} from '@/modules/service/components/bottomsheet/ServiceMapLayers'
import {ServicePointDetails} from '@/modules/service/components/bottomsheet/ServicePointDetails'

export enum ServiceMapBottomSheetVariant {
  layers = 'layers',
  servicePointDetails = 'servicePointDetails',
}

export const createBottomsheetVariants = (
  serviceId: Service['id'],
): Record<ServiceMapBottomSheetVariant, FC> => ({
  [ServiceMapBottomSheetVariant.servicePointDetails]: () => (
    <ServicePointDetails id={serviceId} />
  ),
  [ServiceMapBottomSheetVariant.layers]: () => (
    <ServiceMapLayers id={serviceId} />
  ),
})
