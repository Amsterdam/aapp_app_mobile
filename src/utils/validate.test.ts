import {validateEmail} from '@/utils/validate'

describe('validateEmail', () => {
  it('should return true for valid email addresses', () => {
    expect(validateEmail('a@b.com')).toBe(true)
    expect(validateEmail('1@2.com')).toBe(true)
    expect(validateEmail('a.b.c@amsterdam.nl')).toBe(true)
  })

  it('should return the invalidString for invalid email addresses', () => {
    expect(validateEmail('')).not.toBe(true)
    expect(typeof validateEmail('')).toBe('string')
    expect(typeof validateEmail('a@com.')).toBe('string')
    expect(typeof validateEmail('@amsterdam.nl')).toBe('string')
    expect(typeof validateEmail('<>@amsterdam.nl')).toBe('string')
    expect(typeof validateEmail('@@amsterdam.nl')).toBe('string')
    expect(typeof validateEmail('a@b.nl ')).toBe('string')
    expect(typeof validateEmail(' a@b.nl')).toBe('string')
  })

  it('should return a custom invalidString for invalid email addresses, with custom string passed as prop', () => {
    const customString = 'test'

    expect(validateEmail('', customString)).toBe(customString)
    expect(validateEmail('a@com.', customString)).toBe(customString)
    expect(validateEmail('@amsterdam.nl', customString)).toBe(customString)
    expect(validateEmail('<>@amsterdam.nl', customString)).toBe(customString)
    expect(validateEmail('@@amsterdam.nl', customString)).toBe(customString)
  })
})
