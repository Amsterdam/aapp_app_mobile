import {skipToken} from '@reduxjs/toolkit/query'
import React from 'react'
import type {NavigationProps} from '@/app/navigation/types'
import type {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Screen} from '@/components/features/screen/Screen'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {WasteFractionIcon} from '@/modules/waste-guide/components/WasteFractionIcon'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {useGetWasteGuideSortingGuideDetailsQuery} from '@/modules/waste-guide/service'
import {sortingGuideMockData} from '@/modules/waste-guide/sortingGuideMockData'
import {FractionCode} from '@/modules/waste-guide/types'

type Props = NavigationProps<
  typeof WasteGuideRouteName.wasteGuideSortingGuideDetails
>

export const WasteGuideSortingGuideDetailsScreen = ({
  navigation: {navigate},
}: Props) => {
  const searchText = ''
  const hasSearchText = Boolean(searchText)

  const {
    data: d,
    isError,
    isLoading,
  } = useGetWasteGuideSortingGuideDetailsQuery(
    hasSearchText
      ? {
          text: searchText,
        }
      : skipToken,
  )

  console.log('data:', d, isError, isLoading)

  const item = sortingGuideMockData.result[0]

  return (
    <Screen testID="WasteGuideSortingGuideScreen">
      <Column>
        <LazyImage
          aspectRatio="wide"
          fallbackInheritsAspectRatio={false}
          openInImageViewer
          source={{uri: item.image}}
          testID="ConstructionWorkProjectImage"
        />
        <Box
          insetHorizontal="md"
          insetVertical="smd">
          {!!item && (
            <Column gutter="xl">
              <Column gutter="md">
                <Title text={item.name} />
                <Phrase>Dit kan je wegdoen bij:</Phrase>

                <Column gutter="sm">
                  {item.fractions?.map(fraction => (
                    <NavigationButton
                      chevronColor={
                        fraction === FractionCode.DropOffPoint
                          ? 'inverse'
                          : undefined
                      }
                      chevronSize="ml"
                      description={''}
                      Icon={<WasteFractionIcon fractionCode={fraction} />}
                      insetHorizontal="no"
                      insetVertical="no"
                      isDescriptionBelowIcon={false}
                      key={fraction}
                      onPress={() => {
                        if (fraction === FractionCode.DropOffPoint) {
                        } else if (fraction === FractionCode.RecyclingCentre) {
                          navigate(WasteGuideRouteName.wasteGuideRecyclePoints)
                        } else {
                          navigate(WasteGuideRouteName.wasteGuideFraction, {
                            fractionCode: fraction,
                          })
                        }
                      }}
                      testID={`WasteGuide${fraction ?? ''}FractionNavigationButton`}
                      title={fraction}
                    />
                  ))}
                </Column>
                <Paragraph>
                  Gaat het om een beperkte hoeveelheid groente-, fruit- en
                  tuinafval? Dan kun je het kwijt in de gft-container. Voor veel
                  afval ga je naar de milieustraat.
                </Paragraph>
              </Column>
              {!!item.reason && (
                <Column gutter="md">
                  <Title
                    level="h3"
                    text="Meer over dit advies"
                  />
                  <HtmlContent
                    content={item.reason}
                    testID="WasteGuideSortingGuideDetailsReasonBody"
                  />
                </Column>
              )}
            </Column>
          )}
        </Box>
      </Column>
    </Screen>
  )
}
