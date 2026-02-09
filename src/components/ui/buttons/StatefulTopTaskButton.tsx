import {
  TopTaskButton,
  TopTaskButtonProps,
} from '@/components/ui/buttons/TopTaskButton'

type StatefulTopTaskButtonProps = {
  isError?: boolean
  isLoading?: boolean
} & TopTaskButtonProps

export const StatefulTopTaskButton = ({
  isError = false,
  isLoading = false,
  text,
  icon,
  ...topTaskButtonProps
}: StatefulTopTaskButtonProps) => (
  <TopTaskButton
    {...topTaskButtonProps}
    icon={{
      ...icon,
      name: isError ? 'warning' : isLoading ? 'spinner' : icon.name,
    }}
    isError={isError}
    text={
      isError
        ? 'Er gaat iets mis. Probeer het later nog een keer.'
        : isLoading
          ? '...'
          : text
    }
  />
)
