/* eslint-disable @typescript-eslint/no-require-imports */
import {skipToken} from '@reduxjs/toolkit/query'
import {renderHook} from '@testing-library/react-native'
import type {Dayjs} from '@/utils/datetime/dayjs'
import {useTimeDifference} from '@/hooks/useTimeDifference'
import {useGetServerTimeQuery} from '@/services/bridge.service'
import {isLocalTimeSameAsServerTime} from '@/utils/datetime/isLocalTimeSameAsServerTime'

jest.mock('@/services/bridge.service', () => ({
  useGetServerTimeQuery: jest.fn(),
}))

jest.mock('@/utils/datetime/isLocalTimeSameAsServerTime', () => ({
  isLocalTimeSameAsServerTime: jest.fn(),
}))

const useGetServerTimeQueryMock = jest.mocked(useGetServerTimeQuery)

const mockedIsLocalTimeSameAsServerTime = jest.mocked(
  isLocalTimeSameAsServerTime,
)

type DayjsMockProps = {
  differenceInMilliseconds?: number
  isSameDay?: boolean
  utcOffsetMinutes?: number
}
const dayjsMock = ({
  differenceInMilliseconds = 0,
  isSameDay = true,
  utcOffsetMinutes = 0,
}: DayjsMockProps = {}) =>
  ({
    diff: jest.fn().mockReturnValue(differenceInMilliseconds),
    isSame: jest.fn().mockReturnValue(isSameDay),
    utcOffset: jest.fn().mockReturnValue(utcOffsetMinutes),
  }) as unknown as Dayjs

describe('useTimeDifference', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedIsLocalTimeSameAsServerTime.mockReturnValue(true)
  })

  it.each([{isError: true}, {isLoading: true}])(
    'returns defaults when the query is %p',
    props => {
      const deviceNow = dayjsMock()

      jest
        .spyOn(require('@/utils/datetime/dayjs'), 'dayjs')
        .mockReturnValue(deviceNow)

      useGetServerTimeQueryMock.mockReturnValue(props as never)

      const {result} = renderHook(() => useTimeDifference())

      expect(result.current).toEqual({
        deviceNow,
        isSameDay: true,
        isSameTime: true,
      })
      expect(useGetServerTimeQueryMock).toHaveBeenCalledWith(undefined, {
        pollingInterval: 30000,
      })
    },
  )

  it.each([undefined, null])(
    'returns defaults when server time is %p',
    serverTime => {
      const deviceNow = dayjsMock()

      jest
        .spyOn(require('@/utils/datetime/dayjs'), 'dayjs')
        .mockReturnValue(deviceNow)

      useGetServerTimeQueryMock.mockReturnValue({
        data: serverTime,
        isError: false,
        isLoading: false,
      } as never)

      const {result} = renderHook(() => useTimeDifference(false))

      expect(result.current).toEqual({
        deviceNow,
        isSameDay: true,
        isSameTime: true,
      })
      expect(mockedIsLocalTimeSameAsServerTime).not.toHaveBeenCalled()
    },
  )

  it('returns the computed difference and offsets for a valid server time', () => {
    const deviceNow = dayjsMock({
      differenceInMilliseconds: 0,
      utcOffsetMinutes: 120,
    })
    const serverNow = dayjsMock({
      isSameDay: false,
      utcOffsetMinutes: 0,
    })
    const serverTime = '2026-08-20T10:15:00+02:00'

    jest
      .spyOn(require('@/utils/datetime/dayjs'), 'dayjs')
      .mockReturnValue(deviceNow)

    jest
      .spyOn(require('@/utils/datetime/dayjs'), 'dayjsTimeZoneAware')
      .mockReturnValue(serverNow)

    useGetServerTimeQueryMock.mockReturnValue({
      data: serverTime,
      isError: false,
      isLoading: false,
    } as never)

    mockedIsLocalTimeSameAsServerTime.mockReturnValue(false)

    const {result} = renderHook(() => useTimeDifference())

    expect(result.current).toEqual({
      deviceNow,
      differenceMS: 0,
      differenceUtcOffset: 120,
      isSameDay: false,
      isSameTime: false,
      serverNow,
      serverUtcOffset: 0,
    })

    expect(mockedIsLocalTimeSameAsServerTime).toHaveBeenCalledWith(serverTime)
  })

  it('passes skipToken and a custom polling interval when skipping is enabled', () => {
    renderHook(() => useTimeDifference(true, 0))

    expect(useGetServerTimeQueryMock).toHaveBeenCalledWith(skipToken, {
      pollingInterval: 0,
    })
  })

  it('accepts an undefined skip flag and keeps the query active', () => {
    renderHook(() => useTimeDifference(undefined))

    expect(useGetServerTimeQueryMock).toHaveBeenCalledWith(undefined, {
      pollingInterval: 30000,
    })
  })
})
