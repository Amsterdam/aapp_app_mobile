import {useFocusEffect} from '@react-navigation/native'
import {useCallback, useEffect, type PropsWithChildren} from 'react'
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
  onReset?: () => void
  resetOnFocus?: boolean
}>

export const BoatChargingVignetteFormProvider = ({
  defaultValues,
  onReset,
  resetOnFocus = false,
  children,
}: Props) => {
  const {resetAlert} = useAlert()
  const form = useForm<BoatChargingVignetteFormValues>({
    defaultValues,
    resetOptions: {
      keepIsSubmitted: false,
    },
  })

  useFocusEffect(
    useCallback(() => {
      if (!resetOnFocus) {
        return
      }

      form.reset({postalCode: undefined, vignetteNumber: undefined})
      onReset?.()
    }, [form, onReset, resetOnFocus]),
  )

  useEffect(() => {
    if (form.formState.isSubmitting) {
      resetAlert()
    }
  }, [form.formState.isSubmitting, resetAlert])

  return <FormProvider {...form}>{children}</FormProvider>
}
