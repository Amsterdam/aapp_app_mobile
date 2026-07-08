import type {TestProps} from '@/components/ui/types'
import type {Theme} from '@/themes/themes'
import type {ReactNode} from 'react'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {InactiveModuleMessage} from '@/modules/user/components/module-settings/InactiveModuleMessage'

export type ModuleSettingInfoProps = {
  description: string
  isInactive?: boolean
  title: string
  titleColor?: keyof Theme['color']['text']
} & Or<{iconPath?: string}, {Icon?: ReactNode}> &
  TestProps

export const ModuleSettingInfo = ({
  description,
  iconPath,
  isInactive = false,
  titleColor,
  Icon: CustomIcon,
  testID,
  title,
}: ModuleSettingInfoProps) => {
  const color = isInactive ? 'secondary' : titleColor

  return (
    <Column gutter="sm">
      <Row gutter="sm">
        {CustomIcon ||
          (!!iconPath && (
            <Icon
              color={color}
              path={iconPath}
              size="lgx"
              testID={`${testID}Icon`}
            />
          ))}
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
