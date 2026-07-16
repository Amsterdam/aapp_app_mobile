import {ComponentType, useLayoutEffect} from 'react'
import {NavigationProps, RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {Screen} from '@/components/features/screen/Screen'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {UnderConstructionFigure} from '@/components/ui/media/errors/UnderConstructionFigure'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {ModuleStatus} from '@/modules/types'
import {useGetCachedServerModule} from '@/store/slices/modules'

type Props = {
  component: ComponentType
  navigation: NavigationProps<keyof RootStackParams>['navigation']
  slug: ModuleSlug
}

export const InactiveModuleGuard = ({
  slug,
  component: Component,
  navigation,
  ...props
}: Props) => {
  const {cardStyle} = useScreenOptions()
  const {cachedServerModule} = useGetCachedServerModule(slug)
  const fallbackUrl =
    cachedServerModule?.moduleFallbackUrl ??
    cachedServerModule?.releaseFallbackUrl
  const reason =
    cachedServerModule?.moduleAppReason ?? cachedServerModule?.releaseAppReason
  const buttonLabel =
    cachedServerModule?.moduleButtonLabel ??
    cachedServerModule?.releaseButtonLabel

  useLayoutEffect(() => {
    navigation.setOptions({cardStyle})
  }, [cardStyle, navigation])

  if (cachedServerModule?.status === ModuleStatus.inactive) {
    return (
      <Screen
        bottomSheet
        headerOptions={{
          disableHorizontalInsets: true,
          headerTitle: cachedServerModule.title,
        }}
        testID="InactiveModuleGuardScreen">
        <Box>
          <Column
            gutter="xxl"
            halign="center">
            <Column gutter="lg">
              <Column gutter="md">
                <Title
                  level="h2"
                  text="Dit onderdeel werkt nu niet"
                  textAlign="center"
                />
                {!!reason && <Paragraph textAlign="center">{reason}</Paragraph>}
              </Column>
              {!!fallbackUrl && (
                <ExternalLinkButton
                  label={buttonLabel || 'Bekijk op Amsterdam.nl'}
                  testID="InactiveModuleGuardFallbackUrlExternalLinkButton"
                  url={fallbackUrl}
                  variant="secondary"
                />
              )}
            </Column>
            <UnderConstructionFigure />
          </Column>
        </Box>
      </Screen>
    )
  }

  return <Component {...props} />
}
