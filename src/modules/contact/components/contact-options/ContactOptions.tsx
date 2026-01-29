import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ChatOption} from '@/modules/contact/components/contact-options/ChatOption'
import {contactOptions} from '@/modules/contact/data/contact'
import {ContactStackParams} from '@/modules/contact/routes'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'
import {accessibleText} from '@/utils/accessibility/accessibleText'

export const ContactOptions = () => {
  const {navigate} = useNavigation<keyof ContactStackParams>()
  const openUrl = useOpenUrl()
  const {data: redirectUrls, isLoading, isError} = useGetRedirectUrlsQuery()

  return (
    <Box>
      <Column gutter="lg">
        <Column gutter="sm">
          <Title
            testID="ContactContactOptionsTitle"
            text="Kunnen we u helpen?"
          />
          <Paragraph testID="ContactContactOptionsText">
            Heeft u een vraag of wilt u iets weten? Neem op werkdagen contact
            met ons op.
          </Paragraph>
        </Column>
        <Column gutter="md">
          {contactOptions.map(
            ({redirectsKey, url, icon, key, routeName, ...props}) => {
              const redirectUrl = redirectsKey && redirectUrls?.[redirectsKey]
              const resultUrl = redirectUrl ?? url

              if (redirectsKey && isError) {
                return (
                  <SomethingWentWrong
                    key={key}
                    testID="ContactContactOptionsSomethingWentWrong"
                  />
                )
              }

              if (key === 'chat') {
                return (
                  <ChatOption
                    key={key}
                    {...props}
                    icon={icon}
                  />
                )
              }

              return (
                <TopTaskButton
                  key={key}
                  {...props}
                  accessibilityLabel={accessibleText(
                    props.accessibilityLabel ?? props.title,
                    props.text,
                  )}
                  accessibilityRole="link"
                  icon={redirectsKey && isLoading ? {name: 'spinner'} : icon}
                  isExternalLink={/^https:/.test(resultUrl ?? '')}
                  isInternalLink={!!routeName}
                  onPress={() => {
                    if (resultUrl) {
                      openUrl(resultUrl)
                    } else if (routeName) {
                      // @ts-expect-error: routeName is a valid key for the stack, but navigate expects a more specific type
                      navigate(routeName)
                    }
                  }}
                />
              )
            },
          )}
        </Column>
      </Column>
    </Box>
  )
}
