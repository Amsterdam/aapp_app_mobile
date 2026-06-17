import {useCallback, useRef} from 'react'
import type {TestProps} from '@/components/ui/types'
import {Box} from '@/components/ui/containers/Box'
import {Switch} from '@/components/ui/forms/Switch'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {Permissions} from '@/types/permissions'

type Props = {
  description: string
  disabled?: boolean
  onChange: (value: boolean) => void
  testID: string
  value: boolean
} & TestProps

const Wrapper = ({children}: {children: React.ReactNode}) => (
  <Box
    borderColor="default"
    borderStyle="solid"
    borderWidth="md"
    grow>
    {children}
  </Box>
)

export const NotificationToggleBox = ({
  description,
  value,
  testID,
  onChange,
  disabled,
}: Props) => {
  const valueRef = useRef(value)
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
    Permissions.notifications,
  )
  const {registerDeviceIfPermitted} = useRegisterDevice()
  const onChangeFn = useCallback(() => {
    if (value) {
      onChange(false)
      valueRef.current = false
    } else {
      void registerDeviceIfPermitted(true).then(hasPermission => {
        if (hasPermission) {
          onChange(true)
          valueRef.current = true
        } else {
          navigateToInstructionsScreen()
        }
      })
    }
  }, [onChange, value, registerDeviceIfPermitted, navigateToInstructionsScreen])

  return (
    <Switch
      accessibilityLabel={`${description} staat ${valueRef.current ? 'aan' : 'uit'}`}
      disabled={disabled}
      label={
        <Column
          grow={1}
          gutter="sm">
          <Row gutter="sm">
            <Icon
              name="bell"
              size="lg"
              testID={`${testID}Icon`}
            />
            <Title
              level="h5"
              text="Meldingen"
            />
          </Row>
          <Phrase>{description}</Phrase>
        </Column>
      }
      onChange={onChangeFn}
      testID={`${testID}Switch`}
      value={value}
      wrapper={Wrapper}
    />
  )
}
