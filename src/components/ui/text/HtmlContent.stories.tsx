import {Meta, StoryFn} from '@storybook/react-native-web-vite'
import {HtmlContent} from './HtmlContent'

export default {
  component: HtmlContent,
} satisfies Meta<typeof HtmlContent>

export const Default: StoryFn<typeof HtmlContent> = args => (
  <HtmlContent {...args} />
)
Default.args = {
  content:
    '<div><h3>Bullebak (brug 149)</h3><p>De Bullebak verbindt de Marnixstraat met de Korte Marnixstraat, richting het Haarlemmerplein. De brug kende al lange tijd problemen met openen en sluiten. In de zomer 2018 sprong hij zelfs ineens open. We vervangen nu de monumentale brug helemaal. Dit is een ingewikkelde klus, omdat de brug is ingeklemd tussen kwetsbare kademuren en omgeven door kabels en leidingen. De Bullebak is tijdens de werkzaamheden afgesloten voor trams, bussen en auto’s. Alleen fietsers, voetgangers en de brandweer houden hun doorgang via een tijdelijke hulpbrug. De vervanging van de bruggen is onderdeel van het <a itemtype="1" pagetype="subhome" class="siteLink ptsubhome" resolved="true" href="https://www.amsterdam.nl/projecten/binnenring/">project Binnenring.</a></p><h3 id="h64925969-e5f8-414b-a613-aba46afae0d1">Wanneer</h3><p>De werkzaamheden zijn 12 augustus 2020 gestart en duren tot juni 2023.</p></div>',
  isIntro: false,
}
