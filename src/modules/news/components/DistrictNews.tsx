import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {ContextSwitchButton} from '@/components/ui/buttons/ContextSwitchButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {NewsletterSignup} from '@/modules/contact/components/NewsletterSignup'
import {NewsList} from '@/modules/news/components/NewsList'
import {useSelectedDistrict} from '@/modules/news/hooks/useSelectedDistrict'

export const DistrictNews = () => {
  const {district} = useSelectedDistrict()

  const {open} = useBottomSheet()

  return (
    <NewsList
      district={district.label}
      footerComponent={
        <Box
          insetBottom="xl"
          insetTop="md">
          <NewsletterSignup variant="news" />
        </Box>
      }
      headerComponent={
        <Box
          insetHorizontal="md"
          insetVertical="lg">
          <Column
            gutter="sm"
            halign="start">
            <Title
              level="h1"
              text={`${district.name}`}
            />
            <ContextSwitchButton
              label="Kies een ander stadsdeel"
              noPadding
              onPress={() => open()}
              testID="NewsDistrictContextSwitchButton"
            />
          </Column>
        </Box>
      }
      type="district"
    />
  )
}
