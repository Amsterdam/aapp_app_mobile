import {stringify} from 'picoquery'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

export const isAmsterdamNlUrl = (url: string) =>
  /^https?:\/\/([\w-.]+.)?amsterdam\.nl/.test(url)

/**
 * Adds app parameters to an Amsterdam.nl URL. Used to track outlinks in Piwik.
 */
export const addAppParamsToUrl = (url: string, slug?: ModuleSlug) => {
  if (!isAmsterdamNlUrl(url)) {
    return url
  }

  const appParams = stringify({
    app_from: 1,
    app_module: slug,
  })

  const [baseUrl, hash] = url.split('#')
  const hashString = hash ? `#${hash}` : ''
  const queryString = `${baseUrl.includes('?') ? '&' : '?'}${appParams}`

  return `${baseUrl}${queryString}${hashString}`
}
