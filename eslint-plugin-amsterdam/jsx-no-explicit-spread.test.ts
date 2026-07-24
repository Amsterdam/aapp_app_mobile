import {rule} from './jsx-no-explicit-spread.mts'
import {ruleTester} from './utils/ruleTester'

const errors = [{messageId: 'noSpreading'}] as const

ruleTester.run('jsx-no-explicit-spread', rule, {
  valid: [
    {
      code: `
export const Component = ({gutter, flex}: any) => {
  return <Row gutter={gutter} flex={flex}> </Row>
};`,
    },
  ],
  invalid: [
    {
      code: `
export const Component = ({gutter, flex}: any) => {
  return <Row {...{gutter, flex}}> </Row>
};`,
      output: `
export const Component = ({gutter, flex}: any) => {
  return <Row gutter={gutter} flex={flex}> </Row>
};`,
      errors,
    },
  ],
})
