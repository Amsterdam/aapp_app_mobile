export const zTokens = {
  articleOverviewYear: 1,
  articlePreviewLine: -1,
  bottomSheet: 5,
  carouselSlideBackgroundImageContainer: -1,
  carouselSlideContent: 1,
  overlay: 3,
  productTourTooltipWrapperParent: 1, // this should be lower than the value for `tooltip`, set this on a view higher in the component tree to prevent z index issues
  skeleton: 3,
  progressStepConnector: -1,
  tooltip: 4,
  noInternetBanner: 5,
}

export type ZTokens = typeof zTokens
