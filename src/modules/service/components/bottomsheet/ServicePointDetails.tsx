import {useEffect} from 'react'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {RouteButton} from '@/components/ui/buttons/RouteButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ServicePointDetailsProperties} from '@/modules/service/components/ServicePointDetailsProperties'
import {useSelectedServicePointDetails} from '@/modules/service/hooks/useSelectedServicePointDetails'
import {resetSelectedServicePointId} from '@/modules/service/slice'
import {type Service} from '@/modules/service/types'

export const ServicePointDetails = ({id: serviceId}: {id: Service['id']}) => {
  const {close: closeBottomSheet} = useBottomSheet()
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
    <Box>
      <Column gutter="lg">
        <Column gutter="xs">
          <Row
            align={title ? 'between' : 'end'}
            valign="start">
            <Column>
              <Title
                level="h3"
                ref={autoFocus}
                text={title}
              />
              {!!subtitle && <Phrase>{subtitle}</Phrase>}
            </Column>
            <IconButton
              accessibilityLabel={`Sluit ${title} details venster`}
              icon={
                <Icon
                  name="close"
                  size="ml"
                />
              }
              onPress={closeBottomSheet}
              testID="ServiceDetailsCloseButton"
            />
          </Row>

          <RouteButton
            coordinates={{
              lat: servicePointDetails.coordinates.lat,
              lon: servicePointDetails.coordinates.lon,
            }}
            testID="ServicePointDetailsRouteButton"
          />
        </Column>

        <ServicePointDetailsProperties properties={properties} />
      </Column>
    </Box>
  )
}
