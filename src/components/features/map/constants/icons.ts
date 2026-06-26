import type {SvgIconVariantConfig} from '@/components/ui/media/svgIcons'
import {SvgIconVariant} from '@/components/ui/types'

export const mapSvgIcons = {
  'marker-point': {
    [SvgIconVariant.default]: {
      path: 'M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0',
    },
  },
  'marker-distinct': {
    [SvgIconVariant.default]: {
      path: 'M12 18.9474L5.05263 23L6.21053 14.8947L1 9.68421L8.52632 8.52632L12 1L15.4737 8.52632L23 9.68421L17.7895 14.8947L18.9474 23L12 18.9474Z',
    },
  },
} satisfies SvgIconVariantConfig
