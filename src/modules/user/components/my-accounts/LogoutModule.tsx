import {useCallback, useState} from 'react'
import type {ModuleSlug} from '@/modules/slugs'
import {Button} from '@/components/ui/buttons/Button'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useStore} from '@/hooks/redux/useStore'
import {clientModules} from '@/modules/modules'

type Props = {
  slug?: ModuleSlug
}

export const LogoutModule = ({slug}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const navigation = useNavigation()
  const module = clientModules.find(m => m.slug === slug)
  const store = useStore()

  const onLogout = useCallback(async () => {
    try {
      setIsError(false)

      if (!module?.logout) {
        setIsError(true)

        return
      }

      setIsLoading(true)
      await module.logout(store.dispatch, store.getState())
      navigation.goBack()
    } catch {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [module, navigation, store])

  if (!slug || !module) {
    return <SomethingWentWrong testID="LogoutModuleNoSlugSomethingWentWrong" />
  }

  return (
    <Column gutter="xl">
      <Column gutter="sm">
        <Title text="Wilt u uitloggen?" />
        <Paragraph variant="intro">
          Als u uitlogt, is dit account niet meer actief in de app. U kunt later
          altijd weer inloggen.
        </Paragraph>
      </Column>
      <Column gutter="md">
        <Button
          isError={isError}
          isLoading={isLoading}
          label="Uitloggen"
          onPress={() => {
            void onLogout()
          }}
          testID="UserLogoutModuleLogoutButton"
        />
        <Button
          label="Annuleren"
          onPress={() => {
            navigation.goBack()
          }}
          testID="UserLogoutModuleCancelButton"
          variant="secondary"
        />
      </Column>
    </Column>
  )
}
