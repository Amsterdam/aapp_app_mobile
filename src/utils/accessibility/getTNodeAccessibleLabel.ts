import type {TNode, TText} from '@native-html/render'
import {accessibleText} from '@/utils/accessibility/getAccessibleLabel'

export const getTNodeAccessibleLabel = (node: TNode): string | undefined => {
  const result = []

  if (
    'init' in node &&
    'textNode' in (node.init as TText) &&
    (node.init as TText).textNode
  ) {
    result.push(String((node.init as TText).textNode.data))
  }

  const textFragments = node.children.flatMap(getTNodeAccessibleLabel)

  result.push(...textFragments)

  return result.length > 0 ? accessibleText(...result) : undefined
}
