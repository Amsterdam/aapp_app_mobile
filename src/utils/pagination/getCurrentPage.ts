/**
 * Get the current page number based on the viewable item index, items per row, and page size.
 *
 * @param viewableItemIndex - The index of the currently viewable item.
 * @param itemsPerRow - The number of items displayed per row.
 * @param pageSize - The number of items per page.
 * @returns The current page number (1-based).
 */
export const getCurrentPage = (
  viewableItemIndex: number | undefined,
  itemsPerRow: number,
  pageSize: number,
) => Math.floor(((viewableItemIndex ?? 0) * itemsPerRow + 1) / pageSize) + 1
