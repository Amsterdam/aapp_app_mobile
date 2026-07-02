import type {TestProps} from '@/components/ui/types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {InactiveModuleMessage} from '@/modules/user/components/module-settings/InactiveModuleMessage'

type ModuleSettingInfoProps = {
  description: string
  iconPath: string
  isInactive?: boolean
  title: string
} & TestProps

export const ModuleSettingInfo = ({
  description,
  iconPath,
  isInactive = false,
  testID,
  title,
}: ModuleSettingInfoProps) => {
  const color = isInactive ? 'secondary' : undefined

  return (
    <Column gutter="sm">
      <Row gutter="sm">
        {!!iconPath && (
          <Icon
            color={color}
            path={iconPath}
            size="lg"
            testID={`${testID}Icon`}
          />
        )}
        <Title
          color={color}
          level="h5"
          testID={`${testID}Title`}
          text={title}
        />
      </Row>
      {isInactive ? (
        <InactiveModuleMessage />
      ) : (
        <Paragraph
          testID={`${testID}Paragraph`}
          variant="small">
          {description}
        </Paragraph>
      )}
    </Column>
  )
}
