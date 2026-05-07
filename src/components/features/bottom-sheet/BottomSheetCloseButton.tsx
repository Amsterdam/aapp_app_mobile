import {StyleSheet, View} from 'react-native'
import type {TestProps} from '@/components/ui/types'
import type {Theme} from '@/themes/themes'
import {useBottomSheetHandler} from '@/components/features/bottom-sheet/hooks/useBottomSheetHandler'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useThemable} from '@/themes/useThemable'

export const BottomSheetCloseButton = ({testID}: TestProps) => {
  const styles = useThemable(createStyles)
  const {onClose} = useBottomSheetHandler()

  return (
    <View style={styles.closeButton}>
      <IconButton
        accessibilityLabel="Sluit venster"
        icon={
          <Icon
            name="close"
            size="ml"
          />
        }
        onPress={onClose}
        testID={`${testID}BottomSheetCloseButton`}
      />
    </View>
  )
}

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    closeButton: {
      marginLeft: 'auto',
      marginRight: size.spacing.md,
    },
  })
