import {getParamSettingsAlwaysShow} from '@/modules/survey/utils/getParamSettingsAlwaysShow'
import {getPassesFraction} from '@/modules/survey/utils/getPassesFraction'

jest.mock('@/modules/survey/utils/getPassesFraction', () => ({
  getPassesFraction: jest.fn(),
}))

describe('getParamSettingsAlwaysShow', () => {
  const getPassesFractionMock = jest.mocked(getPassesFraction)

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('returns false and does not call getPassesFraction when cooldown is not 0', () => {
    expect(getParamSettingsAlwaysShow(undefined, 0, 1)).toBe(false)
    expect(getParamSettingsAlwaysShow(1, 0, 1)).toBe(false)
    expect(getPassesFractionMock).not.toHaveBeenCalled()
  })

  it('returns false and does not call getPassesFraction when minimum_actions is not 0', () => {
    expect(getParamSettingsAlwaysShow(0, undefined, 1)).toBe(false)
    expect(getParamSettingsAlwaysShow(0, 1, 1)).toBe(false)
    expect(getPassesFractionMock).not.toHaveBeenCalled()
  })

  it('delegates to getPassesFraction when cooldown and minimum_actions are 0', () => {
    getPassesFractionMock.mockReturnValueOnce(true)

    expect(getParamSettingsAlwaysShow(0, 0, 0.5)).toBe(true)
    expect(getPassesFractionMock).toHaveBeenCalledTimes(1)
    expect(getPassesFractionMock).toHaveBeenCalledWith(0.5)
  })

  it('returns false when getPassesFraction returns false', () => {
    getPassesFractionMock.mockReturnValueOnce(false)

    expect(getParamSettingsAlwaysShow(0, 0, 1)).toBe(false)
    expect(getPassesFractionMock).toHaveBeenCalledWith(1)
  })
})
