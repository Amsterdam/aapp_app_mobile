import type {ReactNode} from 'react'

type LinearGradientProps = {
  children?: ReactNode
}

const LinearGradient = ({children}: LinearGradientProps) => children ?? null

export default LinearGradient
