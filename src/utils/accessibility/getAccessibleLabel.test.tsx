/* eslint-disable react-native/no-raw-text */
import {type ReactNode} from 'react'
import {getAccessibleLabel} from '@/utils/accessibility/getAccessibleLabel'

const Wrapper = ({children}: {children: ReactNode}) => <>{children}</>

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
