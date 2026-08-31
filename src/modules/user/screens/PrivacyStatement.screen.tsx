import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {List} from '@/components/ui/text/list/List'

export const PrivacyStatementScreen = () => (
  <Screen testID="AboutPrivacyStatementScreen">
    <Box>
      <Column gutter="lg">
        <Column gutter="md">
          <Title
            testID="AboutPrivacyStatementTitle"
            text="Privacyverklaring Amsterdam App"
          />
          <Paragraph
            testID="AboutPrivacyStatementIntroParagraph"
            variant="intro">
            De gemeente verzamelt en gebruikt verschillende categorieën
            persoonsgegevens van haar inwoners. Het zal afhangen van de
            specifieke verwerking welke persoonsgegevens precies zullen worden
            verwerkt en voor welk doel. Deze en overige relevante informatie
            worden hieronder weergegeven.
          </Paragraph>
        </Column>
        <Column gutter="md">
          <Title
            level="h2"
            testID="AboutPrivacyStatementGoalTitle"
            text="Doel"
          />
          <Paragraph testID="AboutPrivacyStatementGoalParagraph">
            De Amsterdam App is er om de dienstverlening aan de Amsterdammer
            persoonlijk, eenvoudig en toegankelijk aan te bieden. Om deze mate
            van dienstverlening te kunnen bieden verwerkt de gemeente
            persoonsgegevens van de Amsterdammer voor:
          </Paragraph>
          <List
            items={[
              'Het kunnen tonen van informatie op basis van locatie.',
              'Het kunnen volgen van werkzaamheden.',
              'Het kunnen versturen van push-notificaties.',
              'Het kunnen tonen van Stadspasinformatie ',
              'Het kunnen openen van GFTE-containers met toegangssysteem.',
              'Het kunnen aanmelden van parkeersessies.',
            ]}
            testID="AboutPrivacyStatementGoalList"
          />
        </Column>
        <Column gutter="md">
          <Title
            level="h2"
            testID="AboutPrivacyStatementBasisTitle"
            text="Grondslag"
          />
          <Paragraph testID="AboutPrivacyStatementBasisParagraph">
            De gemeente verwerkt deze persoonsgegevens op basis van toestemming.
            Het intrekken van deze toestemming kan in de instellingen van het
            telefoontoestel gedaan worden.
          </Paragraph>
        </Column>
        <Column gutter="md">
          <Title
            level="h2"
            testID="AboutPrivacyStatementPersonalDataTitle"
            text="Categorie persoongegevens"
          />
          <Paragraph testID="AboutPrivacyStatementPersonalDataParagraph">
            Voor het personaliseren van dienstverlening in de Amsterdam App
            gebruikt de gemeente de volgende categorieën persoonsgegevens:
          </Paragraph>
          <List
            items={[
              'GPS-coördinaten en/of adresgegevens',
              'Device ID',
              'Persoonlijke productinformatie',
              'Financiële gegevens (o.a. saldo stadspasbudget, transactiehistorie)',
              'Cliëntnummer Stadpashouder',
              'Stadspashouder naam',
              'Stadspasnummer',
              'BSN (de gebruiker logt eenmalig in met Digid om door middel van het BSN een cliëntnummer op te halen uit Zorgned. Het cliëntnummer wordt beveiligd opgeslagen, BSN wordt niet bewaard.)',
              'Kenteken',
            ]}
            testID="AboutPrivacyStatementPersonalDataList"
          />
        </Column>
        <Column gutter="md">
          <Title
            level="h2"
            testID="AboutPrivacyStatementSharedDataTitle"
            text="Geen ontvangers, geen doorgifte, geen profilering, geen geautomatiseerde besluitvorming"
          />
          <Paragraph testID="AboutPrivacyStatementSharedDataParagraph">
            De gemeente Amsterdam wisselt in het kader van het personaliseren
            van de dienstverlening geen persoonsgegevens uit met andere
            organisaties. De persoonsgegevens worden niet buiten de Europese
            Economische Ruimte (EER) verwerkt. Er worden geen profielen
            gebruikt. Er vindt geen geautomatiseerde besluitvorming plaats.
          </Paragraph>
        </Column>
        <Column gutter="md">
          <Title
            level="h2"
            testID="AboutPrivacyStatementRetentionPeriodsTitle"
            text="Bewaartermijnen"
          />
          <Paragraph testID="AboutPrivacyStatementRetentionPeriodsParagraph">
            Adresgegevens en/of GPS-coördinaten worden alleen op het
            telefoontoestel opgeslagen. De opslagtermijn van het device ID
            bedraagt 1 jaar. Deze termijn wordt gehanteerd om ervoor te zorgen
            dat wanneer de Amsterdam App wordt verwijderd en vervolgens weer
            wordt gedownload, de projecten die eerder werden gevolgd automatisch
            weer gevolgd worden.
          </Paragraph>
          <Paragraph>
            Voor het tonen van stadspasinformatie worden het cliëntnummer en de
            persoonlijke productdetails maximaal 1 jaar opgeslagen. De gebruiker
            heeft de mogelijkheid om op elk gewenst moment deze gegevens te
            verwijderen. Financiële Stadspasgegevens worden niet
            opgeslagen.{' '}
          </Paragraph>
        </Column>
      </Column>
    </Box>
  </Screen>
)
