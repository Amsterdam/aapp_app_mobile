import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {List} from '@/components/ui/text/list/List'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useRemoveAllData} from '@/modules/user/hooks/useRemoveAllData'
import {UserRouteName} from '@/modules/user/routes'
import {Permissions} from '@/types/permissions'

export const RemoveAllData = () => {
  const {hasPermission} = usePermission(Permissions.notifications)

  const {isRemoving, requestRemoveAllData} = useRemoveAllData()
  const {navigate} = useNavigation()

  const onPress = useCallback(() => {
    if (hasPermission) {
      navigate(UserRouteName.removeAllDataPermissions)
    } else {
      requestRemoveAllData()
    }
  }, [hasPermission, navigate, requestRemoveAllData])

  return (
    <Column gutter="xl">
      <Column gutter="lg">
        <Paragraph>
          Hiermee verwijdert u uw persoonlijke instellingen van de app.
        </Paragraph>

        <Column gutter="smd">
          <Title
            level="h5"
            text="Wat gebeurt er?"
          />
          <List
            gutter="no"
            items={[
              'U wordt uitgelogd bij alle onderdelen van de app.',
              'U ontvangt geen meldingen meer.',
              'We verwijderen uw instellingen van de app.',
            ]}
            testID="RemoveAllDataScreenDetailsList"
          />
        </Column>
      </Column>
      <Button
        disabled={isRemoving}
        isLoading={isRemoving}
        label="Instellingen verwijderen"
        onPress={onPress}
        testID="RemoveAllDataScreenRemoveAllButton"
        variant="secondaryDestructive"
      />
    </Column>
  )
}
