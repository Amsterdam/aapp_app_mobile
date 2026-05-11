import {useMemo} from 'react'
import {Platform, StyleSheet, View} from 'react-native'
import {BarcodeCreatorView, BarcodeFormat} from 'react-native-barcode-creator'
import {useTheme} from '@/themes/useTheme'

type Props = {
  format: 'QR' | 'CODE128'
  value: string
  width?: number
}

const CODE128_HEIGHT = 80
const CODE128_HEIGHT_SPACE_VERTICAL_IOS = 40

const QR_CODE_SIZE = 100
const QR_CODE_SIZE_SPACE_ANDROID = 44

export const BarCode = ({value, format, width}: Props) => {
  const theme = useTheme()

  const dimensions = useMemo(() => {
    const heightCode128 =
      Platform.OS === 'android'
        ? CODE128_HEIGHT
        : CODE128_HEIGHT + CODE128_HEIGHT_SPACE_VERTICAL_IOS
    const paddingVertical =
      Platform.OS === 'android' && format === 'CODE128'
        ? QR_CODE_SIZE_SPACE_ANDROID / 2
        : undefined
    const padding =
      Platform.OS === 'ios' && format === 'QR'
        ? QR_CODE_SIZE_SPACE_ANDROID / 2
        : undefined
    const sizeQR =
      Platform.OS === 'ios'
        ? QR_CODE_SIZE
        : QR_CODE_SIZE + QR_CODE_SIZE_SPACE_ANDROID

    return {
      heightCode128,
      padding,
      paddingVertical,
      sizeQR,
    }
  }, [format])

  const styles = createStyles(
    format,
    dimensions.heightCode128,
    dimensions.padding,
    dimensions.paddingVertical,
    dimensions.sizeQR,
    width,
  )

  return (
    <View style={styles.container}>
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

const createStyles = (
  format: Props['format'],
  heightCode128: number,
  padding: number | undefined,
  paddingVertical: number | undefined,
  sizeQR: number,
  width?: number,
) =>
  StyleSheet.create({
    container: {
      padding,
      paddingVertical,
    },
    barcode: {
      paddingVertical: 0,
      marginVertical: 0,
      height: format === 'QR' ? sizeQR : heightCode128,
      width: format === 'QR' ? sizeQR : width,
    },
  })
