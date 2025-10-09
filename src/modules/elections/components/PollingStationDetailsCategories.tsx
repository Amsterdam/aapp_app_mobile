import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
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
  [ElectionsCategory.visionImpaired]: 'Hulpmiddelen voor slechtzienden/blinden',
  [ElectionsCategory.wheelchairHelp]: 'Hulp bij rolstoel',
}

const mapCategoryToIconName: Record<ElectionsCategory, SvgIconName> = {
  [ElectionsCategory.disabledParking]: 'disabledParking',
  [ElectionsCategory.hearingImpaired]: 'hearingImpaired',
  [ElectionsCategory.ptWheelchair]: 'wheelchairPublicTransport',
  [ElectionsCategory.pysicalLimitation]: 'wheelchair',
  [ElectionsCategory.visionImpaired]: 'visionImpaired',
  [ElectionsCategory.wheelchairHelp]: 'wheelchairPlus',
}

export const PollingStationDetailsCategories = ({categories}: Props) => (
  <Column gutter="md">
    <Title
      level="h5"
      text="Toegankelijkheid"
    />
    {categories?.map(category => (
      <Row
        gutter="md"
        key={category}>
        <Icon
          name={mapCategoryToIconName[category]}
          size="xl"
        />
        <Paragraph>{mapCategoryToLabel[category]}</Paragraph>
      </Row>
    ))}
  </Column>
)
