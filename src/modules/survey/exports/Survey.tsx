import {type ReactNode} from 'react'
import {RenderIfModuleActive} from '@/components/features/RenderIfModuleActive'
import {ModuleSlug} from '@/modules/slugs'
import {DynamicForm} from '@/modules/survey/components/DynamicForm'
import {useBottomSheetSurveyEntryPoint} from '@/modules/survey/slice'

type Props = {
  FallbackComponent?: ReactNode
  entryPoint?: string
  showError?: boolean
}

export const Survey = ({entryPoint, FallbackComponent, showError}: Props) => {
  const {entryPoint: bottomSheetEntryPoint} = useBottomSheetSurveyEntryPoint()

  if (!(entryPoint || bottomSheetEntryPoint)) {
    return null
  }

  return (
    <RenderIfModuleActive
      FallbackComponent={FallbackComponent}
      moduleSlug={ModuleSlug.survey}>
      <DynamicForm
        entryPoint={(entryPoint ?? bottomSheetEntryPoint) as string}
        showError={showError}
      />
    </RenderIfModuleActive>
  )
}
