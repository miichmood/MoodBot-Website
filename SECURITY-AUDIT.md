# Security audit - BotLandingPage.zip

Data verifica: 2026-08-16

SHA-256 archivio originale:

```text
0e5a40249968b04243649c83b7864f0d0eb2fb2c543f429ea7203aa785dadad2
```

## Verifiche eseguite sull'archivio originale

- Ispezione del contenuto ZIP senza avviare il progetto.
- Controllo di path traversal e link simbolici: non rilevati.
- Inventario dei tipi di file: solo sorgenti web, configurazioni, file Git e build statica; nessun EXE, DLL, APK, BAT, CMD, PowerShell o altro eseguibile applicativo.
- Controllo dei Git hook: presenti solo i normali file `*.sample`; nessun hook attivo.
- Controllo della configurazione Git: nessun remote configurato.
- Controllo completo della cronologia Git: due commit; nessun oggetto Git irraggiungibile o contenuto extra nascosto nella storia.
- Ricerca di credenziali e segreti comuni: nessuna chiave privata, token GitHub/Telegram, API key, password o access token rilevati.
- Ricerca nel sorgente di primitive sensibili: nessun `fetch`, XMLHttpRequest, WebSocket, EventSource, `eval`, `new Function`, cookie, local/session storage, IndexedDB, clipboard, geolocalizzazione, credential API, service worker o esecuzione di comandi di sistema.
- Controllo degli URL nel sorgente: GitHub/Raw GitHub di MoodBot, Telegram, Google Fonts e mailto.
- Controllo degli script npm di primo livello: solo `vite`, `vite build` e `tsc --noEmit`.

Il bundle `dist` originale contiene un uso di `fetch` proveniente dal polyfill `modulepreload` generato da Vite e `postMessage` proveniente dallo scheduler di React. Non sono chiamate di rete applicative aggiunte dal progetto.

## Modifiche di hardening applicate

1. Rimossa integralmente la cartella `.git` ricevuta, in modo da non pubblicare metadati e cronologia del workspace Qwen nel nuovo repository.
2. Rimossa la cartella `dist` originale: GitHub Actions genera una build nuova dal sorgente verificato.
3. Eliminata la configurazione Vite `host: "0.0.0.0"`, che esponeva il dev server sulla rete locale.
4. Impostato `base: "./"` per un deploy portabile su GitHub Pages e dominio personalizzato.
5. Eliminati tutti i pacchetti npm non usati dal codice, inclusi Supabase, dnd-kit, recharts, react-router, framer-motion, uuid, canvas-confetti, date-fns e lucide-react.
6. Ridotte le dipendenze runtime a `react` e `react-dom`; le altre dipendenze rimaste servono esclusivamente alla compilazione.
7. Verificato che ogni pacchetto con `resolved` nel lockfile finale punta a `registry.npmjs.org` e possiede un hash `integrity`.
8. Aggiunta una Content Security Policy e `Referrer-Policy: no-referrer` tramite meta tag.
9. Aggiunto workflow GitHub Pages con permessi minimi e GitHub Actions fissate a commit SHA.
10. Aggiunto Dependabot per npm e GitHub Actions.

## Dipendenze con lifecycle script nel lockfile finale

Nel lockfile finale risultano due pacchetti con install script:

- `esbuild` - dipendenza di build di Vite.
- `fsevents` - dipendenza opzionale per macOS; non viene installata sui runner Linux di GitHub Pages.

Non sono presenti script `preinstall`, `install` o `postinstall` definiti dal progetto MoodBot stesso.

## Verifica vulnerabilita Vite

Il lockfile usa Vite `6.4.3`. Le advisory GitHub verificate il 2026-08-16 indicano che:

- CVE-2026-39363 e CVE-2026-39365 sono corrette nella linea Vite 6 a partire da `6.4.2`.
- CVE-2026-53571 e corretta nella linea Vite 6 in `6.4.3`.

Inoltre, la configurazione finale non espone il dev server sulla rete.

## Limiti della verifica

Questa e una verifica statica/manuale del contenuto ricevuto e della relativa supply chain dichiarata. Non e stato caricato il file su servizi antivirus esterni. Nell'ambiente di analisi non era disponibile un motore ClamAV e l'endpoint `npm audit` non era raggiungibile, quindi non e stato possibile allegare un report antivirus o `npm audit` live.

Non sono stati rilevati indicatori di comportamento malevolo nel codice ricevuto. Come per qualsiasi progetto npm, future modifiche alle dipendenze devono essere riesaminate; per questo la configurazione finale include Dependabot e un lockfile con versioni/integrity fissati.
