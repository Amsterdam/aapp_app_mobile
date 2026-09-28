import {ExceptionLogKey} from '@/processes/logging/types'
import {getAllowedData} from '@/processes/logging/utils/getAllowedData'

describe('Log allowlist', () => {
  it('With valid logkey', () =>
    expect(
      getAllowedData(ExceptionLogKey.pickingImageFailed, {
        error: 'Not found',
        code: '404',
        viaCamera: true,
      }),
    ).toStrictEqual({error: 'Not found', code: '404', viaCamera: true}))

  it('Filtering data', () =>
    expect(
      getAllowedData(ExceptionLogKey.coordinates, {
        code: '404',
        message: 'Not found',
        error: 'Not found',
      }),
    ).toStrictEqual({error: 'Not found'}))

  it('No data object', () =>
    expect(getAllowedData(ExceptionLogKey.coordinates)).toBeUndefined())

  it('Empty data object', () =>
    expect(getAllowedData(ExceptionLogKey.coordinates, {})).toBeUndefined())

  it('Empty allowlist', () =>
    expect(getAllowedData(ExceptionLogKey.openMailUrl, {})).toBeUndefined())
})
