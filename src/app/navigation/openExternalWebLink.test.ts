/* eslint-disable @typescript-eslint/unbound-method */

import {Linking} from 'react-native'
import {openExternalWebLink} from '@/app/navigation/openExternalWebLink'

describe('openExternalWebLink', () => {
  it('does nothing when url is undefined, null, or when it is not prefixed with http(s)://', async () => {
    await openExternalWebLink()
    await openExternalWebLink(null)
    await openExternalWebLink('amsterdam://test.com')

    expect(Linking.openURL).not.toHaveBeenCalled()
  })

  it('opens an external link if provided and prefixed with http(s)://', async () => {
    //Valid
    await openExternalWebLink('https://google.com')
    await openExternalWebLink('https://amsterdam.com')
    await openExternalWebLink('http://test.com')
    //Invalid
    await openExternalWebLink('12345://google.com')
    await openExternalWebLink('test://amsterdam.com')
    await openExternalWebLink()

    expect(Linking.openURL).toHaveBeenCalledTimes(3)
  })
})
