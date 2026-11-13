import {useFocusEffect} from '@react-navigation/native'
import {useCallback, useEffect, type PropsWithChildren} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import type {BaseVignet} from '@/modules/boat-charging/types'
import {useAlert} from '@/store/slices/alert'

export type BoatChargingVignetFormValues = {
  postalCode: BaseVignet['postal_code']
  saveToMyVignettes?: boolean
  vignetNumber: BaseVignet['vignette_number']
}

type Props = PropsWithChildren<{
  defaultValues: Partial<BoatChargingVignetFormValues>
  onReset?: () => void
  resetOnFocus?: boolean
}>

export const BoatChargingVignetFormProvider = ({
  defaultValues,
  onReset,
  resetOnFocus = false,
  children,
}: Props) => {
  const {resetAlert} = useAlert()
  const form = useForm<BoatChargingVignetFormValues>({
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

      form.reset({postalCode: undefined, vignetNumber: undefined})
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
