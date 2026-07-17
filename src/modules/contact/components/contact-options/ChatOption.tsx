import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {useModules} from '@/hooks/useModules'
import {useChat} from '@/modules/chat/slice'
import {type ContactOption} from '@/modules/contact/data/contact'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

export const ChatOption = ({icon, ...props}: ContactOption) => {
  const {enabledModulesBySlug} = useModules()
  const chatModule = enabledModulesBySlug?.includes(ModuleSlug.chat)
  const {open} = useChat()

  return chatModule ? (
    <TopTaskButton
      {...props}
      accessibilityLabel={`${props.accessibilityLabel ?? props.title}, ${props.text}`}
      icon={icon}
      onPress={open}
    />
  ) : null
}
