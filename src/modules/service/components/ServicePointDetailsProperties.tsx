import {Fragment} from 'react'
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
      if (type === ServiceDetailPropertyType.image) {
        return (
          <LazyImage
            aspectRatio="wide"
            fallbackInheritsAspectRatio={false}
            key={`${type}-${index}`}
            source={{uri: value as string}}
            testID="ServicePointDetailsPropertiesImage"
          />
        )
      }

      return (
        <Row
          gutter="smd"
          key={label || index}
          valign="start">
          <Icon
            path={icon || ''} // We show an empty Icon when no icon is provided, to match the horizontal alignment with rows that do have an icon
            size="lg"
          />

          {label ? (
            <SingleSelectable
              accessibilityLabel={`${[label, value].join(', ')}`}>
              <Column>
                <Title
                  level="h5"
                  text={label}
                />

                {!!value && <Paragraph>{value}</Paragraph>}
              </Column>
            </SingleSelectable>
          ) : (
            <Fragment>{!!value && <Paragraph>{value}</Paragraph>}</Fragment>
          )}
        </Row>
      )
    })}
  </Column>
)
