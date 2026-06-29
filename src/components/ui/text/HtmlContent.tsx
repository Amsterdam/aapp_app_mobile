import {Fragment, useCallback, useMemo, useState} from 'react'
import {
  LayoutChangeEvent,
  Platform,
  ScaledSize,
  StyleSheet,
  TextStyle,
  View,
  type ViewProps,
} from 'react-native'
import RenderHTML, {
  CustomBlockRenderer,
  CustomMixedRenderer,
  CustomTagRendererRecord,
  type Element,
  MixedStyleDeclaration,
  type TNode,
  type TRenderEngineConfig,
  useInternalRenderer,
} from 'react-native-render-html'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {ListItemMarker} from '@/components/ui/text/list/ListItemMarker'
import {type TestProps} from '@/components/ui/types'
import {promoteInlineLinks} from '@/components/ui/utils/promoteInlineLinks'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useDynamicImageAspectRatio} from '@/hooks/useDynamicImageAspectRatio'
import {Theme} from '@/themes/themes'
import {TextTokens} from '@/themes/tokens/text'
import {useThemable} from '@/themes/useThemable'

type Props = {
  content: string | undefined
  isIntro?: boolean
  transformRules?: HtmlTransformRule[]
} & TestProps

export type HtmlTransformRule = {
  find: RegExp
  replace: string
}

const CAPTION_TAGS = new Set(['figcaption', 'cite', 'sub', 'sup'])

/**
 * Applies all transform rules to the content.
 */
const transformContent = (
  content: string,
  transformRules: HtmlTransformRule[] = [],
) =>
  transformRules.reduce(
    (result, {find, replace}) => result.replace(find, replace),
    content,
  )

/**
 * Convert a parent <p> tag into a <figure> tag if its children contains an <img> tag.
 * Converts all non <img> children into <figcaption>
 * @param element
 * @returns
 */
const convertParagraphToFigure = (element: Element) => {
  if (
    element.tagName === 'p' &&
    element.children.some(
      child => 'tagName' in child && child.tagName === 'img',
    )
  ) {
    element.tagName = 'figure'

    element.children.forEach(child => {
      if (
        'tagName' in child &&
        CAPTION_TAGS.has((child.tagName as string) || '')
      )
        child.tagName = 'figcaption'
    })
  }

  return element
}

/**
 * Returns all parent tag names as an array
 * @param tnode
 * @returns
 */
const getParentTags = (tnode: TNode) => {
  const tags: string[] = []
  let parent = tnode.parent

  while (parent && 'tagName' in parent && typeof parent.tagName === 'string') {
    tags.push(parent.tagName)

    parent = parent.parent
  }

  return tags
}

const classesStyles: TRenderEngineConfig['classesStyles'] = {
  'css-text-align-right': {
    textAlign: 'right',
  },
}

/**
 * Renders HTML content, applying the typographic design.
 */
export const HtmlContent = ({content, isIntro, transformRules}: Props) => {
  const [contentWidth, setContentWidth] = useState<number>(0)
  const baseStyle = useThemable(createBaseStyle)
  const styles = useThemable(createStyles(isIntro))
  const systemFonts = useThemable(createFontList)
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  const onLayoutChange = useCallback((event: LayoutChangeEvent) => {
    setContentWidth(event.nativeEvent.layout.width)
  }, [])

  const html = useMemo(() => {
    if (!content) {
      return
    }

    const transformedContent = transformContent(content, transformRules)

    return isScreenReaderEnabled
      ? promoteInlineLinks(transformedContent)
      : transformedContent
  }, [content, isScreenReaderEnabled, transformRules])

  const tagsStyles: Record<string, MixedStyleDeclaration> = useMemo(
    () => ({
      b: styles.boldText,
      blockquote: {
        ...styles.boldText,
        ...styles.titleLevel4,
        ...styles.spaceAround,
      },
      h1: {...styles.boldText, ...styles.titleLevel1, ...styles.titleMargins},
      h2: {...styles.boldText, ...styles.titleLevel2, ...styles.titleMargins},
      h3: {...styles.boldText, ...styles.titleLevel3, ...styles.titleMargins},
      h4: {...styles.boldText, ...styles.titleLevel4, ...styles.titleMargins},
      h5: {...styles.boldText, ...styles.titleLevel5, ...styles.titleMargins},
      h6: {...styles.boldText, ...styles.titleLevel6, ...styles.titleMargins},
      img: styles.margins,
      li: {...styles.paragraph},
      ol: {...styles.paragraph, ...styles.margins},
      p: {...styles.paragraph, ...styles.margins},
      strong: styles.boldText,
      ul: styles.margins,
      figcaption: {...styles.small, ...styles.captionMargins},
      sup: {...styles.small, ...styles.supMargins},
    }),
    [styles],
  )

  if (!html) {
    return null
  }

  return (
    <View onLayout={onLayoutChange}>
      <RenderHTML
        baseStyle={baseStyle}
        classesStyles={classesStyles}
        contentWidth={contentWidth}
        domVisitors={{onElement: convertParagraphToFigure}}
        renderers={renderers}
        renderersProps={{img: {enableExperimentalPercentWidth: true}}}
        source={{html}}
        systemFonts={systemFonts}
        tagsStyles={tagsStyles}
      />
    </View>
  )
}

const getFontSize = (text: TextTokens, isIntro = false) =>
  isIntro ? text.fontSize.intro : text.fontSize.body

const getLineHeight = (text: TextTokens, isIntro = false) =>
  isIntro ? text.lineHeight.intro : text.lineHeight.body

