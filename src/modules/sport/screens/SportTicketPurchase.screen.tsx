import {FormProvider, useForm} from 'react-hook-form'
import DatePicker from 'react-native-date-picker'
import type {NavigationProps} from '@/app/navigation/types'
import type {SportRouteName} from '@/modules/sport/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {RadioGroupControlled} from '@/components/ui/forms/RadioGroupControlled'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useSportLocationsQuery} from '@/modules/sport/service'
import {devLog} from '@/processes/development'
import {dayjs} from '@/utils/datetime/dayjs'

type TicketPurchaseFormValues = {
  date: string
  slot: 'morning' | 'evening'
  ticket: string
  time: string
}

type Props = NavigationProps<SportRouteName.ticketPurchase>

export const SportTicketPurchaseScreen = ({route}: Props) => {
  const {data} = useSportLocationsQuery()
  const details = data?.find(
    location => location['detail-name'] === route.params.detailName,
  )

  const form = useForm<TicketPurchaseFormValues>()

  return (
    <Screen testID="SportTicketPurchaseScreen">
      <FormProvider {...form}>
        <Box>
          <Column gutter="lg">
            <Title
              level="h3"
              text={`${route.params.activity} ${details?.naam}`}
            />
            <Column>
              <Phrase emphasis="strong">Datum & tijd</Phrase>
              <DatePicker
                date={new Date()}
                onDateChange={date => {
                  form.setValue(
                    'date',
                    dayjs(date.toDateString()).format('YYYY-MM-DD'),
                  )

                  form.setValue('time', dayjs(date).format('HH:mm:ss'))

                  form.setValue(
                    'slot',
                    date.getHours() > 14 ? 'evening' : 'morning',
                  )
                }}
              />
            </Column>

            <Column gutter="md">
              <Phrase emphasis="strong">Kaart</Phrase>
              <RadioGroupControlled<TicketPurchaseFormValues>
                name="ticket"
                options={[
                  {label: 'Banenzwemmen binnen $6,40', value: '0'},
                  {label: 'Banenzwemmen binnen Stadspas $1,00', value: '1'},
                  {label: 'Reservering meerbadenkaart $0,00', value: '2'},
                ]}
                rules={{required: {value: true, message: 'Kies een kaart'}}}
                testID="TicketPurchaseFormValuesRadioButton"
              />
            </Column>

            <Gutter />

            <Column gutter="md">
              <Title text="Overzicht" />
              <Phrase emphasis="strong">Kortingscode</Phrase>
              <Row
                align="between"
                flex={1}>
                <Phrase emphasis="strong">Totaal</Phrase>
                <Phrase emphasis="strong">
                  $ {[6.4, 1, 0][Number(form.watch('ticket'))]?.toFixed(2)}
                </Phrase>
              </Row>
            </Column>
            <Button
              label="Volgende"
              onPress={form.handleSubmit(values => devLog(values))}
              testID="SportTicketPurchaseScreenSubmitButton"
            />
          </Column>
        </Box>
      </FormProvider>
    </Screen>
  )
}
