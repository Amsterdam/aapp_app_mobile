export type NeighborhoodState = {
  boardItemFormValues?: NeighborhoodNoteRequest
}

export type NeighborhoodNoteRequest = {
  body: string
  contact_name: string
  contact_number: string
  image_set_id: 0
  lat: number
  lng: number
  title: string
}

export type NeighborhoodNote = {
  body: string
  contact_name: string
  contact_number: string
  created_at: string
  id: number
  lat: string
  lng: string
  title: string
}

export enum NeighborhoodEndpointName {
  getMyNeighborhoodNote = 'getMyNeighborhoodNotes',
  getNeighborhoodNotes = 'getNeighborhoodNotes',
  postNeighborhoodNotes = 'postNeighborhoodNotes',
  postNeighborhoodNotesImages = 'postNeighborhoodNotesImages',
}
