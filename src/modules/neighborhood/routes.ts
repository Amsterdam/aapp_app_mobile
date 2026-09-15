export enum NeighborhoodRouteName {
  addBoardItem = 'NeighborhoodAddBoardItem',
  addBoardItemImage = 'NeighborhoodAddBoardItemImage',
  board = 'NeighborhoodBoard',
  overview = 'NeighborhoodOverview',
}

export type ModuleStackParams = {
  [NeighborhoodRouteName.overview]: undefined
  [NeighborhoodRouteName.board]: undefined
  [NeighborhoodRouteName.addBoardItemImage]: undefined
  [NeighborhoodRouteName.addBoardItem]: {image_set_id: string}
}
