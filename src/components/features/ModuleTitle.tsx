import type {TestProps} from '@/components/ui/types'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useModule} from '@/hooks/useModule'
import {ModuleSlug} from '@/modules/slugs'

type Props = {
  moduleSlug: ModuleSlug
  noNavigate?: boolean
} & TestProps

export const ModuleTitle = ({moduleSlug, noNavigate, testID}: Props) => {
  const title = useModule(moduleSlug)?.title
  const {navigate} = useNavigation()

  if (!title) {
    return null
  }

  return noNavigate ? (
    <Title
      level="h2"
      testID={testID}
      text={title}
    />
  ) : (
    <PressableBase
      onPress={() => navigate(moduleSlug)}
      testID={testID}>
      <Row gutter="xs">
        <Title
          level="h2"
          text={title}
        />
        <Icon
          color="secondary"
          name="chevron-right"
          size="ml"
        />
      </Row>
    </PressableBase>
  )
}
