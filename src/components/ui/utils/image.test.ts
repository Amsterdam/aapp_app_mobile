import {
  getUriForWidth,
  sortSourcesByWidthAscending,
} from '@/components/ui/utils/image'

describe('sortSourcesByWidthAscending', () => {
  const item0 = {uri: 'uri0', width: 0}
  const item1 = {uri: 'uri1', width: 1}
  const item2 = {uri: 'uri2', width: 2}

  test('keep order if already ascending', () => {
    expect([item0, item1, item2].sort(sortSourcesByWidthAscending)).toEqual([
      item0,
      item1,
      item2,
    ])
  })
  test('change order if not ascending', () => {
    expect([item2, item1, item0].sort(sortSourcesByWidthAscending)).toEqual([
      item0,
      item1,
      item2,
    ])
    expect([item2, item0, item1].sort(sortSourcesByWidthAscending)).toEqual([
      item0,
      item1,
      item2,
    ])
  })
  test('handle duplicate values', () => {
    expect(
      [item2, item0, item1, item0, item0]
        .sort(sortSourcesByWidthAscending)
        .map(({width}) => width),
    ).toEqual([0, 0, 0, 1, 2])
  })
})

describe('getUriForWidth', () => {
  test('handle empty array', () => {
    expect(getUriForWidth(100, [])).toBeUndefined()
  })
  test('get first item larger than the width param, sorted input', () => {
    expect(
      getUriForWidth(100, [
        {
          height: 35,
          uri: 'https://www.amsterdam.nl/publish/pages/949802/80px/940x415_keizersgracht.jpg',
          width: 80,
        },
        {
          height: 97,
          uri: 'https://www.amsterdam.nl/publish/pages/949802/220px/940x415_keizersgracht.jpg',
          width: 220,
        },
        {
          height: 203,
          uri: 'https://www.amsterdam.nl/publish/pages/949802/460px/940x415_keizersgracht.jpg',
          width: 460,
        },
        {
          height: 309,
          uri: 'https://www.amsterdam.nl/publish/pages/949802/700px/940x415_keizersgracht.jpg',
          width: 700,
        },
        {
          height: 414,
          uri: 'https://www.amsterdam.nl/publish/pages/949802/940x415_keizersgracht.jpg',
          width: 940,
        },
      ]),
    ).toBe(
      'https://www.amsterdam.nl/publish/pages/949802/220px/940x415_keizersgracht.jpg',
    )
  })
  test('get first item larger than the width param, unsorted input', () => {
    expect(
      getUriForWidth(100, [
        {
          height: 309,
          uri: 'https://www.amsterdam.nl/publish/pages/949802/700px/940x415_keizersgracht.jpg',
          width: 700,
        },
        {
          height: 35,
          uri: 'https://www.amsterdam.nl/publish/pages/949802/80px/940x415_keizersgracht.jpg',
          width: 80,
        },
        {
          height: 414,
          uri: 'https://www.amsterdam.nl/publish/pages/949802/940x415_keizersgracht.jpg',
          width: 940,
        },
        {
          height: 97,
          uri: 'https://www.amsterdam.nl/publish/pages/949802/220px/940x415_keizersgracht.jpg',
          width: 220,
        },
        {
          height: 203,
          uri: 'https://www.amsterdam.nl/publish/pages/949802/460px/940x415_keizersgracht.jpg',
          width: 460,
        },
      ]),
    ).toBe(
      'https://www.amsterdam.nl/publish/pages/949802/220px/940x415_keizersgracht.jpg',
    )
  })
  test('width of zero returns undefined', () => {
    expect(
      getUriForWidth(0, [
        {
          height: 35,
          uri: 'https://www.amsterdam.nl/publish/pages/949802/80px/940x415_keizersgracht.jpg',
          width: 80,
        },
        {
          height: 97,
          uri: 'https://www.amsterdam.nl/publish/pages/949802/220px/940x415_keizersgracht.jpg',
          width: 220,
        },
      ]),
    ).toBeUndefined()
  })
  test('all items narrower than the width param, then get the widest', () => {
    expect(
      getUriForWidth(10000, [
        {
          height: 35,
          uri: 'https://www.amsterdam.nl/publish/pages/949802/80px/940x415_keizersgracht.jpg',
          width: 80,
        },
        {
          height: 97,
          uri: 'https://www.amsterdam.nl/publish/pages/949802/220px/940x415_keizersgracht.jpg',
          width: 220,
        },
      ]),
    ).toBe(
      'https://www.amsterdam.nl/publish/pages/949802/220px/940x415_keizersgracht.jpg',
    )
  })
})
