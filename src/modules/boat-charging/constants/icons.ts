import {type SvgIconVariantConfig} from '@/components/ui/media/svgIcons'
import {SvgIconVariant} from '@/components/ui/types'

export const boatChargingSvgIcons = {
  'boat-charging-free': {
    [SvgIconVariant.default]: {
      path: 'M13.6299 10.0986H16.8887L10.3701 19.333V13.9014H7.11133L13.6299 4.66699V10.0986Z',
    },
  },
  'boat-charging-occupied': {
    [SvgIconVariant.default]: {
      path: 'M13.2861 15.2002L10.3701 19.333V13.9014H7.11133L9.12891 11.043L13.2861 15.2002ZM16.8818 15.9941L16.1865 16.6904L7.68457 8.18848L8.38086 7.49316L16.8818 15.9941ZM13.6299 10.0986H16.8887L15.042 12.7139L10.8838 8.55566L13.6299 4.66699V10.0986Z',
    },
  },
  'boat-charging-malfunction': {
    [SvgIconVariant.default]: {
      path: 'M12.0771 15.2881C12.936 15.2881 13.4344 15.9713 13.4346 16.6436C13.4346 17.3316 12.9332 18 12.0771 18C11.6611 17.9999 11.3133 17.8421 11.0723 17.5791C10.8359 17.321 10.7207 16.9816 10.7207 16.6436C10.7209 15.9749 11.2031 15.2883 12.0771 15.2881ZM12.8125 14.0869H11.3311L10.5 7H13.6426L12.8125 14.0869Z',
    },
  },
} satisfies SvgIconVariantConfig
