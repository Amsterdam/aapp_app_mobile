import {REVIEWED_STATES} from './constants.mts'
import {getReviews} from './getReviews.mts'
import type {PackageConfig} from './config.mts'

export const hasTeamReview = (
  reviews: Awaited<ReturnType<typeof getReviews>>,
  config: Required<PackageConfig>,
): boolean =>
  reviews.some(
    review =>
      config.reviewerUsernames.includes(review.user?.login ?? '') &&
      REVIEWED_STATES.has(review.state),
  )
