import {Paragraph} from '@/components/ui/text/Paragraph'

type Props = {
  maxCharacters: number
  numOfCharacters: number
}

export const CharactersLeftDisplay = ({
  maxCharacters,
  numOfCharacters,
}: Props) => (
  <Paragraph
    accessibilityLabel={`U heeft ${numOfCharacters} van de maximaal ${maxCharacters} tekens ingevoerd`}
    color={
      numOfCharacters > maxCharacters ? 'negative' : 'default'
    }>{`${numOfCharacters}/${maxCharacters}`}</Paragraph>
)
