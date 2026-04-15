import {ComponentType, useMemo} from 'react'
import {SectionList} from 'react-native'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingSessionListRenderItem} from '@/modules/parking/components/sessionsList/ParkingSessionListRenderItem'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {
  ParkingSessionOrDummy,
  ParkingSessionStatus,
} from '@/modules/parking/types'
import {
  dummyTitle,
  groupParkingSessionsByDate,
} from '@/modules/parking/utils/groupParkingSessionsByDate'

type Props = {
  ListEmptyComponent?: ComponentType
  ListHeaderComponent?: ComponentType
  sortAscending?: boolean
  status: ParkingSessionStatus
}

export const ParkingSessionsListVisitor = ({
  ListEmptyComponent,
  ListHeaderComponent,
  sortAscending = false,
  status,
}: Props) => {
  const {parkingSessions, isLoading} = useGetParkingSessions(status)
  const sections = useMemo(
    () =>
      groupParkingSessionsByDate<ParkingSessionOrDummy>(
        parkingSessions,
        sortAscending,
      ),
    [parkingSessions, sortAscending],
  )

  return (
    <SectionList
      ListEmptyComponent={isLoading ? null : ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({item}) => <ParkingSessionListRenderItem item={item} />}
      renderSectionFooter={() => <Gutter height="md" />}
      renderSectionHeader={({section}) => (
        <Box insetHorizontal="md">
          <Border
            key={section.title}
            top>
            <Gutter height="md" />
            <Phrase
              emphasis="strong"
              testID="ParkingPlannedSessionDatePhrase">
              {section.title === dummyTitle ? ' ' : section.title}
            </Phrase>
          </Border>
        </Box>
      )}
      sections={sections}
      stickySectionHeadersEnabled={false}
    />
  )
}
