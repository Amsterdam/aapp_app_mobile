import {Image, type ImageResolvedAssetSource} from 'react-native'
import {getAspectRatioFromImageSourcePropType} from '@/utils/getAspectRatioFromImageSourcePropType'

jest.mock('@/processes/development', () => ({
  devError: jest.fn(),
}))

jest.mock('react-native', () => ({
  Image: {
    getSize: jest.fn(),
    resolveAssetSource: jest.fn(),
  },
}))

describe('getAspectRatioFromImageSourcePropType', () => {
  const mockedImage = Image as unknown as {
    getSize: jest.Mock<
      void,
      [
        string,
        (width: number, height: number) => void,
        ((error: unknown) => void)?,
      ]
    >
    resolveAssetSource: jest.Mock<
      ImageResolvedAssetSource | undefined,
      [number]
    >
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockedImage.getSize.mockImplementation((_uri, onSuccess) => {
      onSuccess(1200, 800)
    })
  })

  it('returns undefined when a numeric asset source has no uri', async () => {
    mockedImage.resolveAssetSource.mockReturnValue({
      height: 0,
      scale: 1,
      uri: '',
      width: 0,
    })

    await expect(getAspectRatioFromImageSourcePropType(0)).resolves.toBe(
      undefined,
    )

    expect(mockedImage.getSize).not.toHaveBeenCalled()
  })

  it('calculates the aspect ratio for a numeric asset source', async () => {
    mockedImage.resolveAssetSource.mockReturnValue({
      height: 800,
      scale: 1,
      uri: 'asset://image',
      width: 1200,
    })

    await expect(getAspectRatioFromImageSourcePropType(7)).resolves.toBe(1.5)

    expect(mockedImage.resolveAssetSource).toHaveBeenCalledWith(7)
    expect(mockedImage.getSize).toHaveBeenCalledWith(
      'asset://image',
      expect.any(Function),
      expect.any(Function),
    )
  })

  it('calculates the aspect ratio for an array source using the first uri item', async () => {
    const source = [{width: 50, height: 50}, {uri: 'https://example.com/a.jpg'}]

    await expect(getAspectRatioFromImageSourcePropType(source)).resolves.toBe(
      1.5,
    )

    expect(mockedImage.getSize).toHaveBeenCalledWith(
      'https://example.com/a.jpg',
      expect.any(Function),
      expect.any(Function),
    )
  })

  it('calculates the aspect ratio for an object source with a uri', async () => {
    await expect(
      getAspectRatioFromImageSourcePropType({uri: 'https://example.com/b.jpg'}),
    ).resolves.toBe(1.5)

    expect(mockedImage.getSize).toHaveBeenCalledWith(
      'https://example.com/b.jpg',
      expect.any(Function),
      expect.any(Function),
    )
  })

  it('returns undefined when an object source has no string uri', async () => {
    await expect(
      getAspectRatioFromImageSourcePropType({uri: undefined}),
    ).resolves.toBe(undefined)

    expect(mockedImage.getSize).not.toHaveBeenCalled()
  })
})
