import {useCallback, useState} from 'react'
import type {ModuleSlug} from '@/modules/slugs'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {AlertInline} from '@/components/ui/feedback/alert/AlertInline'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/address/alerts'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {usePostNotificationAddressMutation} from '@/modules/address/service'
import {addAddress, setShowSaveAsMyAddress} from '@/modules/address/slice'

type Props = {
  moduleSlug: ModuleSlug
  shouldShowSaveAsMyAddress?: boolean
}

export const AddressSwitchSaveMyAddress = ({
  moduleSlug,
  shouldShowSaveAsMyAddress,
}: Props) => {
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)
  const dispatch = useDispatch()
  const {address: moduleAddress} = useSelectedAddress(moduleSlug)
  const setLocationType = useSetLocationType(moduleSlug)
  const [postNotificationAddress] = usePostNotificationAddressMutation()

  const onSaveMyAddress = useCallback(() => {
    if (!moduleAddress) {
      return
    }

    setIsSuccessAlertVisible(false)
    dispatch(addAddress(moduleAddress))

    void postNotificationAddress(moduleAddress)

    setLocationType('address')
    setIsSuccessAlertVisible(true)
  }, [moduleAddress, dispatch, postNotificationAddress, setLocationType])

  return (
    <>
      {!!shouldShowSaveAsMyAddress && (
        <Column gutter="md">
          <Title
            level="h3"
            text="Wilt u dit adres opslaan als Mijn adres?"
          />
          <Paragraph>
            Met Mijn adres ziet u in de hele app alle informatie die bij dit
            adres hoort. U kunt ook meldingen uit deze buurt krijgen. Dit stelt
            u in bij Mijn profiel.
          </Paragraph>
          <Box
            insetBottom="xl"
            insetTop="smd">
            <Row gutter="smd">
              <Button
                flex={1}
                label="Opslaan"
                onPress={onSaveMyAddress}
                testID="AddressSwitchSaveMyAddressButton"
              />
              <Button
                flex={1}
                label="Nee, later"
                onPress={() =>
                  dispatch(
                    setShowSaveAsMyAddress({
                      moduleSlug,
                      show: true,
                    }),
                  )
                }
                testID="AddressSwitchDeclineMyAddressButton"
                variant="secondary"
              />
            </Row>
          </Box>
        </Column>
      )}
      {!!isSuccessAlertVisible && (
        <AlertInline
          inset="no"
          {...alerts.saveMyAddressSuccess}
        />
      )}
    </>
  )
}
