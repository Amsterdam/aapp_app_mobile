import {RedirectKey} from '@/modules/redirects/exports/RedirectKey'

type Link = {
  label: string
  urlKey: RedirectKey
}

type AppointmentSubject = {
  links?: Link[]
  requiresPhoneCall?: boolean
  text?: string
  title: string
}

export const appointmentSubjects: AppointmentSubject[] = [
  {
    text: 'Voor een paspoort, ID-kaart of rijbewijs kunt u zonder afspraak langskomen bij onze Stadsloketten.',
    title: 'Paspoort, ID-kaart of rijbewijs',
  },
  {
    links: [
      {
        label: 'Immigratie',
        urlKey: RedirectKey.immigration,
      },
      {
        label: 'Naturalisatie',
        urlKey: RedirectKey.naturalisation,
      },
    ],
    requiresPhoneCall: true,
    title: 'Immigratie en Nederlander worden',
  },
  {
    links: [
      {
        label: 'Geboorteaangifte',
        urlKey: RedirectKey.birth,
      },
      {
        label: 'Een kind erkennen',
        urlKey: RedirectKey.acknowledgeChild,
      },
      {
        label: 'Levenloos geboren kindje registreren (pasgeboren)',
        urlKey: RedirectKey.lifelessBirth,
      },
    ],
    title: 'Geboorte en erkenning',
  },
  {
    links: [
      {
        label: 'Trouwen en partnerschap',
        urlKey: RedirectKey.marriage,
      },
      {
        label: 'Verklaring van huwelijksbevoegdheid',
        urlKey: RedirectKey.marriagePermission,
      },
    ],
    title: 'Huwelijk en geregistreerd partnerschap',
  },
  {
    links: [
      {
        label: 'Aangifte van overlijden voor uitvaartondernemers',
        urlKey: RedirectKey.passingForFuneralDirectors,
      },
      {
        label: 'Aangifte doen van overlijden',
        urlKey: RedirectKey.passing,
      },
    ],
    title: 'Overlijden',
  },
  {
    requiresPhoneCall: true,
    title: 'Buitenlandse akten inleveren (brondocumenten)',
  },
]
