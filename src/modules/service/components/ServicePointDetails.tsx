import {useContext, useEffect} from 'react'
import {BottomSheetContext} from '@/components/features/bottom-sheet/providers/bottomSheet.context'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {RouteButton} from '@/components/ui/buttons/RouteButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ServicePointDetailsProperties} from '@/modules/service/components/ServicePointDetailsProperties'
import {useSelectedServicePointDetails} from '@/modules/service/hooks/useSelectedServicePointDetails'
import {resetSelectedServicePointId} from '@/modules/service/slice'
import {type Service} from '@/modules/service/types'

export const ServicePointDetails = ({id: serviceId}: {id: Service['id']}) => {
  const {close: closeBottomSheet, isOpen} = useContext(BottomSheetContext)
  const dispatch = useDispatch()
  const servicePointDetails = useSelectedServicePointDetails(serviceId)
  const autoFocus = useAccessibilityFocus()

  useEffect(() => {
    if (!isOpen) {
      dispatch(resetSelectedServicePointId())
    }
  }, [dispatch, isOpen])

  if (!servicePointDetails) {
    return null
  }

  const {title, properties} = servicePointDetails

  return (
    <Box>
      <Column gutter="lg">
        <Column gutter="xs">
          <Row align={title ? 'between' : 'end'}>
            <Title
              level="h3"
              ref={autoFocus}
              text={title}
            />
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
