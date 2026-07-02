export enum BurningGuideRouteName {
  burningGuide = 'BurningGuide',
  burningGuideCodeInfo = 'BurningGuideCodeInfo',
  burningGuideNuisance = 'BurningGuideNuisance',
  burningGuideRisks = 'BurningGuideRisks',
  burningGuideTips = 'BurningGuideTips',
}

export type ModuleStackParams = {
  [BurningGuideRouteName.burningGuide]: undefined
  [BurningGuideRouteName.burningGuideCodeInfo]: undefined
  [BurningGuideRouteName.burningGuideNuisance]: undefined
  [BurningGuideRouteName.burningGuideRisks]: undefined
  [BurningGuideRouteName.burningGuideTips]: undefined
}
