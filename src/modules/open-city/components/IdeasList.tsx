import {FlatList} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import ProjectWarningFallbackImage from '@/modules/construction-work/assets/images/project-warning-fallback.svg'

const LIST = [
  {id: 1, title: 'In- en uitrit parkeergarage De IJtoren'},
  {
    id: 2,
    title:
      'in- en uitrijden parkeergarage (Bogortuin op Azartplein/Verbindingsdam)',
  },
  {id: 3, title: 'Risico conflict fiets tram'},
  {id: 4, title: 'In- en uitrit parkeergarage De IJtoren'},
  {
    id: 5,
    title:
      'in- en uitrijden parkeergarage (Bogortuin op Azartplein/Verbindingsdam)',
  },
  {id: 6, title: 'Risico conflict fiets tram'},
  {id: 7, title: 'In- en uitrit parkeergarage De IJtoren'},
]

export const OpenCityIdeasList = () => {
  const styles = createStyles()

  return (
    <FlatList
      data={LIST}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <Box insetVertical="md">
          <Row gutter="md">
            <ProjectWarningFallbackImage style={styles.image} />
            <Title
              level="h5"
              text={item.title}
            />
          </Row>
        </Box>
      )}
    />
  )
}

const createStyles = () => ({
  image: {
    backgroundColor: 'lightgray',
    width: 100,
    height: 100,
  },
})
