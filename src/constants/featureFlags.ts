export enum Features {}

/**
 * Features that are in this list will always show or hide base on this value.
 * If a feature is not listed here, it will only show in the development environment.
 */
export const featureFlags: Partial<Record<Features, boolean>> = {}
