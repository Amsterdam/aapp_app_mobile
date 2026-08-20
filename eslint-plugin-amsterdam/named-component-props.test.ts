import {rule} from './named-component-props.mts'
import {ruleTester} from './utils/ruleTester'

ruleTester.run('named-component-props', rule, {
  valid: [
    {
      code: `type SingleSelectableProps = ViewProps & React.RefAttributes<View>
export const SingleSelectable = ({children}: SingleSelectableProps) => <View>{children}</View>`,
    },
    {
      code: `type PaginationItemProps = PropsWithChildren<{index: number}> & ViewProps
export const PaginationItem: React.FC<PaginationItemProps> = props => <View>{props.children}</View>`,
    },
    {
      code: `export const SingleSelectable = ({children}: ViewProps) => <View>{children}</View>`,
    },
    {
      code: `const renderItem = ({children}: ViewProps & React.RefAttributes<View>) => <View>{children}</View>`,
    },
  ],
  invalid: [
    {
      code: `export const SingleSelectable = ({children}: ViewProps & React.RefAttributes<View>) => <View>{children}</View>`,
      output: `type Props = ViewProps & React.RefAttributes<View>
export const SingleSelectable = ({children}: Props) => <View>{children}</View>`,
      errors: [
        {
          messageId: 'noCombinedTypeForComponentProps',
          data: {name: 'SingleSelectable'},
        },
      ],
    },
    {
      code: `export const Icon = (props: IconProps | ExternalIconProps) => <View {...props} />`,
      output: `type Props = IconProps | ExternalIconProps
export const Icon = (props: Props) => <View {...props} />`,
      errors: [
        {
          messageId: 'noCombinedTypeForComponentProps',
          data: {name: 'Icon'},
        },
      ],
    },
    {
      code: `export const PaginationItem: React.FC<PropsWithChildren<{index: number}> & ViewProps> = props => <View>{props.children}</View>`,
      output: `type Props = PropsWithChildren<{index: number}> & ViewProps
export const PaginationItem: React.FC<Props> = props => <View>{props.children}</View>`,
      errors: [
        {
          messageId: 'noCombinedTypeForComponentProps',
          data: {name: 'PaginationItem'},
        },
      ],
    },
    {
      code: `export const InlinePropsComponent: React.FC<{id: string}> = props => <View testID={props.id} />`,
      output: `type Props = {id: string}
export const InlinePropsComponent: React.FC<Props> = props => <View testID={props.id} />`,
      errors: [
        {
          messageId: 'noCombinedTypeForComponentProps',
          data: {name: 'InlinePropsComponent'},
        },
      ],
    },
    {
      code: `function Header(props: BaseHeaderProps & ViewProps) {
  return <View {...props} />
}`,
      output: `type HeaderProps = BaseHeaderProps & ViewProps
function Header(props: HeaderProps) {
  return <View {...props} />
}`,
      errors: [
        {
          messageId: 'noCombinedTypeForComponentProps',
          data: {name: 'Header'},
        },
      ],
    },
    {
      code: `const LocalIcon = (props: IconProps | ExternalIconProps) => <View {...props} />`,
      output: `type LocalIconProps = IconProps | ExternalIconProps
const LocalIcon = (props: LocalIconProps) => <View {...props} />`,
      errors: [
        {
          messageId: 'noCombinedTypeForComponentProps',
          data: {name: 'LocalIcon'},
        },
      ],
    },
    {
      code: `type Props = {existing: string}
export const MyComponent = ({id}: {id: string}) => <View testID={id} />`,
      output: `type Props = {existing: string}
type MyComponentProps = {id: string}
export const MyComponent = ({id}: MyComponentProps) => <View testID={id} />`,
      errors: [
        {
          messageId: 'noCombinedTypeForComponentProps',
          data: {name: 'MyComponent'},
        },
      ],
    },
    {
      code: `/**
 * Renders the current icon.
 */
export const Icon = (props: IconProps | ExternalIconProps) => <View {...props} />`,
      output: `type Props = IconProps | ExternalIconProps
/**
 * Renders the current icon.
 */
export const Icon = (props: Props) => <View {...props} />`,
      errors: [
        {
          messageId: 'noCombinedTypeForComponentProps',
          data: {name: 'Icon'},
        },
      ],
    },
    {
      code: `// some comment
export const Html = (props: HtmlProps | UnsafeHtmlProps) => MissingValue`,
      output: `type Props = HtmlProps | UnsafeHtmlProps
// some comment
export const Html = (props: Props) => MissingValue`,
      errors: [
        {
          messageId: 'noCombinedTypeForComponentProps',
          data: {name: 'Html'},
        },
      ],
    },
    {
      code: `export const Polygons = <P extends GeoJsonProperties>({
  data,
}: {
  data: Feature<Polygon | MultiPolygon, P>[]
}) => (
  <Geojson
    data={data}
  />
)`,
      output: `type Props<P extends GeoJsonProperties> = {
  data: Feature<Polygon | MultiPolygon, P>[]
}
export const Polygons = <P extends GeoJsonProperties>({
  data,
}: Props<P>) => (
  <Geojson
    data={data}
  />
)`,
      errors: [
        {
          messageId: 'noCombinedTypeForComponentProps',
          data: {name: 'Polygons'},
        },
      ],
    },
    {
      code: `export const Items = <const T,>({
  items,
}: {
  items: T[]
}) => items`,
      output: `type Props<T> = {
  items: T[]
}
export const Items = <const T,>({
  items,
}: Props<T>) => items`,
      errors: [
        {
          messageId: 'noCombinedTypeForComponentProps',
          data: {name: 'Items'},
        },
      ],
    },
    {
      code: `export const Options = <T = string>({
  items,
}: {
  items: T[]
}) => items`,
      output: `type Props<T = string> = {
  items: T[]
}
export const Options = <T = string>({
  items,
}: Props<T>) => items`,
      errors: [
        {
          messageId: 'noCombinedTypeForComponentProps',
          data: {name: 'Options'},
        },
      ],
    },
    {
      code: `export const PairList = <T, U extends NamedItem>({
  items,
}: {
  items: Array<[T, U]>
}) => items`,
      output: `type Props<T, U extends NamedItem> = {
  items: Array<[T, U]>
}
export const PairList = <T, U extends NamedItem>({
  items,
}: Props<T, U>) => items`,
      errors: [
        {
          messageId: 'noCombinedTypeForComponentProps',
          data: {name: 'PairList'},
        },
      ],
    },
    {
      code: `type Props = {existing: string}
const Items = <T = string>({
  items,
}: {
  items: T[]
}) => items`,
      output: `type Props = {existing: string}
type ItemsProps<T = string> = {
  items: T[]
}
const Items = <T = string>({
  items,
}: ItemsProps<T>) => items`,
      errors: [
        {
          messageId: 'noCombinedTypeForComponentProps',
          data: {name: 'Items'},
        },
      ],
    },
  ],
})
