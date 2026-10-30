import type {Validate, FieldValues} from 'react-hook-form'

export const PASSWORD_RULES: Record<string, Validate<string, FieldValues>> = {
  numbers: value => /\d/.test(value) || 'Wachtwoord moet een cijfer bevatten',
  symbol: value =>
    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
    'Wachtwoord moet een speciaal teken bevatten',
  lowerCase: value =>
    /[a-z]/.test(value) || 'Wachtwoord moet een kleine letter bevatten',
  upperCase: value =>
    /[A-Z]/.test(value) || 'Wachtwoord moet een hoofdletter bevatten',
}
