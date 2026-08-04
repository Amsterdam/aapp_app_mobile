import {useForm, useFormContext} from 'react-hook-form'
import type {NewSessionFormValues} from '@/modules/boat-charging/types'

export const useNewSessionForm = () =>
  useForm<NewSessionFormValues>({
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
  })

export const useNewSessionFormContext = () =>
  useFormContext<NewSessionFormValues>()
