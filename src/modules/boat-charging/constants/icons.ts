import {type SvgIconVariantConfig} from '@/components/ui/media/svgIcons'
import {SvgIconVariant} from '@/components/ui/types'

export const boatChargingSvgIcons = {
  'lightning-strikethrough': {
    [SvgIconVariant.filled]: {
      path: 'M13.929 16.8L9.555 22.999V14.852H4.667L7.693 10.564L13.929 16.8ZM19.323 17.991L18.28 19.036L5.527 6.283L6.571 5.24L19.323 17.991ZM14.445 9.148H19.333L16.563 13.071L10.326 6.833L14.445 1V9.148Z',
    },
  },
  'exclamation-mark': {
    [SvgIconVariant.filled]: {
      path: 'M12.116 16.932C13.404 16.932 14.152 17.957 14.152 18.965C14.152 19.997 13.4 21 12.116 21C11.492 21 10.97 20.763 10.608 20.369C10.254 19.982 10.081 19.472 10.081 18.965C10.081 17.962 10.805 16.932 12.116 16.932ZM13.219 15.13H10.997L9.75 4.5H14.464L13.219 15.13Z',
    },
  },
} satisfies SvgIconVariantConfig
