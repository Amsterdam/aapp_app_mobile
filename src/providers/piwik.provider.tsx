import PiwikProSdk from '@piwikpro/react-native-piwik-pro-sdk'
import {ReactNode, useEffect, useState} from 'react'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'
import {initPiwik} from '@/processes/piwik/init'
import {PiwikError} from '@/processes/piwik/types'
// eslint-disable-next-line no-restricted-imports
import {type PiwikContextType, PiwikContext} from '@/providers/piwik.context'

type Props = {
  children?: ReactNode
}

export const PiwikProvider = ({children}: Props) => {
  const trackException = useTrackException()
  const [piwikInstance, setPiwikInstance] = useState<PiwikContextType>()

  useEffect(() => {
    if (piwikInstance === undefined) {
      initPiwik()
        .then(() => {
          setPiwikInstance(PiwikProSdk)
        })
        .catch((error: Error) => {
          if ((error.message as PiwikError) === PiwikError.alreadyInitialized) {
            setPiwikInstance(PiwikProSdk)

            return
          }

          setPiwikInstance(null)

          if ((error.message as PiwikError) === PiwikError.missingEnvVars) {
            return
          }

          trackException(
            ExceptionLogKey.piwikInitialization,
            'piwik.provider.tsx',
            {
              error,
            },
          )
        })
    }
  }, [piwikInstance, trackException])

  return <PiwikContext value={piwikInstance}>{children}</PiwikContext>
}
