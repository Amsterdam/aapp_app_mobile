import {StyleSheet} from 'react-native'
import type {Theme} from '@/themes/themes'
import {Row} from '@/components/ui/layout/Row'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {useModules} from '@/hooks/useModules'
import {actionButtons} from '@/modules/generated/actionButtons.generated'
import {useThemable} from '@/themes/useThemable'
import {mergeComponentsWithEnabledModules} from '@/utils/mergeComponentsWithEnabledModules'

/**
 * The ActionButtons on the home screen that leads to an action within the module.
 */
export const ActionButtons = () => {
  const {enabledModules} = useModules()
  const styles = useThemable(createStyles)

  const ActionButtonsComponents = mergeComponentsWithEnabledModules(
    actionButtons,
    enabledModules,
  )

  return (
    <ScrollView
      alwaysBounceHorizontal={false}
      contentContainerStyle={styles.content}
      horizontal
      style={styles.container}>
      <Row
        align="evenly"
        flex={1}
        gutter="md"
        valign="start">
        {ActionButtonsComponents}
      </Row>
    </ScrollView>
  )
}

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    container: {
      marginTop: -size.spacing.sm,
      flex: 1,
    },
    content: {
      paddingTop: size.spacing.sm,
      minWidth: '100%',
    },
  })
