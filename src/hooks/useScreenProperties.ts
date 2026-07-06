import {use, useLayoutEffect} from 'react'
import type {ScreenProps} from '@/components/features/screen/Screen'
import {ScreenContext} from '@/providers/screen.context'

export type UseScreenPropertiesProps = Omit<ScreenProps, 'children' | 'testID'>

/**
 * Updates the nearest parent `Screen` props from inside a nested component.
 *
 * This works similarly to `navigation.setOptions`: when the provided `props`
 * object changes, the hook applies those values to the surrounding `Screen`.
 *
 * Make sure the `props` object is stable, for example by wrapping it in
 * `useMemo`, otherwise the effect will run on every render.
 *
 * @param props Screen properties to merge into the parent `Screen`.
 * Use {@link UseScreenPropertiesProps} to type memoized config objects.
 *
 * @example
 * // Override the sticky footer from a nested component
 * const screenProperties = useMemo<UseScreenPropertiesProps>(
 *   () => ({
 *     stickyFooter: (
 *       <Box>
 *         <Button label="Save" />
 *       </Box>
 *     ),
 *   }),
 *   [],
 * )
 *
 * useScreenProperties(screenProperties)
 *
 * @example
 * // Override the sticky header from a nested component
 * const screenProperties = useMemo<UseScreenPropertiesProps>(
 *   () => ({
 *     stickyHeader: <MyStickyHeader />,
 *   }),
 *   [],
 * )
 *
 * useScreenProperties(screenProperties)
 *
 * @example
 * // Override the bottom sheet from a nested component
 * const screenProperties = useMemo<UseScreenPropertiesProps>(
 *   () => ({
 *     bottomSheet: <MyBottomSheet />,
 *   }),
 *   [],
 * )
 *
 * useScreenProperties(screenProperties)
 */
export const useScreenProperties = (props: UseScreenPropertiesProps) => {
  const {overrideProps} = use(ScreenContext)

  useLayoutEffect(() => {
    overrideProps(previousProps => ({
      ...previousProps,
      ...props,
    }))
  }, [overrideProps, props])
}
