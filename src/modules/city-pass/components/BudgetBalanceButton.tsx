import {Pressable} from '@/components/ui/buttons/Pressable'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {CityPass, CityPassBudget} from '@/modules/city-pass/types'

type Props = {
  budget: CityPassBudget
  passNumber: CityPass['passNumber']
}

export const BudgetBalanceButton = ({budget, passNumber}: Props) => {
  const {navigate} = useNavigation()
  const {budgetBalanceFormatted, title, code} = budget

  return (
    <Pressable
      onPress={() =>
        navigate(CityPassRouteName.budget, {
          budgetCode: budget.code,
          passNumber,
        })
      }
      testID={`CityPassBudgetBalance${code}Button`}>
      <Border color="cityPass">
        <Column>
          <Box variant="cityPass">
            <Row gutter="md">
              <Icon
                color="inverse"
                isFilled
                name="euro-coins"
                size="xxl"
              />
              <Column shrink={1}>
                <Phrase
                  color="inverse"
                  emphasis="strong"
                  testID="CityPassBalanceButtonBalanceLabel">
                  {title}
                </Phrase>
                <Title
                  color="inverse"
                  testID="CityPassBalanceButtonBalanceValue"
                  text={budgetBalanceFormatted}
                />
              </Column>
            </Row>
          </Box>
          <Box
            insetHorizontal="md"
            insetVertical="sm">
            <Row align="between">
              <Phrase
                color="cityPass"
                emphasis="strong"
                testID="CityPassBalanceButtonActionLabel">
                Bekijk overzicht
              </Phrase>
              <Icon
                color="cityPass"
                name="chevron-right"
                size="ml"
                testID="CityPassBalanceButtonNavigationIcon"
              />
            </Row>
          </Box>
        </Column>
      </Border>
    </Pressable>
  )
}
