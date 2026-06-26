import type {SvgIconVariantConfig} from '@/components/ui/media/svgIcons'
import {SvgIconVariant} from '@/components/ui/types'

export const mapSvgIcons = {
  'marker-point': {
    [SvgIconVariant.default]: {
      path: 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0',
    },
  },
  'marker-distinct': {
    [SvgIconVariant.default]: {
      path: 'M12 18.3158L5.68421 22L6.73684 14.6316L2 9.89474L8.84211 8.84211L12 2L15.1579 8.84211L22 9.89474L17.2632 14.6316L18.3158 22L12 18.3158Z',
    },
  },
} satisfies SvgIconVariantConfig
