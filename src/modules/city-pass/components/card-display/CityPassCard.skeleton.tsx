import {Skeleton} from '@/components/ui/feedback/Skeleton'
import {CityPassCard} from '@/modules/city-pass/components/card-display/CityPassCard'

const cityPassMock = {
  actief: true,
  firstname: ' ',
  infix: ' ',
  lastname: ' ',
  passNumberComplete: ' ',
  dateEndFormatted: ' ',
  type: ' ' as unknown as 'volwassene',
}

type Props = {
  isLoading: boolean
}

export const CityPassCardSkeleton = ({isLoading}: Props) => (
  <Skeleton isLoading={isLoading}>
    <CityPassCard
      cityPass={cityPassMock}
      testID="CityPassCardSkeletonMockCard"
    />
  </Skeleton>
)
