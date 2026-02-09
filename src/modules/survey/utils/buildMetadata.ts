import {stringify} from 'picoquery'
import type {RouteProp} from '@/app/navigation/types'

export const buildMetadata = (route: RouteProp<string>) => {
  const params = route.params ?? {}

  return `${route.name}${Object.keys(params).length ? '/?' + stringify(params) : ''}`
}
