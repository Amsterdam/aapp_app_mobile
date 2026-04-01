import {useEffect, useState} from 'react'
import {useAddSecureParkingAccountName} from '@/modules/parking/hooks/useAddSecureParkingAccountName'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useAccountDetailsQuery} from '@/modules/parking/service'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const useSetParkingAccountName = (skipQuery?: boolean) => {
  const [isSetAccountName, setIsSetAccountName] = useState(false)

  const parkingAccount = useParkingAccount()
  const addSecureAccountName = useAddSecureParkingAccountName()

  const {secureAccount} = useGetSecureParkingAccount(
    parkingAccount?.scope || ParkingPermitScope.permitHolder,
    parkingAccount?.reportCode,
  )

  const skip =
    skipQuery ||
    !parkingAccount ||
    !secureAccount ||
    !!secureAccount?.name ||
    isSetAccountName ||
    parkingAccount?.scope === ParkingPermitScope.visitor

  const accountDetails = useAccountDetailsQuery(undefined, {skip}).data

  useEffect(() => {
    if (skip) {
      return
    }

    const {initials, last_name} = accountDetails ?? {}

    if (!initials && !last_name) {
      return
    }

    void addSecureAccountName(
      parkingAccount,
      [initials, last_name].filter(Boolean).join(' '),
    )

    setIsSetAccountName(true)
  }, [skip, accountDetails, addSecureAccountName, parkingAccount])
}
