import type {PropsWithChildren} from 'react'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'
import {ServicePointDetailsImage} from '@/modules/service/components/ServicePointDetailsImage'
import {
  ServiceDetailPropertyType,
  type ServiceFeatureProperty,
} from '@/modules/service/types'
import {isObjectWithKeys} from '@/utils/isObjectWithKeys'
import {parseTextToComponentsWithInlineLinks} from '@/utils/parseTextToComponentsWithInlineLinks'

export const ServicePointDetailsProperties = ({
  properties,
}: {
  properties: ServiceFeatureProperty[]
}) => {
  const hasAnyIcon = properties.some(property => !!property.icon)

  return (
    <Column gutter="lg">
      {properties.map(({icon, label, type, value}, index) => {
        if (type === ServiceDetailPropertyType.malfunction) {
          return (
            <Row
              gutter="sm"
              key={`${ServiceDetailPropertyType.malfunction}-${value}`}>
              <Icon
                color="warning"
                name="alert"
                size="lg"
              />
              <Paragraph color="warning">{value}</Paragraph>
            </Row>
          )
        }

        if (
          type === ServiceDetailPropertyType.image &&
          typeof value === 'string'
        ) {
          return (
            <ServicePointDetailsImage
              key={`${ServiceDetailPropertyType.image}-${index}`}
              uri={value}
            />
          )
        }

        if (
          type === ServiceDetailPropertyType.keyValueTable &&
          Array.isArray(value)
        ) {
          return (
            <Column
              gutter="sm"
              key={`${ServiceDetailPropertyType.keyValueTable}-${index}`}>
              {!!label && (
                <Title
                  level="h5"
                  text={label}
                />
              )}
              {value.map((row, rowIndex) => {
                if (
                  isObjectWithKeys(row, {
                    key: ['string', 'number'],
                    value: ['string', 'number'],
                  })
                ) {
                  return (
                    <Row
                      flex={1}
                      gutter="sm"
                      key={`${ServiceDetailPropertyType.keyValueTable}-${index}-${rowIndex}`}>
                      <Row flex={1}>
                        <Phrase>{row.key}</Phrase>
                      </Row>
                      <Row flex={1}>
                        <Phrase emphasis="strong">{row.value}</Phrase>
                      </Row>
                    </Row>
                  )
                }

                return null
              })}
            </Column>
          )
        }

        return (
          <Row
            gutter="smd"
            key={`${type}-${label || index}`}
            valign="start">
            {!!hasAnyIcon && (
              <Icon
                path={icon || ''} // We show an empty Icon when no icon is provided to match the horizontal alignment with rows that do have an icon
                size="lg"
              />
            )}

            {label ? (
              <SingleSelectable
                accessibilityLabel={`${[label, value].filter(Boolean).join(', ')}`}>
                <Title
                  level="h5"
                  text={label}
                />
                <EnrichedText>{value}</EnrichedText>
              </SingleSelectable>
            ) : (
              <EnrichedText>{value}</EnrichedText>
            )}
          </Row>
        )
      })}
    </Column>
  )
}

const EnrichedText = ({children}: PropsWithChildren) => {
  const openUrl = useOpenUrl()

  return (
    <Paragraph>
      {typeof children === 'string'
        ? parseTextToComponentsWithInlineLinks(children, openUrl, false)
        : children}
    </Paragraph>
  )
}
