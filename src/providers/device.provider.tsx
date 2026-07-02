import {ReactNode, useEffect, useState} from 'react'
import {useWindowDimensions} from 'react-native'
import {isTablet} from 'react-native-device-info'
import {DeviceContext, initialValue} from '@/providers/device.context'

type Props = {
  children: ReactNode
}

export const DeviceProvider = ({children}: Props) => {
  const [value, setValue] = useState(initialValue)
  const window = useWindowDimensions()

  useEffect(() => {
    setValue({
      isLandscape: window.height < window.width,
      isPortrait: window.height >= window.width,
      isTablet: isTablet(),
      isTallPhone: window.height / window.width > 2,
      ...window,
    })
  }, [window])

  return <DeviceContext value={value}>{children}</DeviceContext>
}
