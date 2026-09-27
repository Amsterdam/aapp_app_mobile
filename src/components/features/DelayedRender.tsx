import {type ReactNode, useState, useEffect} from 'react'

type DelayedRenderProps = {
  children: ReactNode
  delay: number
  fallback: ReactNode
  show: boolean
}

/**
 * Delays the rendering of its children based on the `show` prop and the specified `delay`. While the children are not rendered it will render the fallback.
 * If `show` is `true`, it waits for the `delay` duration before rendering the children.
 * If `show` is `false`, it immediately stops rendering the children and starts rendering the fallback.
 * @returns The rendered children or the fallback based on the delay and show prop.
 * @example delay the showing of a spinner to prevent it from flashing when data loads quickly:
 * <DelayedRender show={isVisible} delay={300}>
 *   <Spinner />
 * </DelayedRender>
 */
export const DelayedRender = ({
  children,
  delay,
  fallback = <></>,
  show,
}: DelayedRenderProps) => {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => setShouldRender(true), delay)

      return () => clearTimeout(timeout)
    } else {
      setShouldRender(false)
    }
  }, [show, delay])

  if (!shouldRender) {
    return fallback
  }

  return <>{children}</>
}
