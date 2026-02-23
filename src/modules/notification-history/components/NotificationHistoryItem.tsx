import {StyleSheet, View} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Image} from '@/components/ui/media/Image'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {NotificationHistoryItemPressable} from '@/modules/notification-history/components/NotificationHistoryItemPressable'
import {
  Notification,
  NotificationModule,
} from '@/modules/notification-history/types'
import {Module} from '@/modules/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {formatHistoryDateTime} from '@/utils/datetime/formatHistoryDateTime'

type Props = {
  enabledModules: Module[] | undefined
  notification: Notification
}

export const NotificationHistoryItem = ({
  notification,
  enabledModules = [],
}: Props) => {
  const {body, context, created_at, id, image, is_read, module_slug, title} =
    notification
  const {fontScale} = useDeviceContext()
  const module = enabledModules.find(({slug}) => slug === module_slug)
  const styles = useThemable(createStyles(fontScale))

  if (!module && module_slug !== NotificationModule.Modules) {
    return null
  }

  const createdAt = formatHistoryDateTime(created_at)

  return (
    <NotificationHistoryItemPressable
      createdAt={createdAt}
      notification={notification}>
      <Box
        insetHorizontal="md"
        insetVertical="smd">
        <Row
          gutter="md"
          valign="start">
          <View style={styles.iconContainer}>
            {!is_read && <View style={styles.circle} />}
            {image?.sources[0] ? (
              <Image
                aspectRatio="square"
                source={image.sources[0]}
                testID={`NotificationHistoryItem${id}Image`}
              />
            ) : (
              <Icon
                color="inverse"
                name={module?.icon ?? 'saint-andrews-crosses'}
                size="lg"
                testID={`NotificationHistoryItem${id}Icon`}
              />
            )}
          </View>
          <Column
            grow={1}
            shrink={1}>
            <Row gutter="sm">
              <Title
                level="h5"
                testID={`NotificationHistoryItem${id}Title`}
                text={title}
              />
              {!!context.url && <Icon name="link-external" />}
            </Row>
            <Paragraph testID={`NotificationHistoryItem${id}DescriptionText`}>
              {body}
            </Paragraph>
            <Phrase
              color="secondary"
              testID={`NotificationHistoryItem${id}CreationDatePhrase`}
              variant="body">
              {createdAt}
            </Phrase>
          </Column>
        </Row>
      </Box>
    </NotificationHistoryItemPressable>
  )
}

const LINE_HEIGHT_CORRECTION = 6
const CIRCLE_SIZE = 6

const createStyles =
  (fontScale: number) =>
  ({color, size}: Theme) => {
    const scaledCircleSize = CIRCLE_SIZE * fontScale

    return StyleSheet.create({
      circle: {
        position: 'absolute',
        left: -scaledCircleSize - size.spacing.xs,
        height: scaledCircleSize,
        width: scaledCircleSize,
        borderRadius: scaledCircleSize / 2,
        backgroundColor: color.badge.background.warning,
      },
      iconContainer: {
        backgroundColor: color.notificationHistory.itemIcon.background,
        justifyContent: 'center',
        alignItems: 'center',
        width: size.iconContainer.lg * fontScale,
        height: size.iconContainer.lg * fontScale,
        marginTop: LINE_HEIGHT_CORRECTION * fontScale,
      },
    })
  }
