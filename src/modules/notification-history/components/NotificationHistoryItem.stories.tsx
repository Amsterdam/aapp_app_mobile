import {NotificationHistoryItem} from './NotificationHistoryItem'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ModuleSlug} from '@/modules/slugs'

const slug = ModuleSlug['construction-work']

const meta = {
  component: NotificationHistoryItem,
} satisfies Meta<typeof NotificationHistoryItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    enabledModules: [
      {
        moduleSlug: slug,
        moduleAppReason: null,
        moduleFallbackUrl: null,
        releaseFallbackUrl: null,
        moduleButtonLabel: null,
        releaseButtonLabel: null,
        releaseAppReason: null,
        title: 'Werkzaamheden',
        icon: 'construction-work',
        slug,
        status: 1,
        description: '',
        version: '1.0.0',
      },
    ],
    notification: {
      title: 'De nieuwe brug is geplaatst',
      module_slug: slug,
      created_at: '2022-01-15 10:30:00',
      pushed_at: '2022-01-15 10:30:00',
      is_read: false,
      id: '1',
      context: {},
      body: 'De nieuwe brug is geplaatst',
    },
  },
}
