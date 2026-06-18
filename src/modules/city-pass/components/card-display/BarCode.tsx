import {StyleSheet, View} from 'react-native'
import {BarcodeCreatorView, BarcodeFormat} from 'react-native-barcode-creator'
import {useTheme} from '@/themes/useTheme'

type Props = {
  format: 'QR' | 'CODE128'
  value: string
  width?: number
}

const CODE128_HEIGHT = 80
const QR_CODE_SIZE = 100

export const BarCode = ({value, format, width}: Props) => {
  const theme = useTheme()
  const styles = createStyles(format, width)

  return (
    <View>
      <BarcodeCreatorView
        background={theme.color.barcode.background}
        foregroundColor={theme.color.barcode.foreground}
        format={format === 'QR' ? BarcodeFormat.QR : BarcodeFormat.CODE128}
        style={styles.barcode}
        value={value}
      />
    </View>
  )
}

const createStyles = (format: Props['format'], width?: number) =>
  StyleSheet.create({
    barcode: {
      height: format === 'QR' ? QR_CODE_SIZE : CODE128_HEIGHT,
      width: format === 'QR' ? QR_CODE_SIZE : width,
    },
  })
