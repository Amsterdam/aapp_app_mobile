import {useEffect} from 'react'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {
  resetSelecteServiceDetails,
  useSelectedServicePointDetails,
} from '@/modules/service/slice'
import {
  useBottomSheet,
  useBottomSheetSelectors,
} from '@/store/slices/bottomSheet'

export const ServiceDetails = () => {
  const {close: closeBottomSheet} = useBottomSheet()
  const {isOpen} = useBottomSheetSelectors()
  const dispatch = useDispatch()

  const serviceDetails = useSelectedServicePointDetails()

  const autoFocus = useAccessibilityFocus()

  useEffect(() => {
    if (!isOpen) {
      dispatch(resetSelecteServiceDetails())
    }
  }, [dispatch, isOpen])

  if (!serviceDetails) {
    return null
  }

  const {title} = serviceDetails

  return (
    <Box>
      <Column gutter="lg">
        <Column gutter="xs">
          <Row align="between">
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
        </Column>
      </Column>
    </Box>
  )
}
