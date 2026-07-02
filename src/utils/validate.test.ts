import {validateEmail} from '@/utils/validate'

describe('validateEmail', () => {
  it('should return undefined for valid email addresses', () => {
    expect(validateEmail('a@b.com')).toBeUndefined()
    expect(validateEmail('1@2.com')).toBeUndefined()
    expect(validateEmail('a.b.c@amsterdam.nl')).toBeUndefined()
  })

  it('should return the invalidString for invalid email addresses', () => {
    expect(validateEmail('')).toBeTruthy()
    expect(validateEmail('a@com.')).toBeTruthy()
    expect(validateEmail('@amsterdam.nl')).toBeTruthy()
    expect(validateEmail('<>@amsterdam.nl')).toBeTruthy()
    expect(validateEmail('@@amsterdam.nl')).toBeTruthy()
    expect(validateEmail('a@b.nl ')).toBeTruthy()
    expect(validateEmail(' a@b.nl')).toBeTruthy()
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
