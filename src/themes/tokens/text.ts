export type ParagraphVariants =
  | 'body'
  | 'intro'
  | 'quote'
  | 'small'
  | 'extraSmall'

type ParagraphTokens = {
  body: number
  extraSmall: number
  intro: number
  quote: number
  small: number
}

export type TitleTokensPerLevel = {
  h1: number
  h2: number
  h3: number
  h4: number
  h5: number
  h6: number
}

export type Emphasis = 'default' | 'strong'

export enum FontFamily {
  bold = 'AmsterdamSans-ExtraBold',
  regular = 'AmsterdamSans-Regular',
}

export type TextTokens = {
  fontFamily: typeof FontFamily
  fontSize: ParagraphTokens & TitleTokensPerLevel
  lineHeight: ParagraphTokens & TitleTokensPerLevel
}

const FontSize = {
  body: 18,
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 22,
  h5: 18,
  h6: 16,
  intro: 22,
  quote: 24,
  small: 16,
  extraSmall: 13,
} as const

export const textTokens: TextTokens = {
  fontSize: {
    body: FontSize.body,
    h1: FontSize.h1,
    h2: FontSize.h2,
    h3: FontSize.h3,
    h4: FontSize.h4,
    h5: FontSize.h5,
    h6: FontSize.h6,
    intro: FontSize.intro,
    quote: FontSize.quote,
    small: FontSize.small,
    extraSmall: FontSize.extraSmall,
  },
  fontFamily: {
    bold: FontFamily.bold,
    regular: FontFamily.regular,
  },
  lineHeight: {
    body: Math.round(1.6 * FontSize.body),
    h1: Math.round(1.1 * FontSize.h1),
    h2: Math.round(1.25 * FontSize.h2),
    h3: Math.round(1.3 * FontSize.h3),
    h4: Math.round(1.4 * FontSize.h4),
    h5: Math.round(1.4 * FontSize.h5),
    h6: Math.round(1.4 * FontSize.h6),
    intro: Math.round(1.6 * FontSize.intro),
    quote: Math.round(1.3 * FontSize.quote),
    small: Math.round(1.5 * FontSize.small),
    extraSmall: Math.round(1.5 * FontSize.extraSmall),
  },
} as const
