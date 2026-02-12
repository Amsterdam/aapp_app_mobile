import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {useModules} from '@/hooks/useModules'
import {Account} from '@/modules/generated/account.generated'

export const Accounts = () => {
  const {enabledModules} = useModules()

  return (
    <Box>
      <Column gutter="lg">
        {enabledModules?.map(module => {
          const AccountComponent = Account[module.slug as keyof typeof Account]

          if (!AccountComponent) {
            return null
          }

          return (
            <Box
              insetHorizontal="md"
              insetVertical="lg"
              key={module.slug}
              variant="distinct">
              <AccountComponent />
            </Box>
          )
        })}
      </Column>
    </Box>
  )
}
