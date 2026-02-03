export enum OpenCityRouteName {
  form = 'OpenCityForm',
  home = 'OpenCityHome',
  list = 'OpenCityList',
}

export type OpenCityStackParams = {
  [OpenCityRouteName.form]: undefined
  [OpenCityRouteName.home]: undefined
  [OpenCityRouteName.list]: undefined
}
