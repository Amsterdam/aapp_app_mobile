import type {RouteProp} from '@/app/navigation/types'

export const buildMetadata = (route: RouteProp<string>) => {
  const params = route.params ?? {}
  const query = Object.entries(params)
    .map(([key, value]) =>
      Array.isArray(value)
        ? value
            .map(
              (v: string) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(v)}`,
            )
            .join('&')
        : `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
    )
    .filter(Boolean)
    .join('&')

  return `${route.name}${query ? '/?' + query : ''}`
}
