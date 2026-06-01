import {Screen} from '@/components/features/screen/Screen'
import {Tabs} from '@/components/ui/Tabs'
import {AllNews} from '@/modules/news/components/AllNews'
import {DistrictNews} from '@/modules/news/components/DistrictNews'
import {NewsDashboardHighlightedArticle} from '@/modules/news/components/NewsDashboardHighlightedArticle'
import {SelectDistrictBottomSheet} from '@/modules/news/components/SelectDistrictBottomSheet'

export const NewsDashboardScreen = () => (
  <Screen
    bottomSheet={<SelectDistrictBottomSheet />}
    scroll={false}
    testID="NewsDashboardScreen">
    <Tabs testID="NewsDashboardTabs">
      <Tabs.Tab label="Nieuws">
        <NewsDashboardHighlightedArticle />

        <AllNews />
      </Tabs.Tab>
      <Tabs.Tab
        accessibilityLabel="Stadsdeel nieuws"
        label="Stadsdeel">
        <DistrictNews />
      </Tabs.Tab>
    </Tabs>
  </Screen>
)
