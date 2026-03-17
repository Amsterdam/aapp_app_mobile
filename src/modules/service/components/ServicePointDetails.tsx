import {useEffect} from 'react'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelectedServicePointDetails} from '@/modules/service/hooks/useSelectedServicePointDetails'
import {resetSelectedServicePointId} from '@/modules/service/slice'
import {type Service} from '@/modules/service/types'
import {
  useBottomSheet,
  useBottomSheetSelectors,
} from '@/store/slices/bottomSheet'

export const ServicePointDetails = ({id: serviceId}: {id: Service['id']}) => {
  const {close: closeBottomSheet} = useBottomSheet()
  const {isOpen} = useBottomSheetSelectors()
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

  const {title} = servicePointDetails

  return (
    <Box>
      <Column gutter="lg">
        <Column gutter="xs">
          <Row align={title ? 'between' : 'end'}>
            {!!title && (
              <Title
                level="h3"
                ref={autoFocus}
                text={title}
              />
            )}
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
        </Column>
      </Column>
    </Box>
  )
}
