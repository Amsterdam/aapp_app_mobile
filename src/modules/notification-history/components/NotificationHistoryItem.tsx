import {useLinkTo} from '@react-navigation/native'
import {StyleSheet, View} from 'react-native'
import {createPathFromNotification} from '@/app/navigation/createPathFromNotification'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Image} from '@/components/ui/media/Image'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Notification} from '@/modules/notification-history/types'
import {Module} from '@/modules/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {accessibleText} from '@/utils/accessibility/accessibleText'
import {formatHistoryDateTime} from '@/utils/datetime/formatHistoryDateTime'

type Props = {
  enabledModules: Module[] | undefined
  notification: Notification
}

export const NotificationHistoryItem = ({
  notification: {
    body,
    context,
    created_at,
    id,
    image,
    is_read,
    module_slug,
    title,
  },
  enabledModules = [],
}: Props) => {
  const {navigate} = useNavigation()
  const {fontScale} = useDeviceContext()
  const module = enabledModules.find(({slug}) => slug === module_slug)
  const styles = useThemable(createStyles(fontScale))
  const openUrl = useOpenUrl()

  const linkTo = useLinkTo()

  if (!module) {
    return null
  }

  const {icon} = module
  const createdAt = formatHistoryDateTime(created_at)

  return (
    <PressableBase
      accessibilityLabel={accessibleText(
        !is_read ? 'Ongelezen bericht: ' : undefined,
        title,
        body,
        `ontvangen: ${createdAt}`,
        context.url ? 'Opent in web brauwser.' : '',
      )}
      onPress={() => {
        if (context.url) {
          return openUrl(context.url)
        }

        const deeplinkUrl = createPathFromNotification(
          {
            id,
            title,
            body,
            data: context as Record<string, string | number | object>,
          },
          false,
        )

        if (deeplinkUrl) {
          linkTo(deeplinkUrl)
        } else if (module_slug) {
          navigate(module_slug)
        }
      }}
      testID={`NotificationHistoryItem${id}Button`}>
      <Box
        insetHorizontal="md"
        insetVertical="smd">
        <Row
          gutter="md"
          valign="start">
          <Row gutter="xs">
            {!is_read && (
              <View style={[styles.circle, styles.lineHeightCorrection]} />
            )}
            <View style={[styles.iconContainer, styles.lineHeightCorrection]}>
              {image && image.sources[0] ? (
                <Image
                  aspectRatio="square"
                  source={image.sources[0]}
                  testID={`NotificationHistoryItem${id}Image`}
                />
              ) : (
                <Icon
                  color="inverse"
                  name={icon}
                  size="lg"
                  testID={`NotificationHistoryItem${id}Icon`}
                />
              )}
            </View>
          </Row>
          <Column
            grow={1}
            shrink={1}>
            <Row gutter="sm">
              <Title
                level="h5"
                testID={`NotificationHistoryItem${id}Title`}
                text={title}
              />
              {!context.url && <Icon name="link-external" />}
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
    </PressableBase>
  )
}

const LINE_HEIGHT_CORRECTION = 6
const CIRCLE_SIZE = 6

const createStyles =
  (fontScale: number) =>
  ({color, size}: Theme) =>
    StyleSheet.create({
      circle: {
        height: CIRCLE_SIZE * fontScale,
        width: CIRCLE_SIZE * fontScale,
        borderRadius: (CIRCLE_SIZE * fontScale) / 2,
        backgroundColor: color.badge.background.warning,
      },
      iconContainer: {
        backgroundColor: color.notificationHistory.itemIcon.background,
        justifyContent: 'center',
        alignItems: 'center',
        width: size.iconContainer.lg * fontScale,
        height: size.iconContainer.lg * fontScale,
      },
      lineHeightCorrection: {
        marginTop: LINE_HEIGHT_CORRECTION * fontScale,
      },
    })
