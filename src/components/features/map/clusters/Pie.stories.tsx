import {Pie} from './Pie'
import type {Meta} from '@storybook/react-native-web-vite'
import {Row} from '@/components/ui/layout/Row'

const meta = {
  component: Pie,
} satisfies Meta<typeof Pie>

export default meta

const COLORS = ['red', 'blue', 'yellow', 'pink']
const randomPieData = (): {color: string; percentage: number}[] => {
  if (COLORS.length === 0) return []

  // eslint-disable-next-line sonarjs/pseudo-random
  const weights = COLORS.map(() => Math.random())
  const total = weights.reduce((a, b) => a + b, 0)

  const raw = weights.map(w => w / total)

  const factor = 10 ** 2
  const rounded = raw.map(p => Math.round(p * factor) / factor)

  const sumExceptLast = rounded.slice(0, -1).reduce((a, b) => a + b, 0)
  const last = Math.max(0, Math.round((1 - sumExceptLast) * factor) / factor)

  return COLORS.map((color, i) => ({
    color,
    percentage: i === COLORS.length - 1 ? last : rounded[i],
  }))
}

const Pies = () => (
  <Row gutter="md">
    <Pie
      data={randomPieData()}
      size={20}
    />
    <Pie
      data={randomPieData()}
      size={50}
    />
    <Pie
      data={randomPieData()}
      size={100}
    />
    <Pie
      data={randomPieData()}
      size={150}
    />
    <Pie
      data={randomPieData()}
      size={200}
    />
  </Row>
)

export const Default = {
  render: Pies,
}
