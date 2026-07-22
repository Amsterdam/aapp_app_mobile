import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/parking/alerts'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useManageVisitorTimeBalanceMutation} from '@/modules/parking/service'
import {useAlert} from '@/store/slices/alert'
import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'

type Props = {
  isNegative?: boolean
}

type FieldValues = {
  time?: number
}

export const ManageVisitorTimeBalance = ({isNegative}: Props) => {
  const currentPermit = useCurrentParkingPermit()
  const {handleSubmit, watch} = useFormContext<FieldValues>()
  const {goBack} = useNavigation()
  const {setAlert} = useAlert()
  const operator = isNegative ? '-' : '+'

  const time = watch('time')

  const [updateTimeBalance] = useManageVisitorTimeBalanceMutation()

  const onSubmit = handleSubmit(async ({time: timeFieldValue}: FieldValues) => {
    if (!timeFieldValue) {
      return
    }

    await updateTimeBalance({
      report_code: currentPermit.report_code.toString(),
      seconds_to_transfer: isNegative ? -timeFieldValue : timeFieldValue,
    })
      .unwrap()
      .then(() => {
        goBack()
        setAlert(alerts.adjustTimeBalanceSuccess)
      })
      .catch(() => setAlert(alerts.adjustTimeBalanceFailed))
  })

  if (!currentPermit.visitor_account) {
    return null
  }

  return (
    <Column gutter="md">
      <Column gutter="xs">
        <SingleSelectable>
          <Row align="between">
            <Phrase
              accessible={false}
              testID="ManageVisitorTimeBalanceTitle">
              Huidig tijdsaldo
            </Phrase>
            <Phrase
              accessible={false}
              testID="ManageVisitorTimeBalanceAmountTitle">
              {formatTimeDurationToDisplay(
                currentPermit.visitor_account.seconds_remaining,
                'seconds',
                {format: 'short'},
              )}
            </Phrase>
          </Row>
        </SingleSelectable>
        <SingleSelectable>
          <Row align="between">
            <Phrase
              accessible={false}
              testID="ManageVisitorTimeBalanceMutationTitle">
              Tijd toevoegen
            </Phrase>
            <Phrase
              accessible={false}
              testID="ManageVisitorTimeBalanceMutationAmountTitle">
              {time
                ? `${operator} ${formatTimeDurationToDisplay(time, 'seconds', {format: 'short'})}`
                : '-'}
            </Phrase>
          </Row>
        </SingleSelectable>
      </Column>
      <Column gutter="lg">
        <SingleSelectable>
          <Row align="between">
            <Title
              accessible={false}
              level="h4"
              testID="ManageVisitorTimeBalanceMutationTitle"
              text="Nieuw tijdsaldo"
            />
            <Title
              accessible={false}
              level="h4"
              testID="ManageVisitorTimeBalanceMutationAmountTitle"
              text={formatTimeDurationToDisplay(
                isNegative
                  ? currentPermit.visitor_account.seconds_remaining -
                      (time ?? 0)
                  : currentPermit.visitor_account.seconds_remaining +
                      (time ?? 0),
                'seconds',
                {format: 'short'},
              )}
            />
          </Row>
        </SingleSelectable>
        <Button
          label="Tijdsaldo aanpassen"
          onPress={onSubmit}
          testID="ManageVisitorTimeBalanceSubmitButton"
        />
      </Column>
    </Column>
  )
}
