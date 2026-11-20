import {useForm, useFormContext} from 'react-hook-form'
import type {NewSessionFormValues} from '@/modules/boat-charging/types'

export const useNewSessionForm = (defaultValues?: NewSessionFormValues) =>
  useForm<NewSessionFormValues>({
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
    defaultValues,
  })

export const useNewSessionFormContext = () =>
  useFormContext<NewSessionFormValues>()
