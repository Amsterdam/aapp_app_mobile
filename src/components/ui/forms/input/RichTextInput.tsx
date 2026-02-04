import {XMLParser} from 'fast-xml-parser'
import {useEffect, useRef, useState, type RefObject} from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import {
  KeyboardStickyView,
  KeyboardToolbar,
} from 'react-native-keyboard-controller'
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor'
import RenderHTML, {type CustomMixedRenderer} from 'react-native-render-html'
import type {background} from 'storybook/theming'
import {Button} from '@/components/ui/buttons/Button'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Phrase} from '@/components/ui/text/Phrase'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'

type ToolbarProps = {editor: RefObject<RichEditor>}

const myActions = [
  actions.setBold,
  actions.setItalic,
  actions.setStrikethrough,
  actions.insertLink,
  actions.heading1,
  actions.blockquote,
  actions.code,
  actions.insertBulletsList,
  actions.insertOrderedList,
  actions.indent,
  actions.outdent,
  actions.undo,
  actions.redo,
]
const Toolbar = ({editor}: ToolbarProps) => {
  const [selectedActions, setSelectedActions] = useState<string[]>([])

  useEffect(() => {
    editor.current?.registerToolbar(items => {
      setSelectedActions(items)
    })
  }, [editor])

  return (
    <KeyboardStickyView>
      <View
        style={[
          StyleSheet.absoluteFill,
          {position: 'relative', left: 0, bottom: 0, right: 0},
        ]}>
        <Row>
          {myActions.map(action => (
            <PressableBase
              onPress={() => {
                editor.current?.sendAction(action, 'result')
              }}
              testID="rich-text-input-frank-Button">
              <Icon
                color={selectedActions.includes(action) ? 'link' : 'default'}
                name="add"
                size="lg"
              />
            </PressableBase>
          ))}
        </Row>
      </View>
    </KeyboardStickyView>
  )
}

export const RichTextInputPell = () => {
  const richText = useRef<RichEditor>(null)

  return (
    <>
      <Column>
        <RichEditor
          onChange={console.log}
          ref={richText}
          // style={{minHeight: 200}}
        />
        {/* <RichToolbar
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setStrikethrough,
          actions.insertLink,
          actions.heading1,
          actions.blockquote,
          actions.code,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.indent,
          actions.outdent,
          actions.undo,
          actions.redo,
          'frank',
        ]}
        editor={richText}
        frank={() => {
          richText.current?.insertText('🐶')
        }}
        renderAction={(action: string, selected: boolean) => {
          console.log('rendering ', action, selected)

          //   if (action === 'frank') {
          return (
            <PressableBase
              onPress={() => {
                richText.current?.sendAction(action, 'result')
              }}
              testId="rich-text-input-frank-button">
              <Icon
                color={selected ? 'link' : 'default'}
                name="add"
                size="lg"
              />
            </PressableBase>
          )
          //   }
        }}
        style={{background: '#333333'}}
      /> */}
      </Column>
      <Toolbar editor={richText} />
    </>
  )
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  textNodeName: 'text',
})

const parseHtmlToAST = (html: string) => {
  const ast = parser.parse(
    `<>${html.replaceAll(/([^<>]*)/g, a => `<text>${a}</text>`)}</>`,
  )

  console.log('ast', ast)

  return ast
}

const BRenderer: CustomMixedRenderer = props => {
  const {href} = props.tnode.attributes

  const {TNodeChildrenRenderer} = props

  return (
    <Text style={{fontWeight: 'bold'}}>
      <TNodeChildrenRenderer {...props} />
    </Text>
  )
}

const R = ({html}: {html: string}) => (
  <RenderHTML
    renderers={{
      b: BRenderer,
    }}
    source={{html}}
  />
)

type AST = AST[] | string | {children: AST[]; type: string} | null | undefined

const RenderAST = ({ast}: {ast: AST}) => {
  if (Array.isArray(ast)) {
    return (
      <Text>
        {ast.map((node, index) => (
          <RenderAST
            ast={node}
            key={index}
          />
        ))}
      </Text>
    )
  } else if (typeof ast === 'string') {
    return <Text>{ast}</Text>
  } else if (typeof ast === 'object' && ast !== null) {
    if (ast.type === 'b') {
      return (
        <Text style={{fontWeight: 'bold'}}>
          {ast.children?.map((child, index) => (
            <RenderAST
              ast={child}
              key={index}
            />
          ))}
        </Text>
      )
    }
  } else {
    return null
  }
}

const getTextFromAST = (ast: AST): string => {
  if (Array.isArray(ast)) {
    return ast.map(getTextFromAST).join('')
  } else if (typeof ast === 'string') {
    return ast
  } else if (typeof ast === 'object' && ast !== null) {
    return getTextFromAST(ast.children)
  } else {
    return ''
  }
}

const getChangedText = (oldText: string, newText: string) => {
  let start = 0

  if (oldText === newText) {
    return {type: 'none', text: ''}
  }

  if (oldText.length > newText.length) {
    // Deletion
    while (start < newText.length && oldText[start] === newText[start]) {
      start++
    }

    return {
      type: 'deletion',
      text: oldText.slice(start, oldText.length - (newText.length - start)),
    }
  } else {
    // Insertion
    while (start < oldText.length && oldText[start] === newText[start]) {
      start++
    }

    return {
      type: 'insertion',
      text: newText.slice(start, newText.length - (oldText.length - start)),
    }
  }
}

