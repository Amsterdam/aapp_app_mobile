import type {
  AlertsRecord,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'

export const renderAlerts = (alerts: AlertsRecord, variant?: AlertVariant) => {
  const alertsToRender = Object.entries(alerts).filter(
    ([_key, alert]) => !variant || alert.variant === variant,
  )

  if (alertsToRender.length === 0) {
    return (
      <Phrase color="secondary">
        {variant
          ? `No alerts of variant ${variant} available`
          : 'No alerts available'}
      </Phrase>
    )
  }

  return (
    <Column gutter="lg">
      {alertsToRender.map(([key, alert]) => (
        <Column
          gutter="sm"
          key={key}>
          <Phrase>{key}</Phrase>
          <AlertBase
            hasCloseIcon
            hasIcon
            {...alert}
          />
        </Column>
      ))}
    </Column>
  )
}
