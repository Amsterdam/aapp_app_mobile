import {useCallback} from 'react'
import simplur from 'simplur'
import {ProductTourTipWrapper} from '@/components/features/product-tour/ProductTourTipWrapper'
import {Tip, TipText} from '@/components/features/product-tour/types'
import {FollowButton} from '@/components/ui/buttons/FollowButton'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Placement} from '@/components/ui/types'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {
  useProjectFollowMutation,
  useProjectUnfollowMutation,
} from '@/modules/construction-work/service'
import {PiwikDimension} from '@/processes/piwik/types'
import {zTokens} from '@/themes/tokens/z'
import {Permissions} from '@/types/permissions'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  followers: number
  isFetchingProject: boolean
  isProjectFollowed: boolean
  projectId: number
  projectTitle: string
}

export const ProjectFollow = ({
  followers,
  isFetchingProject,
  isProjectFollowed,
  projectId,
  projectTitle,
}: Props) => {
  const [followProject, {isError: isFollowError, isLoading: isUpdatingFollow}] =
    useProjectFollowMutation()
  const [
    unfollowProject,
    {isError: isUnfollowError, isLoading: isUpdatingUnfollow},
  ] = useProjectUnfollowMutation()
  const followersPhrase = simplur`${[followers]} volger[|s]`
  const {registerDeviceIfPermitted} = useRegisterDevice()
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
    Permissions.notifications,
  )

  const onPressFollowButton = useCallback(
    (isFollowed: boolean) => {
      if (isFollowed) {
        void unfollowProject({id: projectId})

        return
      }

      void followProject({id: projectId})
        .unwrap()
        .then(() => {
          void registerDeviceIfPermitted(true).then(hasPermission => {
            if (!hasPermission) {
              navigateToInstructionsScreen()
            }
          })
        })
    },
    [
      followProject,
      navigateToInstructionsScreen,
      projectId,
      registerDeviceIfPermitted,
      unfollowProject,
    ],
  )

  return (
    <Column
      gutter="md"
      zIndex={zTokens.productTourTooltipWrapperParent}>
      {!!(isFollowError || isUnfollowError) && (
        <SomethingWentWrong
          hasIcon
          retryFn={() => onPressFollowButton(isProjectFollowed)}
          testID="ConstructionWorkProjectArticlesSomethingWentWrong"
          text={`Het ${isUnfollowError ? 'ont' : ''}volgen is niet gelukt, probeer het later nog eens.`}
          title=""
        />
      )}
      <Row gutter="md">
        <ProductTourTipWrapper
          extraSpace="md"
          placement={Placement.below}
          testID="ConstructionWorkProjectFollowButtonTooltip"
          tipSlug={Tip.constructionWorkProjectFollowButton}>
          <FollowButton
            accessibilityHint={TipText.constructionWorkProjectFollowButton}
            accessibilityLabel={
              isProjectFollowed ? 'Ontvolg dit project' : 'Volg dit project'
            }
            disabled={
              isUpdatingFollow || isUpdatingUnfollow || isFetchingProject
            }
            followed={isProjectFollowed}
            isLoading={
              isUpdatingFollow || isUpdatingUnfollow || isFetchingProject
            }
            logDimensions={{
              [PiwikDimension.contentId]: projectId.toString(),
              [PiwikDimension.contentTitle]: projectTitle,
            }}
            logName={`ConstructionWorkProject${isProjectFollowed ? 'Unfollow' : 'Follow'}Button`}
            onPress={onPressFollowButton}
            testID={`ConstructionWorkProject${isProjectFollowed ? 'Unfollow' : 'Follow'}Button`}
          />
        </ProductTourTipWrapper>
        <SingleSelectable
          accessibilityLabel={accessibleText(
            followers.toString(),
            followersPhrase,
          )}>
          <Phrase
            testID="ConstructionWorkProjectFollowersText"
            variant="small">
            <Phrase
              emphasis="strong"
              testID="ConstructionWorkProjectFollowersNumber"
              variant="small">
              {`${followers} `}
            </Phrase>
            {followersPhrase}
          </Phrase>
        </SingleSelectable>
      </Row>
    </Column>
  )
}
