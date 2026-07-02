import {use} from 'react'
import {DeviceContext} from '@/providers/device.context'

export const useDeviceContext = () => use(DeviceContext)
