import {stripHtmlTags} from '@/utils/accessibility/stripHtmlTags'

describe('stripHtmlTags', () => {
  test('returns an empty string when given an empty string', () => {
    expect(stripHtmlTags('')).toBe('')
  })

  test('returns the original text when no HTML tags are present', () => {
    expect(stripHtmlTags('Plain text only')).toBe('Plain text only')
  })

  test('removes a single HTML tag', () => {
    expect(stripHtmlTags('<p>Hello</p>')).toBe('Hello')
  })

  test('removes multiple HTML tags and keeps the text content', () => {
    expect(
      stripHtmlTags('<div><strong>Hello</strong> <em>world</em></div>'),
    ).toBe('Hello world')
  })

  test('removes tags that include attributes', () => {
    expect(stripHtmlTags('<a href="https://example.com">Example</a>')).toBe(
      'Example',
    )
  })

  test('leaves incomplete tags unchanged when no closing bracket is present', () => {
    expect(stripHtmlTags('Text with <unfinished tag')).toBe(
      'Text with <unfinished tag',
    )
  })

  test('throws when text is undefined', () => {
    expect(() => stripHtmlTags(undefined as unknown as string)).toThrow(
      TypeError,
    )
  })

  test('throws when text is null', () => {
    expect(() => stripHtmlTags(null as unknown as string)).toThrow(TypeError)
  })
})
