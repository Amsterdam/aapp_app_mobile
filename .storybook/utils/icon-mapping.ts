import {SvgIconsConfig} from '@/components/ui/media/svgIcons'

export default {
  options: Object.keys(SvgIconsConfig), // Create a list of icon names
  mapping: Object.fromEntries(
    Object.keys(SvgIconsConfig).map(svgIconName => [
      svgIconName,
      {name: svgIconName},
    ]),
  ), // Map icon name to the shape that 'icon' arg expects.
}
