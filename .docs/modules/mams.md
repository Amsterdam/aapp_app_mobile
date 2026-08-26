```mermaid
sequenceDiagram
	autonumber
	participant App as App
	participant Browser as Browser
	participant MijnAmsterdamFE as Mijn Amsterdam FE
	participant AppBE as App BE
	participant MijnAmsterdamBE as Mijn Amsterdam BE
	participant Database as Database

	App->>App: Maak random string (CodeVerifier) en sla op
	App->>App: Maak SHA-256 hash van CodeVerifier
	App->>Browser: Open Mijn Amsterdam FE met hash van CodeVerifier
	Browser->>MijnAmsterdamFE: Lever hash van CodeVerifier aan
	MijnAmsterdamFE->>MijnAmsterdamBE: Start DigiD flow met hash van CodeVerifier
	MijnAmsterdamBE->>MijnAmsterdamBE: Ontvang BSN en genereer authorizationcode
	MijnAmsterdamBE->>Database: Sla BSN + authorizationcode + hash van CodeVerifier op
	MijnAmsterdamBE-->>MijnAmsterdamFE: Geef success callback met authorizationcode terug
	MijnAmsterdamFE-->>Browser: Redirect naar app callback
	Browser-->>App: Open app met success callback en authorizationcode
	App->>AppBE: Vraag access token op met authorizationcode + CodeVerifier
	AppBE->>MijnAmsterdamBE: Wissel authorizationcode + CodeVerifier in voor access token
	MijnAmsterdamBE->>MijnAmsterdamBE: Hash CodeVerifier en vergelijk met opgeslagen hash
	MijnAmsterdamBE->>Database: Controleer authorizationcode, hash van CodeVerifier en haal BSN op
	Database-->>MijnAmsterdamBE: Gekoppelde BSN na succesvolle validatie
	MijnAmsterdamBE-->>AppBE: Stuur access token terug
	AppBE-->>App: Lever access token
```

stappen:

1. app maakt een random string (`CodeVerifier`) en slaat deze lokaal op
2. app maakt een SHA-256 hash van de `CodeVerifier` en opent Mijn Amsterdam in de browser met deze hash
3. Mijn Amsterdam FE ontvangt de hash en start de DigiD-flow
4. nadat Mijn Amsterdam BE het BSN van de gebruiker ontvangt, genereert het systeem een `authorizationcode` en slaat deze samen met het BSN en de gehashte `CodeVerifier` op in de database
5. Mijn Amsterdam opent de app opnieuw met een success callback die de `authorizationcode` bevat
6. app vraagt via de App BE een access token op met de combinatie van de `authorizationcode` en de niet-gehashte `CodeVerifier`
7. Mijn Amsterdam hasht de ontvangen `CodeVerifier`, vergelijkt deze met de opgeslagen hash in de database en valideert samen met de `authorizationcode` de aanvraag
8. na succesvolle validatie levert Mijn Amsterdam het access token terug aan de app
