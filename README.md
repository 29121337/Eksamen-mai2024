# Eksamen-mai2024
Jeg tenker å lage:
3 sider: index.html (linker: se detaljer, legg til i favoritter), details.html, secretlist.html
For å komme seg inn på secretlist.html må brukeren registrere eller logge seg på. Innholdet på secretlist skal vise alle burger de selv har valgt å legge til i den listen. Skal kunne slette burger fra listen.

Gjenstår å lage:
1. Funksjonalitet av details siden (plukke id fra url som kommer fra index.html for å vise en spesifikk burger)
2. Styling og funksjonalitet av påloggingsside/pop up med tilknytning til db (bruk backend tjenester som https://crudapi.co.uk/ eller bygge egen backend med local SqlLite)
3. Styling og funksjonalitet av secretlist
4. Strukturere script.js filen at den er smud og lesbart
5. Vise frem flere crud metoder? (gjør jeg kanskje det ved opprettelse og sletting av bruker?)


_______________________________________________________

Hva det legges vekt på:
Autentisering av bruker for å kunne håndtere bruker spesifikt data.
• Fremvisning, filtrering/sortering av objekter fra API
• Lagre data til persistent backend lagring 
• Lagre session data i localStorage
• Sletting fra persistent lagring skal også slettes fra localStorage
• Redigering og oppdatering av objekter som skal lagres i localStorage eller/og persistent
lagring hensiktsmessig.

_______________________________________

Utfordringer
1. Får ikke vist ikonet (<i class="bi bi-arrow-through-heart-fill"></i>) i index.html, selvom jeg har lagt inn bootstrap stylesheet. 
2. Får ikke vist bilde fra APIet. (<img src="${burger.images[0].lg}" alt="juicy bilde av ${burger.name} "> i script.js)