const insertTextAtPosition = (
  ast: AST,
  text: string,
  selection: number,
): AST | number => {
  if (Array.isArray(ast)) {
    let currentPos = 0

    for (const node of ast) {
      const nodeText = getTextFromAST(node)

      if (currentPos + nodeText.length >= selection) {
        const newNode = insertTextAtPosition(
          node,
          text,
          selection - currentPos,
        ) as AST

        return ast.map(n => (n === node ? newNode : n))
      }

      currentPos += nodeText.length
    }

    return currentPos
  } else if (typeof ast === 'string') {
    if (selection <= ast.length) {
      const before = ast.slice(0, selection)
      const after = ast.slice(selection)

      return `${before}${text}${after}`
    } else {
      return ast.length
    }
  } else if (typeof ast === 'object' && ast !== null) {
    let currentPos = 0

    for (const node of ast.children) {
      const nodeText = getTextFromAST(node)

      if (currentPos + nodeText.length >= selection) {
        const newNode = insertTextAtPosition(
          node,
          text,
          selection - currentPos,
        ) as AST

        return {
          ...ast,
          children: ast.children.map(n => (n === node ? newNode : n)),
        }
      }

      currentPos += nodeText.length
    }

    return currentPos
  }
}
const removeTextAtPosition = (
  ast: AST,
  text: string,
  selection: number,
): AST | number => {
  if (Array.isArray(ast)) {
    let currentPos = 0

    for (const node of ast) {
      const nodeText = getTextFromAST(node)

      if (currentPos + nodeText.length >= selection) {
        const newNode = removeTextAtPosition(
          node,
          text,
          selection - currentPos,
        ) as AST

        return ast.map(n => (n === node ? newNode : n))
      }

      currentPos += nodeText.length
    }

    return currentPos
  } else if (typeof ast === 'string') {
    if (selection <= ast.length) {
      const before = ast.slice(0, selection)
      const after = ast.slice(selection + text.length)

      return `${before}${after}`
    } else {
      return ast.length
    }
  } else if (typeof ast === 'object' && ast !== null) {
    let currentPos = 0

    for (const node of ast.children) {
      const nodeText = getTextFromAST(node)

      if (currentPos + nodeText.length >= selection) {
        const newNode = removeTextAtPosition(
          node,
          text,
          selection - currentPos,
        ) as AST

        return {
          ...ast,
          children: ast.children.map(n => (n === node ? newNode : n)),
        }
      }

      currentPos += nodeText.length
    }

    return currentPos
  }
}

const adjustAST = (
  oldAST: AST,
  newText: string,
  selection: {end: number; start: number},
): AST => {
  const oldText = getTextFromAST(oldAST)
  const change = getChangedText(oldText, newText)

  console.log('onChange', oldText, newText, change)

  if (change.type === 'none') {
    return oldAST
  } else if (change.type === 'insertion') {
    return insertTextAtPosition(oldAST, change.text, selection.start) as AST
  } else if (change.type === 'deletion') {
    return removeTextAtPosition(
      oldAST,
      change.text,
      selection.end - change.text.length,
    ) as AST
  }

  return oldAST
}

type Selection = {
  end: number
  start: number
}

const transformSelection = (
  ast: AST,
  selection: Selection,
  transform: (node: AST, start: number, end: number) => AST,
): AST => {
  if (Array.isArray(ast)) {
  } else if (typeof ast === 'string') {
    if (selection.start <= ast.length && selection.end >= 0) {
      const before = ast.slice(0, selection.start)
      const after = ast.slice(selection.end)

      const transformedSelected = transform(ast, selection.start, selection.end)

      return [before, transformedSelected, after]
    }
  } else if (typeof ast === 'object' && ast !== null) {
  }
}

export const RichTextInput = () => {
  const [value, setValue] = useState<AST>(
    ['o', {type: 'b', children: ['asd']}, 'sd'],
    // parseHtmlToAST('voor<b>Hoi</b>op'),
    // '<div><b>Hoi</b></div><div>dit <i>ishyjkhj </i><strike>dfgdfsd</strike>&nbsp;<a href="https://www.amsterdam.nl/">sdfg</a>&nbsp;</div><h1>titel</h1><blockquote>mijn quote</blockquote><pre><code type="">&lt;b&gt;data&lt;/b&gt;</code></pre><div><ul><li>unordered list</li><ul><li><span style="font-size: 1em;">subitem</span></li></ul></ul><ol><li>hoi</li></ol></div>',
  )
  const [selection, setSelection] = useState({start: 0, end: 0})
  const onPress = () => {
    const newValue =
      value.slice(0, selection.start) +
      '<b>TEST</b>' +
      value.slice(selection.end)

    setValue(newValue)
    console.log('new value', newValue)
  }

  const adjustText = (oldText: AST, newText: string) => {
    console.log('adjustText', oldText, newText)
  }

  console.log('value', value)

  return (
    <Column>
      {/* <HtmlContent
        content={value}
        testID="asdButton"
      /> */}
      <Phrase>Input:</Phrase>
      <TextInput
        onChangeText={newValue => {
          adjustText(value, newValue)
          setValue(adjustAST(value, newValue, selection))
        }}
        // onChange={e =>
        //   console.log(
        //     'change',
        //     e.nativeEvent.target,
        //     e.nativeEvent.eventCount,
        //     e.nativeEvent.text,
        //   )
        // }
        //   value={value}
        onSelectionChange={e => {
          setSelection(e.nativeEvent.selection)
        }}>
        {/* <Text>
          <Text style={{fontWeight: 'bold'}}>Hoi</Text>op
        </Text> */}
        {/* <Text>
          <R html="o<b>asd</b>sd" />
        </Text> */}
        <RenderAST ast={value} />
      </TextInput>
      <Button
        onPress={onPress}
        testID="Button"
      />
    </Column>
  )
}
