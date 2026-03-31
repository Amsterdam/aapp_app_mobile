export enum SportEndpointName {
  locationActivities = 'locationActivities',
  locationSchedule = 'locationSchedule',
  sportLocations = 'sportLocations',
}

export type SportLocationsResponse = {
  aantalHallen: null
  adres: string
  'detail-name': string
  emailadres: string
  exploitant: string
  gebiedsgerichtwerkengebied: string
  geometry: {
    coordinates: [number, number]
    type: 'Point'
  }
  id: number
  naam: string
  plaats: string
  postcode: string
  stadsdeel: string
  telefoonnummer: string
  type: 'Zwembad'
  vastgoedeigenaar: string
  verhuuradministratie: string
  website: string
}[]
