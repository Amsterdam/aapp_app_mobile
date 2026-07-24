import {StyleSheet, View} from 'react-native'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Box} from '@/components/ui/containers/Box'
import {LoadingBar} from '@/components/ui/feedback/LoadingBar'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {BoatChargingHelpNavigationButton} from '@/modules/boat-charging/components/navigation/BoatChargingHelpNavigationButton'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {NRGStatus, SessionLengthStatus} from '@/modules/boat-charging/types'
import {formatKWH} from '@/modules/boat-charging/utils/formatKWH'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

const MIN_CONTAINER_HEIGHT = 258

export const BoatChargingSessionInfoContainer = () => {
  const {
    session,
    isPluggedIn,
    lastUpdated,
    chargingTimeString,
    sessionLengthStatus,
    settings,
  } = useBoatChargingSession()
  const styles = createStyles()
  const {toggle} = useBottomSheet()

  return (
    <View style={styles.container}>
      <Box
        borderColor="default"
        borderStyle="solid"
        borderWidth="md"
        grow
        variant="distinct">
        <Column
          align="around"
          grow={1}
          gutter="md"
          halign="center">
          {session?.nrg_status === NRGStatus.Charging ? (
            <>
              <Row gutter="xs">
                <Icon
                  color="secondary"
                  isFilled
                  name="lightning"
                />
                <Phrase
                  color="secondary"
                  variant="small">
                  Geladen
                </Phrase>
              </Row>
              <Title
                level="h1"
                text={formatKWH(session?.kwh ?? 0)}
              />
              <Row
                flex={1}
                valign="start">
                <Column
                  basis={1}
                  flex={1}
                  halign="center">
                  <PressableBase
                    hitSlop={16}
                    onPress={() => toggle()}
                    testID="BoatChargingSessionEstimatedCostButton">
                    <Row gutter="xs">
                      <Phrase
                        color="secondary"
                        variant="small">
                        Geschatte kosten
                      </Phrase>
                      <Icon
                        color="secondary"
                        name="chevron-down"
                        size="sm"
                      />
                    </Row>
                  </PressableBase>
                  <Title
                    level="h3"
                    text={
                      settings?.vat_fraction
                        ? formatNumber(
                            (session?.total_cost ?? 0) * settings.vat_fraction,
                            session?.currency ?? 'EUR',
                          )
                        : `${formatNumber(
                            session?.total_cost ?? 0,
                            session?.currency ?? 'EUR',
                          )} ex btw`
                    }
                  />
                </Column>
                <Column
                  basis={1}
                  flex={1}
                  halign="center">
                  <Phrase
                    color="secondary"
                    variant="small">
                    Laadtijd
                  </Phrase>
                  <Row
                    gutter="sm"
                    valign="center">
                    {sessionLengthStatus === SessionLengthStatus.expiry && (
                      <Icon
                        color="warning"
                        isFilled
                        name="warning"
                        size="lg"
                      />
                    )}
                    <Title
                      color={
                        sessionLengthStatus === SessionLengthStatus.expiry
                          ? 'warning'
                          : 'default'
                      }
                      level="h3"
                      text={chargingTimeString ?? ''}
                      textAlign="center"
                    />
                  </Row>
                </Column>
              </Row>
              <Row flex={1}>
                <Column
                  flex={1}
                  gutter="sm">
                  <LoadingBar />
                  <Phrase
                    color="secondary"
                    variant="small">
                    {session?.kwh > 0 && lastUpdated
                      ? `Laatste update om ${formatTimeToDisplay(lastUpdated, {includeHoursLabel: true})}`
                      : 'Laden start automatisch ...'}
                  </Phrase>
                </Column>
              </Row>
            </>
          ) : (
            <Column
              gutter="md"
              halign="center">
              <Icon
                name="power-plug"
                size="xll"
              />
              <Title
                level="h4"
                text={
                  isPluggedIn
                    ? 'De stekker is aangesloten. De sessie kan worden gestart.'
                    : 'Steek de stekker in het stopcontact'
                }
                textAlign="center"
              />
              <BoatChargingHelpNavigationButton />
            </Column>
          )}
        </Column>
      </Box>
    </View>
  )
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      minHeight: MIN_CONTAINER_HEIGHT,
    },
  })
