import {StackNavigationOptions} from '@react-navigation/stack'
import {StatusBar} from 'react-native'
import {Header} from '@/components/features/header/Header'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

export type CustomScreenOptions = {
  /**
   * Determines if the card should be placed below the status bar
   */
  isBelowStatusBar?: boolean
  isRoot?: boolean
  screenType?: keyof Theme['color']['screen']['background']
}

export const useScreenOptions = ({
  screenType = 'default',
  isBelowStatusBar = false,
}: CustomScreenOptions = {}): StackNavigationOptions => {
  const theme = useTheme()
  const backgroundColor = theme.color.screen.background[screenType]

  return {
    cardStyle: {
      backgroundColor,
      paddingTop: isBelowStatusBar ? StatusBar.currentHeight : undefined,
    },
    header: props => (
      <Header
        {...props}
        backgroundColor={backgroundColor}
      />
    ),
    headerMode: 'screen',
  }
}
