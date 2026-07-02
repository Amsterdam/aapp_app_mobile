/* eslint-disable react-native/no-raw-text */
import {type ReactNode} from 'react'
import {
  accessibleText,
  getAccessibleLabel,
} from '@/utils/accessibility/getAccessibleLabel'

const Wrapper = ({children}: {children: ReactNode}) => <>{children}</>

test(`accessibleText returns empty string`, () => {
  expect(accessibleText('')).toBe('')
})

test(`accessibleText ignores null`, () => {
  expect(accessibleText(null)).toBe('')
})

test(`accessibleText ignores undefined`, () => {
  expect(accessibleText(undefined)).toBe('')
})

test(`accessibleText skips undefined fragments`, () => {
  expect(accessibleText('text', undefined)).toBe('text')
})

test(`accessibleText skips null fragments`, () => {
  expect(accessibleText('text', null)).toBe('text')
})

test(`accessibleText expands abbreviations and injects commas`, () => {
  expect(accessibleText('het is van 5 t/m 7 oktober', 'in de ochtend')).toBe(
    'het is van 5 tot en met 7 oktober, in de ochtend',
  )
})

test('accessibleText joins text fragments with commas', () => {
  expect(accessibleText('a', 'b')).toBe('a, b')
})

test('returns normalized explicit accessibility label', () => {
  expect(getAccessibleLabel({accessibilityLabel: 't/m 12345'})).toBe(
    'tot en met 1, 2, 3, 4, 5',
  )
})

test('derives accessibility label from nested children', () => {
  expect(
    getAccessibleLabel({
      children: (
        <>
          <Wrapper>Onderwerp</Wrapper>
          <Wrapper>t/m 12345</Wrapper>
        </>
      ),
    }),
  ).toBe('Onderwerp, tot en met 1, 2, 3, 4, 5')
})

test('returns undefined when there is no readable text', () => {
  expect(
    getAccessibleLabel({
      children: <Wrapper>{false}</Wrapper>,
    }),
  ).toBeUndefined()
})
