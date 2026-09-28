import {ReactNode} from 'react'
import {useForm, FormProvider} from 'react-hook-form'
import {ParkingLicensePlate} from '@/modules/parking/types'

type Props = {
  children: ReactNode
  defaultValues?: Partial<ParkingLicensePlate>
}

export const ParkingSessionLicensePlateFormProvider = ({
  children,
  defaultValues,
}: Props) => {
  const form = useForm<ParkingLicensePlate>({defaultValues})

  return <FormProvider {...form}>{children}</FormProvider>
}
