export enum BurningGuideEndpointName {
  burningGuide = 'burningGuide',
  deleteBurningGuideNotification = 'deleteBurningGuideNotification',
  getBurningGuideNotification = 'getBurningGuideNotification',
  patchBurningGuideNotification = 'patchBurningGuideNotification',
  postBurningGuideNotification = 'postBurningGuideNotification',
}

export enum BurningGuideCodeVariant {
  orange = 'Oranje',
  red = 'Rood',
  yellow = 'Geel',
}

export type Advice = 0 | 1 | 2

export type ListItem = {
  id: string
  isFixed: boolean
  timeWindow: string
  variant: BurningGuideCodeVariant
}

export type BurningGuideApiResponse = {
  advice_0: Advice
  advice_12: Advice
  advice_18: Advice
  advice_6: Advice
  definitive_0: boolean
  definitive_12: boolean
  definitive_18: boolean
  definitive_6: boolean
  model_runtime: string
  postal_code: string
}

export type BurningGuideNotificationSettings =
  | {
      message: string
      status: 'error'
    }
  | {
      message: never
      status: 'success'
    }
