export enum ContactRouteName {
  cityOffice = 'CityOffice',
  contact = 'Contact',
}

export type ModuleStackParams = {
  [ContactRouteName.cityOffice]: undefined
  [ContactRouteName.contact]: undefined
}
