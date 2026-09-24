import {useEffect, useRef} from 'react'
import type {AllowListKeys} from '@/processes/logging/allowList'
import {
  type ExceptionLogKey,
  type SeverityLevel,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'

type ExceptionData<T extends ExceptionLogKey> =
  AllowListKeys<T> extends never
    ? never
    : Partial<Record<AllowListKeys<T>, unknown>>

/**
 * Props for useTrackRenderException.
 *
 * Use this hook when a component derives an error condition during render,
 * but telemetry must be emitted as a side effect and deduplicated between rerenders.
 */
type Params<T extends ExceptionLogKey> = {
  /**
   * Optional telemetry payload that is validated against the allow list for the given log key.
   */
  data?: ExceptionData<T>
  /**
   * File name reported to telemetry.
   */
  filename: string
  /**
   * Exception category key used by App Insights.
   */
  logKey: T
  /**
   * Optional severity level override. Defaults to Error in useTrackException.
   */
  severityLevel?: SeverityLevel
  /**
   * Enables tracking when true. Keep this tied to the render-time invalid condition.
   */
  shouldTrack: boolean
}

const safeStringify = (value: unknown) => {
  try {
    return JSON.stringify(value)
  } catch {
    return '[unserializable]'
  }
}

const getSignature = (value: unknown) => {
  if (value === null) {
    return 'null'
  }

  if (value === undefined) {
    return 'undefined'
  }

  if (typeof value === 'object') {
    return `object:${safeStringify(value)}`
  }

  if (typeof value === 'symbol') {
    return `symbol:${value.description ?? 'unknown'}`
  }

  return `${typeof value}:${safeStringify(value)}`
}

/**
 * Tracks an exception at most once per unique payload signature while shouldTrack is true.
 *
 * The signature state resets when shouldTrack becomes false, so a later invalid state
 * with the same payload can be tracked again.
 */
export const useTrackRenderException = <T extends ExceptionLogKey>({
  data,
  shouldTrack,
  filename,
  logKey,
  severityLevel,
}: Params<T>) => {
  const trackException = useTrackException()
  const exceptionDataSignatureReference = useRef<string | null>(null)

  useEffect(() => {
    if (!shouldTrack) {
      if (exceptionDataSignatureReference.current) {
        exceptionDataSignatureReference.current = null
      }

      return
    }

    const signature = getSignature(data)

    if (exceptionDataSignatureReference.current === signature) {
      return
    }

    exceptionDataSignatureReference.current = signature
    trackException(logKey, filename, data, severityLevel)
  }, [shouldTrack, data, trackException, logKey, filename, severityLevel])
}
