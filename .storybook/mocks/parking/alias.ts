import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const parkingAlias = [
  {
    find: '@/modules/parking/hooks/useCurrentParkingPermit',
    replacement: path.resolve(__dirname, './index.tsx'),
  },
  {
    find: '@/modules/parking/hooks/useGetLicensePlates',
    replacement: path.resolve(__dirname, './index.tsx'),
  },
  {
    find: '@/modules/parking/hooks/useLicensePlateMutations',
    replacement: path.resolve(__dirname, './index.tsx'),
  },
]
