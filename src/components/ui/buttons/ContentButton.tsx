import {Fragment, type ReactNode} from 'react'
import type {ImageURISource} from 'react-native'
import {Pressable, type PressableProps} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Size} from '@/components/ui/layout/Size'
import {Icon, type IconProps} from '@/components/ui/media/Icon'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {Phrase} from '@/components/ui/text/Phrase'

type Props = {
  dummy?: boolean
  includeDate?: boolean
  meta?: string
  onPress: () => void
  tag?: ReactNode
  title: string
} & Or<
  {
    images: Pick<ImageURISource, 'uri' | 'width' | 'height'>[]
  },
  {
    icon: IconProps
  }
> &
  Omit<
    PressableProps,
    'backgroundColor' | 'children' | 'border' | 'flex' | 'variant'
  >

export const ContentButton = ({
  images,
  icon,
  title,
  includeDate = true,
  tag,
  onPress,
  meta,
  dummy = false,
  testID,
  ...pressableProps
}: Props) => (
  <Pressable
    disabled={dummy}
    flex={1}
    onPress={onPress}
    testID={testID}
    {...pressableProps}>
    <Box insetHorizontal="md">
      <Row gutter="smd">
        <Box
          inset="no"
          variant="tinted">
          <Size
            height={80}
            width={100}>
            {images ? (
              <LazyImage
                aspectRatio="narrow"
                fallbackInheritsAspectRatio
                missingSourceFallback={dummy ? <Fragment /> : undefined}
                source={images}
                testID={`${testID}Image`}
              />
            ) : (
              <Center>
                <Icon
                  color="link"
                  {...icon}
                  size="xll"
                  testID={`${testID}Icon`}
                />
              </Center>
            )}
          </Size>
        </Box>
        <Column
          grow={1}
          shrink={1}>
          {tag}
          <Phrase
            accessible={false}
            numberOfLines={2}
            testID={`${testID}Title`}
            variant="small">
            {title}
          </Phrase>
          {!!includeDate && !tag && (
            <Phrase
              accessible={false}
              color="secondary"
              testID={`${testID}MetaPhrase`}
              variant="small">
              {meta}
            </Phrase>
          )}
        </Column>
      </Row>
    </Box>
  </Pressable>
)
