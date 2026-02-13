import {PathConfig, PathConfigMap} from '@react-navigation/native'
import {RootStackParams} from '@/app/navigation/types'
import {allModules} from '@/modules/modules'

export const moduleLinkings = (() => {
  const linkings: PathConfigMap<RootStackParams> = {}

  allModules.forEach(({linking, slug}) => {
    if (!linking) {
      return
    }

    linkings[slug] = {screens: linking} as PathConfig<RootStackParams>
  })

  return linkings
})()
