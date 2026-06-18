export enum WasteContainerRouteName {
  addWasteCard = 'AddWasteCard',
  wasteCard = 'WasteCard',
  wasteCardHelp = 'WasteCardHelp',
}

export type ModuleStackParams = {
  [WasteContainerRouteName.addWasteCard]: undefined
  [WasteContainerRouteName.wasteCard]: undefined
  [WasteContainerRouteName.wasteCardHelp]: undefined
}

export enum WasteContainerModalName {
  addWasteCardSuccess = 'AddWasteCardSuccess',
}

export type WasteContainerModalParams = {
  [WasteContainerModalName.addWasteCardSuccess]: undefined
}
