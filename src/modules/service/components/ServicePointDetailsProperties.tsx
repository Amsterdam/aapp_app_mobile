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

export const ServicePointDetailsProperties = ({
  properties,
}: {
  properties: ServiceFeatureProperty[]
}) => (
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
          <LazyImage
            aspectRatio="wide"
            fallbackInheritsAspectRatio={false}
            key={`${ServiceDetailPropertyType.image}-${index}`}
            source={{uri: value}}
            testID="ServicePointDetailsPropertiesImage"
          />
        )
      }

      return (
        <Row
          gutter="smd"
          key={`property-${label || index}`}
          valign="start">
          {properties.some(property => !!property.icon) && (
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
              <Paragraph>{value}</Paragraph>
            </SingleSelectable>
          ) : (
            <Paragraph>{value}</Paragraph>
          )}
        </Row>
      )
    })}
  </Column>
)
