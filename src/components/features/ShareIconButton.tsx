import {Platform, Share} from 'react-native'
import type {TestProps} from '@/components/ui/types'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'

type Props = {
  baseUrl: string
  exceptionFileName: string
  url: string
  urlTitle: string
} & TestProps

export const ShareIconButton = ({
  baseUrl,
  exceptionFileName,
  url,
  urlTitle,
  testID,
}: Props) => {
  const trackException = useTrackException()

  const onShare = async () => {
    try {
      await Share.share({
        message: url,
        title: urlTitle,
      })
    } catch (error) {
      trackException(ExceptionLogKey.shareFailed, exceptionFileName, {
        error,
        url: baseUrl,
      })
    }
  }

  return (
    <IconButton
      icon={
        <Icon
          color="link"
          name={Platform.OS === 'ios' ? 'share-ios' : 'share-android'}
          size="lg"
        />
      }
      onPress={onShare}
      testID={testID}
    />
  )
}
