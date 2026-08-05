import {REVIEWER_USERNAMES, REVIEWED_STATES} from '../constants.mts'
import {getReviews} from './getReviews.mts'

export const hasTeamReview = (
  reviews: Awaited<ReturnType<typeof getReviews>>,
): boolean =>
  reviews.some(
    review =>
      REVIEWER_USERNAMES.has(review.user?.login ?? '') &&
      REVIEWED_STATES.has(review.state),
  )