import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {CityPass} from '@/modules/city-pass/types'

type Props = {
  cityPass: CityPass
}

export const CityPassDetailsName = ({cityPass}: Props) => {
  const {firstname, infix, lastname} = cityPass.owner

  return (
    <Column halign="center">
      <SingleSelectable testID="CityPassCityPassDetailsName">
        <Title
          accessible={false}
          testID="CityPassCityPassDetailsTitle"
          text={firstname}
          textAlign="center"
        />
        <Phrase
          accessible={false}
          emphasis="strong"
          testID="CityPassCityPassDetailsSubtitle"
          textAlign="center">
          {`${infix ? infix + ' ' : ''}${lastname}`}
        </Phrase>
      </SingleSelectable>
    </Column>
  )
}
