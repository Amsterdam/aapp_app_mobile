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
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  selectShouldShowBanner,
  setShouldShowBanner,
} from '@/modules/mijn-amsterdam/slice'
import {ModuleSlug} from '@/modules/slugs'
import {UserRouteName} from '@/modules/user/routes'

export const NotificationHistoryBanner = () => {
  const {navigate} = useNavigation()
  const dispatch = useDispatch()
  const shouldShowBanner = useSelector(selectShouldShowBanner)

  if (!shouldShowBanner) {
    return null
  }

  return (
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
                  accessibilityLabel="Sluit informatie over mijn amsterdam meldingen"
                  icon={
                    <Icon
                      color="inverse"
                      name="close"
                      size="lg"
                      testID="NotificationHistoryBannerCloseIcon"
                    />
                  }
                  onPress={() => dispatch(setShouldShowBanner(false))}
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
                navigate(ModuleSlug.user, {
                  screen: UserRouteName.accounts,
                })
              }
              testID="NotificationHistoryBannerAccountsButton"
              variant="secondary"
            />
          </Column>
        </Box>
      </Animated.View>
    </RenderIfModuleActive>
  )
}
