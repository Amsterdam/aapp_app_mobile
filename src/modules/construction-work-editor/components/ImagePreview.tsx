import {StyleSheet, View} from 'react-native'
import type {ImagePickerAsset} from 'expo-image-picker'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {Image} from '@/components/ui/media/Image'
import {IconSize, TestProps} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  image: ImagePickerAsset
  onPress: () => void
} & TestProps

const iconSize = 'lg'

export const ImagePreview = ({image, onPress, testID}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <View>
      <Image source={image} />
      <View style={styles.buttonContainer}>
        <IconButton
          accessibilityHint="Verwijder foto"
          icon={
            <Icon
              color="link"
              name="trash-bin"
              size={iconSize}
              testID={`${testID}DeleteImageIcon`}
            />
          }
          onPress={onPress}
          testID={`${testID}DeleteImageButton`}
        />
      </View>
    </View>
  )
}

const createStyles = ({color, size}: Theme) => {
  const buttonContainerPadding = size.spacing.sm

  return StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: size.spacing.sm,
      right: size.spacing.sm,
      backgroundColor: color.pressable.secondary.default.background,
      borderRadius: (IconSize[iconSize] + buttonContainerPadding * 2) / 2,
      padding: buttonContainerPadding,
    },
  })
}
