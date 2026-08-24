import {ProjectTimeline} from './ProjectTimeline'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: ProjectTimeline,
} satisfies Meta<typeof ProjectTimeline>

export const Default: StoryObj<typeof ProjectTimeline> = {
  args: {
    items: [
      {
        collapsed: false,
        body: '<p>Dolor sit amet 1</p>',
        date: '',
        items: [
          {
            title: 'Lorem ipsum 1.1',
            body: '<p>Dolor sit amet 1.1</p>',
            date: '',
          },
          {
            title: 'Lorem ipsum 1.2',
            body: '<p>Dolor sit amet 1.2</p>',
            date: '',
          },
        ],
        progress: 'done',
        title: 'Titel 1',
      },
      {
        collapsed: true,
        body: '<p>Dolor sit amet 2</p>',
        date: '',
        items: [
          {
            title: 'Lorem ipsum 2.1',
            body: '<p>Dolor sit amet 2.1</p>',
            date: '',
          },
        ],
        progress: 'active',
        title: 'Titel 2',
      },
      {
        collapsed: true,
        body: '<p>Dolor sit amet 3</p>',
        date: '',
        items: [
          {
            title: 'Lorem ipsum 3.1',
            body: '<p>Dolor sit amet 3.1</p>',
            date: '',
          },
          {
            title: 'Lorem ipsum 3.2',
            body: '<p>Dolor sit amet 3.2</p>',
            date: '',
          },
        ],
        progress: 'planned',
        title: 'Titel 3',
      },
    ],
  },
}
