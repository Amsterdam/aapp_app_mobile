import {useEffect, type PropsWithChildren} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import type {BaseVignette} from '@/modules/boat-charging/types'
import {useAlert} from '@/store/slices/alert'

export type BoatChargingVignetteFormValues = {
  postalCode: BaseVignette['postal_code']
  saveToMyVignettes?: boolean
  vignetteNumber: BaseVignette['vignette_number']
}

type Props = PropsWithChildren<{
  defaultValues: Partial<BoatChargingVignetteFormValues>
}>

export const BoatChargingVignetteFormProvider = ({
  defaultValues,
  children,
}: Props) => {
  const {resetAlert} = useAlert()
  const form = useForm<BoatChargingVignetteFormValues>({
    defaultValues,
    resetOptions: {
      keepIsSubmitted: false,
    },
  })

  useEffect(() => {
    if (form.formState.isSubmitting) {
      resetAlert()
    }
  }, [form.formState.isSubmitting, resetAlert])

  return <FormProvider {...form}>{children}</FormProvider>
}
