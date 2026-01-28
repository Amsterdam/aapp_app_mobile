export enum Direction {
  down = 'down',
  left = 'left',
  right = 'right',
  up = 'up',
}

export enum SvgIconVariant {
  default = 'default',
  filled = 'filled',
}

export enum IconSize {
  sm = 12,
  smd = 14,
  md = 16,
  ml = 20,
  lg = 24,
  lgx = 28,
  xl = 32,
  xll = 48,
  xxl = 60,
}

export enum LayoutOrientation {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

export enum Orientation {
  landscape = 'landscape',
  portrait = 'portrait',
}

export enum Placement {
  above = 'above',
  after = 'after',
  before = 'before',
  below = 'below',
}

export type TestProps = {
  testID: `${string}${'Button' | 'Alert' | 'Icon' | 'Label' | 'Value' | 'Subtitle' | 'ProgressStep' | 'Preview' | 'OpenImagePicker' | 'Sections' | 'Entry' | 'FullScreenError' | 'Screen' | 'Field' | 'Fraction' | 'Fallback' | 'SwipeToDelete' | 'Item' | 'Marker' | 'Tabs' | 'Description' | 'Card' | 'Accordion' | 'TimelineItem' | 'Text' | 'Number' | 'Tooltip' | 'Html' | 'Body' | 'Intro' | 'Title' | 'Type' | 'Remark' | 'Checkbox' | 'ImagePreview' | 'Trait' | 'Module' | `Pagination${number}` | 'TimeboundNotification' | 'InputField' | 'BottomSheet' | 'Background' | 'Spinner' | 'WebView' | 'Message' | 'SomethingWentWrong' | 'PleaseWait' | 'RadioGroup' | 'Phrase' | 'Content' | 'Link' | 'Section' | 'Switch' | 'List' | 'Header' | 'Image' | 'Badge' | 'Paragraph'}`
}
