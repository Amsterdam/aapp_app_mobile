import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {useOpenRedirect} from '@/hooks/linking/useOpenRedirect'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {redirects} from '@/modules/redirects/data/redirects'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {accessibleText} from '@/utils/accessibility/accessibleText'

export const Redirects = () => {
  const navigation = useNavigation<RedirectsRouteName>()

  const {openRedirect, isError, isLoading} = useOpenRedirect()

  return (
    <Column gutter="md">
      {isLoading ? (
        <PleaseWait testID="RedirectsPleaseWait" />
      ) : isError ? (
        <SomethingWentWrong testID="RedirectsSomethingWentWrong" />
      ) : (
        redirects.map(({iconName, routeName, testID, text, title, urlKey}) => (
          <TopTaskButton
            accessibilityLabel={accessibleText(title, text)}
            accessibilityRole={routeName ? 'button' : 'link'}
            icon={{name: iconName}}
            isExternalLink={!routeName}
            isInternalLink={!!routeName}
            key={testID}
            onPress={() => {
              if (routeName) {
                navigation.navigate(routeName)
              } else {
                openRedirect(urlKey)
              }
            }}
            testID={testID}
            text={text}
            title={title}
          />
        ))
      )}
    </Column>
  )
}