const createBaseStyle = ({color, text}: Theme) => ({
  color: color.text.default,
  fontFamily: text.fontFamily.regular,
  fontSize: getFontSize(text),
  lineHeight: getLineHeight(text),
})

const createStyles: (
  isIntro: Props['isIntro'],
) => (theme: Theme) => Record<string, MixedStyleDeclaration> =
  isIntro =>
  ({size, text, color}: Theme) => {
    const lineHeight = getLineHeight(text, isIntro)

    // By default, Android sets this to `bold` – which breaks the font family.
    const platformDependentFontWeight: TextStyle['fontWeight'] =
      Platform.OS === 'android' ? 'normal' : undefined

    return {
      margins: {
        marginTop: 0,
        marginBottom: lineHeight,
      },
      small: {
        fontSize: text.fontSize.small,
        lineHeight: text.lineHeight.small,
        color: color.text.secondary,
      },
      paragraph: {
        fontSize: getFontSize(text, isIntro),
        lineHeight,
      },
      boldText: {
        fontFamily: text.fontFamily.bold,
        fontWeight: platformDependentFontWeight,
      },
      spaceAround: {
        margin: size.spacing.md,
      },
      titleLevel1: {
        fontSize: text.fontSize.h1,
        lineHeight: text.lineHeight.h1,
      },
      titleLevel2: {
        fontSize: text.fontSize.h2,
        lineHeight: text.lineHeight.h2,
      },
      titleLevel3: {
        fontSize: text.fontSize.h3,
        lineHeight: text.lineHeight.h3,
      },
      titleLevel4: {
        fontSize: text.fontSize.h4,
        lineHeight: text.lineHeight.h4,
      },
      titleLevel5: {
        fontSize: text.fontSize.h5,
        lineHeight: text.lineHeight.h5,
      },
      titleLevel6: {
        fontSize: text.fontSize.h6,
        lineHeight: text.lineHeight.h6,
      },
      titleMargins: {
        marginTop: 0,
        marginBottom: lineHeight / 2,
      },
      captionMargins: {
        marginBottom: lineHeight,
      },
      supMargins: {
        marginTop: -size.spacing.md,
      },
      imgWithCaptionMargins: {
        marginBottom: size.spacing.sm,
      },
    }
  }

const createFontList = ({text}: Theme): string[] => [
  text.fontFamily.bold,
  text.fontFamily.regular,
]

// An unordered list only renders its children, without the bullet point and any spacing.
const UlRenderer: CustomBlockRenderer = ({TNodeChildrenRenderer, ...props}) => (
  <Box insetBottom="lg">
    <TNodeChildrenRenderer {...props} />
  </Box>
)

const createLiMarkerStyles = (fontScale: ScaledSize['fontScale']) =>
  StyleSheet.create({
    marker: {
      paddingTop: 2 * fontScale, // Adjusts for spacing in probably the library’s internal custom renderer.
    },
  })

const LiMarker = () => {
  const {fontScale} = useDeviceContext()
  const styles = createLiMarkerStyles(fontScale)

  return (
    <ListItemMarker
      additionalStyles={styles.marker}
      marker="square"
      testID="ListItemMarker"
    />
  )
}

// A list item in an unordered list renders the correct bullet point encoded in the font.
// The `Column` with the `flex` prop allows the list item children to shrink and fit the row.
const LiRenderer: CustomBlockRenderer = props => {
  const {TDefaultRenderer, TNodeChildrenRenderer} = props

  if (props.tnode.parent?.tagName === 'ul') {
    return (
      <Row>
        <LiMarker />
        <Column flex={1}>
          <TNodeChildrenRenderer {...props} />
        </Column>
      </Row>
    )
  }

  return <TDefaultRenderer {...props} />
}

const ARenderer: CustomMixedRenderer = props => {
  const {href} = props.tnode.attributes
  const openUrl = useOpenUrl()
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  const parentTags = getParentTags(props.tnode)
  const isInCaption = parentTags.some(tag => CAPTION_TAGS.has(tag))

  const {TNodeChildrenRenderer} = props

  const Wrapper = isScreenReaderEnabled ? SingleSelectable : Fragment

  return (
    <Wrapper {...(isScreenReaderEnabled && {accessibilityRole: 'link'})}>
      <InlineLink
        isExternal
        onPress={() => openUrl(href)}
        testID="HtmlRendererAInlineLink"
        variant={isInCaption ? 'small' : 'body'}>
        <TNodeChildrenRenderer {...props} />
      </InlineLink>
    </Wrapper>
  )
}

const ImgRenderer: CustomMixedRenderer = props => {
  const {rendererProps} = useInternalRenderer('img', props)
  const captionNode =
    props.tnode.children.find(child =>
      CAPTION_TAGS.has(child?.tagName || ''),
    ) ??
    props.tnode.parent?.children.find(child =>
      CAPTION_TAGS.has(child?.tagName || ''),
    )

  const styles = useThemable(createStyles(false))
  const {alt, source, style} = rendererProps
  const aspectRatio = useDynamicImageAspectRatio(source.uri)

  const combinedStyle = captionNode
    ? ([style, styles.imgWithCaptionMargins] as ViewProps['style'])
    : style

  return (
    <View style={combinedStyle}>
      <LazyImage
        accessibilityLabel={alt}
        aspectRatio={aspectRatio}
        openInImageViewer
        source={source}
        testID="HtmlRendererImage"
      />
    </View>
  )
}

const renderers: CustomTagRendererRecord = {
  a: ARenderer,
  li: LiRenderer,
  ul: UlRenderer,
  img: ImgRenderer,
}
