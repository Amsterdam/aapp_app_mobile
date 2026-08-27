import {execSync} from 'node:child_process'
import {
  rule,
  testUtilities,
} from './todo-comment-for-current-branch-must-be-resolved.mts'
import {ruleTester} from './utils/ruleTester'

const noTicketBranchSettings = {
  currentBranchName: 'chore/no-ticket-branch',
}

const currentBranchSettings = {
  currentBranchName: 'chore/AM-123-remove-todo',
}

ruleTester.run('todo-comment-for-current-branch-must-be-resolved', rule, {
  valid: [
    {
      code: `// TODO AM-123: follow up on this
const value = 1`,
      settings: noTicketBranchSettings,
    },
    {
      code: `// TODO https://example.com/browse/AM-123: follow up on this
const value = 1`,
      settings: noTicketBranchSettings,
    },
    {
      code: `// TODO am-456 implement this later
const value = 1`,
      settings: noTicketBranchSettings,
    },
    {
      code: `/* TODO AM-789: remove after rollout */
const value = 1`,
      settings: noTicketBranchSettings,
    },
    {
      code: `// done later
const value = 1`,
      settings: noTicketBranchSettings,
    },
    {
      code: `// TODO AM-456: follow up in another branch
const value = 1`,
      settings: currentBranchSettings,
    },
    {
      code: `// TODO am-789: still valid on this branch
const value = 1`,
      settings: currentBranchSettings,
    },
  ],
  invalid: [
    {
      code: `// TODO AM-123: remove before merging this branch
const value = 1`,
      settings: currentBranchSettings,
      errors: [{messageId: 'todoCommentForCurrentBranchMustBeResolved'}],
    },
    {
      code: `// TODO https://example.com/browse/am-123 remove before merging this branch
const value = 1`,
      settings: currentBranchSettings,
      errors: [{messageId: 'todoCommentForCurrentBranchMustBeResolved'}],
    },
  ],
})

// Test the caching behavior of the getCurrentBranchName function:

jest.mock('node:child_process', () => ({
  execSync: jest.fn(),
}))

const mockedExecSync = jest.mocked(execSync)

describe('todo-comment-for-current-branch-must-be-resolved git branch cache', () => {
  let currentTime = 0

  beforeEach(() => {
    currentTime = 0
    mockedExecSync.mockReset()
    testUtilities.resetGitBranchCache()
    testUtilities.setCurrentTimeProvider(() => currentTime)
  })

  afterEach(() => {
    testUtilities.resetGitBranchCache()
    testUtilities.resetCurrentTimeProvider()
  })

  it('reuses the cached branch name for 10 seconds', () => {
    mockedExecSync.mockReturnValueOnce('chore/AM-123-remove-todo\n')

    expect(testUtilities.getGitBranchName()).toBe('chore/AM-123-remove-todo')

    currentTime = 9_999

    expect(testUtilities.getGitBranchName()).toBe('chore/AM-123-remove-todo')
    expect(mockedExecSync).toHaveBeenCalledTimes(1)

    mockedExecSync.mockReturnValueOnce('chore/AM-456-next-ticket\n')
    currentTime = 10_000

    expect(testUtilities.getGitBranchName()).toBe('chore/AM-456-next-ticket')
    expect(mockedExecSync).toHaveBeenCalledTimes(2)
  })
})
