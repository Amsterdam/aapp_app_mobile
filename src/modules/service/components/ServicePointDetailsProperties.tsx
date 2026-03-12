import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {
  ServiceDetailPropertyType,
  type ServiceFeatureProperty,
} from '@/modules/service/types'
import {formatPropertyValue} from '@/modules/service/utils/formatPropertyValue'

export const ServicePointDetailsProperties = ({
  properties,
}: {
  properties: ServiceFeatureProperty[]
}) => (
  <Column gutter="lg">
    {properties.map(({icon, label, ...property}, index) => {
      const [propertyType, value] = Object.entries(property)[0] as [
        ServiceDetailPropertyType,
        string | number | null,
      ]

      if (
        propertyType === ServiceDetailPropertyType.image &&
        typeof value === 'string'
      ) {
        return (
          <LazyImage
            aspectRatio="wide"
            fallbackInheritsAspectRatio={false}
            key={`${propertyType}-${index}`}
            source={{uri: value}}
            testID="ServicePointDetailsPropertiesImage"
          />
        )
      }

      const content = formatPropertyValue(propertyType, value)
      const hasIcons = properties.some(p => p.icon)

      return (
        <Row
          gutter="smd"
          key={label || index}
          valign="start">
          {!!hasIcons && (
            <Icon
              path={icon || ''} // We show an empty Icon when no icon is provided, to match the padding with rows that do have an icon
              size="lg"
            />
          )}
          {label ? (
            <SingleSelectable
              accessibilityLabel={`${label}${content && ', '}${content}`}>
              <Column>
                <Title
                  level="h5"
                  text={label}
                />

                {!!content && <Paragraph>{content}</Paragraph>}
              </Column>
            </SingleSelectable>
          ) : (
            <Paragraph>{content}</Paragraph>
          )}
        </Row>
      )
    })}
  </Column>
)
