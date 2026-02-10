import {useState} from 'react'
import Animated, {FadeOutUp} from 'react-native-reanimated'
import {RenderIfModuleActive} from '@/components/features/RenderIfModuleActive'
import {Button} from '@/components/ui/buttons/Button'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {MijnAmsterdamRouteName} from '@/modules/mijn-amsterdam/routes'
import {ModuleSlug} from '@/modules/slugs'

export const NotificationHistoryBanner = () => {
  const {navigate} = useNavigation()
  const [isOpen, setIsOpen] = useState(true)
  const onClose = () => {
    setIsOpen(false)
  }

  return isOpen ? (
    <RenderIfModuleActive moduleSlug={ModuleSlug['mijn-amsterdam']}>
      <Animated.View
        exiting={FadeOutUp}
        testID="NotificationHistoryBanner">
        <Box
          inset="lg"
          variant="primary">
          <Column gutter="md">
            <Column gutter="sm">
              <Row align="between">
                <Title
                  color="inverse"
                  level="h4"
                  testID="NotificationHistoryBannerTitle"
                  text="Mijn Amsterdam meldingen"
                />
                <IconButton
                  accessibilityLabel="Sluit informatie mijn amsterdam meldingen"
                  icon={
                    <Icon
                      color="inverse"
                      name="close"
                      size="lg"
                      testID="NotificationHistoryBannerCloseIcon"
                    />
                  }
                  onPress={onClose}
                  testID="NotificationHistoryBannerCloseButton"
                />
              </Row>
              <Paragraph color="inverse">
                Blijf op de hoogte van uw aanvraag of klacht. Log in om
                meldingen in de app te ontvangen.
              </Paragraph>
            </Column>
            <Button
              label="Ga naar Mijn accounts"
              onPress={() =>
                navigate(ModuleSlug['mijn-amsterdam'], {
                  screen: MijnAmsterdamRouteName.settings,
                })
              }
              testID="NotificationHistoryBannerAccountsButton"
              variant="secondary"
            />
          </Column>
        </Box>
      </Animated.View>
    </RenderIfModuleActive>
  ) : null
}
