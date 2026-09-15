import {useCallback, useState} from 'react'
import type {ImagePickerAsset} from 'expo-image-picker'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Size} from '@/components/ui/layout/Size'
import {Icon} from '@/components/ui/media/Icon'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDynamicImageAspectRatio} from '@/hooks/useDynamicImageAspectRatio'
import {useOpenImagePicker} from '@/hooks/useOpenImagePicker'
import {NeighborhoodRouteName} from '@/modules/neighborhood/routes'
import {usePostNeighborhoodNotesImagesMutation} from '@/modules/neighborhood/service'
import {devError} from '@/processes/development'

export const NeighborhoodBoardItemImageFormScreen = () => (
  <Screen
    scroll
    testID="NeighborhoodBoardItemImageFormScreen"
    withBottomInset={false}>
    <Box>
      <ImageUploadForm />
    </Box>
  </Screen>
)

const ImageUploadForm = () => {
  const uploadImage = useOpenImagePicker({base64: false})
  const [image, setImage] = useState<ImagePickerAsset[] | null>(null)
  const [isLoadingOpenImagePicker, setIsLoadingOpenImagePicker] =
    useState(false)
  const navigation = useNavigation()

  const [postImage, {error, isLoading: isLoadingPostImage}] =
    usePostNeighborhoodNotesImagesMutation()

  const onImagePress = useCallback(async () => {
    setIsLoadingOpenImagePicker(true)

    try {
      const assets = await uploadImage(false)

      setImage(assets as ImagePickerAsset[] | null)
    } finally {
      setIsLoadingOpenImagePicker(false)
    }
  }, [uploadImage])

  const aspectRatio = useDynamicImageAspectRatio(image?.[0].uri)

  const onSubmit = useCallback(async () => {
    if (!image) {
      return
    }

    try {
      const response = await postImage({image: image[0]})

      const {image_set_id} = response.data || {}

      if (!image_set_id) {
        throw new Error('image_set_id ontbreekt...')
      }

      navigation.navigate(NeighborhoodRouteName.addBoardItem, {
        image_set_id,
      })
    } catch {
      devError('Gaat niet goed ....')
    }
  }, [image, postImage, navigation])

  return (
    <Column gutter="sm">
      <Paragraph variant="intro">Upload eerst een foto</Paragraph>
      <Pressable
        onPress={onImagePress}
        testID="ImageUploadFormImagePickerButton">
        <Box
          inset="no"
          variant="tinted">
          <Size height={300}>
            {image ? (
              <LazyImage
                aspectRatio={aspectRatio}
                resizeMode="cover"
                source={{...image[0]}}
                testID="ImageUploadFormLazyImage"
              />
            ) : (
              <Center>
                <Icon
                  color="tertiary"
                  name={isLoadingOpenImagePicker ? 'spinner' : 'camera'}
                  size="xxl"
                />
              </Center>
            )}
          </Size>
        </Box>
      </Pressable>
      <Button
        disabled={isLoadingPostImage}
        isError={!!error}
        isLoading={isLoadingPostImage}
        label="Volgende"
        onPress={onSubmit}
        testID="ImageUploadFormSubmitButton"
      />
    </Column>
  )
}
