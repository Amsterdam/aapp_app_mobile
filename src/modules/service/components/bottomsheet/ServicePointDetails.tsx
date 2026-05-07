import {useEffect} from 'react'
import {RouteButton} from '@/components/ui/buttons/RouteButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ServicePointDetailsProperties} from '@/modules/service/components/ServicePointDetailsProperties'
import {useSelectedServicePointDetails} from '@/modules/service/hooks/useSelectedServicePointDetails'
import {resetSelectedServicePointId} from '@/modules/service/slice'
import {type Service} from '@/modules/service/types'

export const ServicePointDetails = ({id: serviceId}: {id: Service['id']}) => {
  const dispatch = useDispatch()
  const servicePointDetails = useSelectedServicePointDetails(serviceId)
  const autoFocus = useAccessibilityFocus()

  useEffect(
    () => () => {
      dispatch(resetSelectedServicePointId())
    },
    [dispatch],
  )

  if (!servicePointDetails) {
    return null
  }

  const {title, properties, subtitle} = servicePointDetails

  return (
    <Box
      insetBottom="md"
      insetHorizontal="md">
      <Column gutter="lg">
        <Column gutter="xs">
          <Title
            level="h3"
            ref={autoFocus}
            text={title}
          />
          {!!subtitle && <Phrase>{subtitle}</Phrase>}

          {!!servicePointDetails.coordinates && (
            <RouteButton
              coordinates={{
                lat: servicePointDetails.coordinates.lat,
                lon: servicePointDetails.coordinates.lon,
              }}
              testID="ServicePointDetailsRouteButton"
            />
          )}
        </Column>

        <ServicePointDetailsProperties properties={properties} />
      </Column>
    </Box>
  )
}
