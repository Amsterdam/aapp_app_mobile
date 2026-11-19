import {
  Children,
  isValidElement,
  useMemo,
  type JSXElementConstructor,
  type PropsWithChildren,
  type ReactElement,
} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import type {SvgIconName} from '@/components/ui/media/svgIcons'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Title} from '@/components/ui/text/Title'
import type {TestProps} from '@/components/ui/types'
import {capitalizeString} from '@/utils/transform/capitalizeString'

const PRESSABLE_COMPONENTS = new Set<JSXElementConstructor<never>>([
  Button,
  NavigationButton,
  InlineLink,
  ExternalLinkButton,
]) // Add components to this set in order to exclude them from the SingleSelectable and preserve their accessibility

const excludeFromSingleSelectable = (
  elements: ReactElement<unknown, string | JSXElementConstructor<unknown>>[],
) => [
  elements.filter(
    element =>
      typeof element.type === 'string' ||
      !PRESSABLE_COMPONENTS.has(element.type),
  ),
  elements.filter(
    element =>
      typeof element.type !== 'string' &&
      PRESSABLE_COMPONENTS.has(element.type),
  ),
]

export const MetaDataCard = ({
  children,
  iconName,
  testID,
  title,
}: PropsWithChildren<
  {
    iconName?: SvgIconName
    title: string
  } & TestProps
>) => {
  const [included, excluded] = useMemo(
    () =>
      excludeFromSingleSelectable(
        Children.toArray(children).filter(isValidElement),
      ),
    [children],
  )

  return (
    <Row
      flex={1}
      gutter="sm"
      valign="start">
      {!!iconName && (
        <Icon
          name={iconName}
          size="lg"
          testID={`ParkingSessionDetails${capitalizeString(iconName)}Icon`}
        />
      )}
      <Column
        flex={1}
        gutter="xxs">
        <SingleSelectable testID={testID}>
          <Title
            accessible={false}
            level="h5"
            text={title}
          />
          {included}
        </SingleSelectable>
        {excluded}
      </Column>
    </Row>
  )
}
