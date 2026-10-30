import path from 'node:path'
import {fileURLToPath} from 'node:url'

const directoryName = path.dirname(fileURLToPath(import.meta.url))

export const boatChargingAlias = [
  {
    find: '@/modules/boat-charging/hooks/useIsLoggedIn',
    replacement: path.resolve(directoryName, './index.tsx'),
  },
  {
    find: '@/modules/boat-charging/hooks/useBoatChargingSessions',
    replacement: path.resolve(directoryName, './index.tsx'),
  },
  {
    find: '@/modules/boat-charging/providers/BoatChargingSession.provider',
    replacement: path.resolve(directoryName, './index.tsx'),
  },
]
