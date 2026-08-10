import {rule} from './todo-comment-requires-ticket.mts'
import {ruleTester} from './utils/ruleTester'

ruleTester.run('todo-comment-requires-ticket', rule, {
  valid: [
    {
      code: `// TODO AM-123: follow up on this
const value = 1`,
    },
    {
      code: `// TODO https://example.com/browse/AM-123: follow up on this
const value = 1`,
    },
    {
      code: `// TODO am-456 implement this later
const value = 1`,
    },
    {
      code: `/* TODO AM-789: remove after rollout */
const value = 1`,
    },
    {
      code: `// done later
const value = 1`,
    },
  ],
  invalid: [
    {
      code: `// TODO: follow up on this
const value = 1`,
      errors: [{messageId: 'todoCommentRequiresTicket'}],
    },
    {
      code: `/* TODO something here */
const value = 1`,
      errors: [{messageId: 'todoCommentRequiresTicket'}],
    },
  ],
})
