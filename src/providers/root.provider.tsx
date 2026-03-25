import {ReactNode} from 'react'
import {KeyboardProvider} from 'react-native-keyboard-controller'
import {BottomSheetProvider} from '@/components/features/bottom-sheet/providers/bottomSheet.provider'
import {DeviceProvider} from '@/providers/device.provider'
import {PiwikProvider} from '@/providers/piwik.provider'
import {StoreProvider} from '@/providers/store.provider'

type Props = {
  children: ReactNode
}

export const RootProvider = ({children}: Props) => (
  <StoreProvider>
    <BottomSheetProvider>
      <DeviceProvider>
        <PiwikProvider>
          <KeyboardProvider>{children}</KeyboardProvider>
        </PiwikProvider>
      </DeviceProvider>
    </BottomSheetProvider>
  </StoreProvider>
)
