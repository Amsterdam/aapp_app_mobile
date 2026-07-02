const validationPatterns = {
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
} as const

type ValidationPatternKey = keyof typeof validationPatterns

/**
 * A util that validates a value against a regex pattern.
 * To be used in form input validation.
 * @param value value to validate
 * @param pattern pattern to use for validation
 * @param invalidText Optional text to show when validation fails
 * @returns
 */
const validate = (
  value: string,
  pattern: ValidationPatternKey,
  invalidText: string,
) => (validationPatterns[pattern].test(value) ? undefined : invalidText)

/**
 * Factory function to create validators
 */
const createValidator =
  (
    pattern: ValidationPatternKey,
    defaultInvalidText = 'Vul een geldige waarde in.',
  ) =>
  (value: string, invalidText = defaultInvalidText) =>
    validate(value, pattern, invalidText)

export const validateEmail = createValidator(
  'email',
  'Vul een geldig e-mailadres in.',
)
