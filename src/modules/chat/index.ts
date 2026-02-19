import {onNotificationEvent} from '@/modules/chat/onNotificationEvent'
import {chatSlice, ChatState} from '@/modules/chat/slice'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof ChatState)[] = ['conversationId']

export const chatModule = createClientModule({
  excludeFromHome: true,
  onNotificationEvent,
  name: 'ChatModule',
  reduxConfigs: [
    {
      key: ReduxKey.chat,
      persistVersion: 0,
      persistWhitelist,
      slice: chatSlice,
    },
  ],
  slug: ModuleSlug.chat,
  alwaysEnabled: true,
})
