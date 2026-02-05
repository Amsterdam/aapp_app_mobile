import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BurningGuideRouteName} from '@/modules/burning-guide/routes'

export const BurningGuideRisksButton = () => {
  const {navigate} = useNavigation()

  return (
    <TopTaskButton
      icon={{name: 'medicalKit'}}
      isInternalLink
      onPress={() => navigate(BurningGuideRouteName.burningGuideRisks)}
      testID="BurningGuideRisksButton"
      text="Lees wat rook doet met u en uw buren."
      title="Rook van hout is ongezond"
    />
  )
}
