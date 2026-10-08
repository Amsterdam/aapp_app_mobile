import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'

export const InactiveModuleMessage = () => (
  <ErrorMessage
    testID="InactiveModuleMessageErrorMessage"
    text="Dit onderdeel werkt nu niet."
    variant="small"
  />
)
