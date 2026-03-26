import {SafeAreaView, StyleSheet, Text, View} from 'react-native'
import RNRestart from 'react-native-restart-newarch'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {lightColorTokens} from '@/themes/tokens/color-light'
import {sizeTokens} from '@/themes/tokens/size'
import {textTokens} from '@/themes/tokens/text'

/**
 * Error component with restart app button
 * Can be used outside a redux context
 * @warn Theming should be hardcoded in this file and not use the Themable not direct and not indirect through other components
 */
export const ErrorWithRestart = () => (
  <SafeAreaView style={styles.screen}>
    <View style={styles.screen}>
      <Text style={[styles.paragraph, styles.title]}>Sorry …</Text>
      <Text style={[styles.paragraph, styles.text]}>
        Er is iets misgegaan met de app.
      </Text>
      <PressableBase
        accessibilityRole="button"
        onPress={() => RNRestart.Restart()}
        style={styles.button}
        testID="ErrorRestartButton">
        <Text style={[styles.text, styles.buttonText]}>Herstart de app</Text>
      </PressableBase>
    </View>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  screen: {
    backgroundColor: lightColorTokens.screen.background.default,
    flex: 1,
    padding: sizeTokens.spacing.xl,
  },
  title: {
    fontSize: textTokens.fontSize.h4,
    lineHeight: textTokens.lineHeight.h4,
    fontFamily: textTokens.fontFamily.bold,
  },
  text: {
    fontSize: textTokens.fontSize.body,
    lineHeight: textTokens.lineHeight.body,
  },
  paragraph: {
    marginBottom: sizeTokens.spacing.md,
  },
  button: {
    backgroundColor: lightColorTokens.pressable.primary.default.background,
    paddingHorizontal: sizeTokens.spacing.md,
    paddingVertical: sizeTokens.spacing.sm,
  },
  buttonText: {
    color: lightColorTokens.text.inverse,
    textAlign: 'center',
  },
})
