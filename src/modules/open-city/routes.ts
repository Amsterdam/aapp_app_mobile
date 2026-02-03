export enum OpenCityRouteName {
  detail = 'OpenCityDetail',
  form = 'OpenCityForm',
  home = 'OpenCityHome',
  list = 'OpenCityList',
}

export type OpenCityStackParams = {
  [OpenCityRouteName.form]: undefined
  [OpenCityRouteName.home]: undefined
  [OpenCityRouteName.list]: undefined
  [OpenCityRouteName.detail]: {id: string}
}
