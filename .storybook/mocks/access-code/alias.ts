import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const accessCodeAlias = [
  {
    find: '@/modules/access-code/hooks/useAccessCodeError',
    replacement: path.resolve(__dirname, './index.tsx'),
  },
  {
    find: '@/modules/access-code/hooks/useAccessCode',
    replacement: path.resolve(__dirname, './index.tsx'),
  },
  {
    find: '@/modules/access-code/exports/useEnterAccessCode',
    replacement: path.resolve(__dirname, './index.tsx'),
  },
  {
    find: '@/modules/access-code/exports/useAccessCodeBiometrics',
    replacement: path.resolve(__dirname, './index.tsx'),
  },
  {
    find: '@/modules/access-code/hooks/useSetAccessCode',
    replacement: path.resolve(__dirname, './index.tsx'),
  },
  {
    find: '@/modules/access-code/hooks/useConfirmAccessCode',
    replacement: path.resolve(__dirname, './index.tsx'),
  },
]
