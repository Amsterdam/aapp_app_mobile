import type {ElectionsIconNames} from '@/modules/elections/constants/icons'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {ElectionsCategory} from '@/modules/elections/types'

type Props = {
  categories: ElectionsCategory[]
}

const mapCategoryToLabel: Record<ElectionsCategory, string> = {
  [ElectionsCategory.disabledParking]: 'Parkeerplaats voor gehandicapten',
  [ElectionsCategory.hearingImpaired]: 'Hulp voor slechthorenden/doven',
  [ElectionsCategory.ptWheelchair]:
    'Rolstoeltoegankelijke OV-halte binnen 100m',
  [ElectionsCategory.pysicalLimitation]: 'Toegankelijk met rolstoel',
  [ElectionsCategory.readingAid]: 'Hulp met lezen',
  [ElectionsCategory.visionImpaired]: 'Hulpmiddelen voor slechtzienden/blinden',
  [ElectionsCategory.wheelchairHelp]: 'Hulp bij rolstoel',
}

const mapCategoryToIconName: Record<ElectionsCategory, ElectionsIconNames> = {
  [ElectionsCategory.disabledParking]: 'disabled-parking',
  [ElectionsCategory.hearingImpaired]: 'hearing-impaired',
  [ElectionsCategory.ptWheelchair]: 'wheelchair-public-transport',
  [ElectionsCategory.pysicalLimitation]: 'wheelchair',
  [ElectionsCategory.readingAid]: 'reading-aid',
  [ElectionsCategory.visionImpaired]: 'vision-impaired',
  [ElectionsCategory.wheelchairHelp]: 'wheelchair-plus',
}

export const PollingStationDetailsCategories = ({categories}: Props) => (
  <Column gutter="md">
    <Title
      level="h5"
      text="Toegankelijkheid"
    />
    {categories?.map(
      category =>
        !!mapCategoryToIconName[category] &&
        !!mapCategoryToLabel[category] && (
          <Row
            gutter="md"
            key={category}>
            <Icon
              name={mapCategoryToIconName[category]}
              size="xl"
            />
            <Paragraph>{mapCategoryToLabel[category]}</Paragraph>
          </Row>
        ),
    )}
  </Column>
)
