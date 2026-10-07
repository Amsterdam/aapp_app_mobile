import type {PropsWithChildren} from 'react'
import {StyleSheet, View} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {BurningGuideForecastListItem} from '@/modules/burning-guide/components/BurningGuideForecastListItem'
import type {ListItem} from '@/modules/burning-guide/types'
import type {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {list: ListItem[]}

export const BurningGuideForecastList = ({list}: Props) => (
  <Column>
    <Title
      level="h2"
      text="Verwachting"
    />

    <Column>
      <BurningGuideForecastList.Row />

      {list.map(item => (
        <BurningGuideForecastList.Row key={item.id}>
          <BurningGuideForecastListItem
            isFixed={item.isFixed}
            timeWindow={item.timeWindow}
            variant={item.variant}
          />
        </BurningGuideForecastList.Row>
      ))}
    </Column>
    <Box insetTop="md">
      <Paragraph
        accessible={false}
        color="secondary"
        variant="small">
        * Deze verwachting kan nog veranderen.
      </Paragraph>
    </Box>
  </Column>
)

const BurningGuideForecastListItemWrapper = ({children}: PropsWithChildren) => {
  const styles = useThemable(createStyles)

  return <View style={styles.row}>{children}</View>
}

BurningGuideForecastList.Row = BurningGuideForecastListItemWrapper

const createStyles = ({color, border, size}: Theme) =>
  StyleSheet.create({
    row: {
      borderBottomWidth: border.width.sm,
      borderBottomColor: color.box.border.default,
      paddingVertical: size.spacing.sm,
    },
  })
