import {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import type {NavigationProps} from '@/app/navigation/types'
import type {OpenCityRouteName} from '@/modules/open-city/routes'
import type {Theme} from '@/themes/themes'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Image} from '@/components/ui/media/Image'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useThemable} from '@/themes/useThemable'

type Props = NavigationProps<OpenCityRouteName.detail>

type Idea = {
  description: string
  id: string
  imageUri?: string
  likes: number
  tags: string[]
  title: string
}

const ideas: Idea[] = [
  {
    id: '1234',
    imageUri: undefined,
    title:
      'In- en uitrijden parkeergarage (Bogortuin op Azartplein/Verbindingsdam)',
    description:
      "Zorg: Auto's die de parkeergarage in en uit moeten rijden; bij verwachte hoeveelheid fietsers en voetgangers wordt dit lastig en gevaarlijk. Hiervoor moet voldoende ruimte blijven. Fietsers en voetgangers moeten in ieder geval ook aan oostkant van de Verbindingsdam en Azartplein kunnen rijden/lopen, niet alleen aan westkant (voor garage-ingang langs). Voorkeur voor sturen van fietsers naar route over Sumatrakade (deze fietsvriendelijk maken). Dit is ook voor belasting van verdere traject met diverse knelpunten (kruispunten) richting stad gunstig. Graag aandacht voor dit gevaarlijke punt en de leefbaarheid voor degenen die de garage moeten gebruiken.",
    tags: ['Online', 'Routes/verkeer', 'Zorg'],
    likes: 20,
  },
  {
    id: '2345',
    imageUri: undefined,
    title: 'Risico conflict fiets tram',
    description:
      'Conflict snelle fietsers vanaf de brug en tram (overigens ook bus of auto).',
    tags: ['Online', 'Routes/verkeer', 'Zorg'],
    likes: 1,
  },
]

export const OpenCityDetailScreen = ({route}: Props) => {
  useSetScreenTitle(route.params.id)

  const idea = ideas.find(({id}) => id === route.params.id)

  return (
    <Screen
      scroll={true}
      testID="OpenCityDetailScreen">
      <Box>
        {!idea ? (
          <SomethingWentWrong testID="OpenCityDetailScreenSomethingWentWrong" />
        ) : (
          <Details idea={idea} />
        )}
      </Box>
    </Screen>
  )
}

const Details = ({idea}: {idea: Idea}) => {
  const styles = useThemable(createStyles)
  const [likes, setLikes] = useState(idea.likes)

  return (
    <Column gutter="md">
      <View style={styles.imageContainer}>
        {idea.imageUri ? (
          <Image
            aspectRatio="wide"
            source={{uri: idea.imageUri}}
          />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <Title text={idea.title} />
      <Button
        alignSelf="flex-start"
        iconName="collaborate"
        label={`Likes ${likes}`}
        onPress={() => setLikes(p => p + 1)}
        testID="DetailsLikesButton"
      />
      <Paragraph>{idea.description}</Paragraph>
      <Row
        gutter="md"
        wrap>
        {idea.tags.map(tag => (
          <View
            key={tag}
            style={styles.tag}>
            <Phrase emphasis="strong">{tag}</Phrase>
          </View>
        ))}
      </Row>
    </Column>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    imageContainer: {
      height: 200,
      width: '100%',
    },
    placeholder: {
      flex: 1,
      backgroundColor: theme.color.skeleton.background,
    },
    tag: {
      paddingVertical: theme.size.spacing.sm,
      paddingHorizontal: theme.size.spacing.md,
      backgroundColor:
        theme.color.burningGuide.recommendationTag.Geel.background,
    },
  })
