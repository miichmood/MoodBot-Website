# MoodBot Website

Landing page statica di MoodBot, realizzata con React + TypeScript + Vite + Tailwind CSS.

Questa copia e stata ripulita e preparata per la pubblicazione automatica su GitHub Pages.

## Pubblicazione su GitHub Pages

1. Crea un nuovo repository GitHub, ad esempio `MoodBot-Website`.
2. Carica **il contenuto di questa cartella** nella root del repository.
3. Verifica che il branch predefinito si chiami `main`.
4. In GitHub apri **Settings -> Pages**.
5. In **Build and deployment -> Source** scegli **GitHub Actions**.
6. Apri la scheda **Actions**: il workflow `Deploy to GitHub Pages` partira automaticamente a ogni push su `main`.

La configurazione Vite usa percorsi relativi (`base: "./"`), quindi il sito funziona sia come progetto GitHub Pages (`https://utente.github.io/repository/`) sia dietro un dominio personalizzato senza modificare i path degli asset.

## Sviluppo locale

Richiede Node.js 20 o superiore.

```bash
npm ci
npm run dev
```

Controlli prima di una pubblicazione:

```bash
npm run typecheck
npm run build
```

## Sicurezza

- Nessun backend e nessuna chiave API sono richiesti.
- Il codice dell'app non contiene `fetch`, WebSocket, XMLHttpRequest, accesso a cookie, storage, clipboard, geolocalizzazione o esecuzione dinamica di codice.
- Il server Vite non viene esposto su `0.0.0.0`.
- Una Content Security Policy limita gli asset e impedisce connessioni applicative verso host esterni non previsti.
- Le dipendenze npm inutilizzate presenti nel progetto originale sono state eliminate.
- Le GitHub Actions sono fissate a commit SHA specifici.
- Dependabot controlla settimanalmente dipendenze npm e GitHub Actions.

Le sole risorse esterne caricate automaticamente dal browser sono i font di Google Fonts e i media pubblici di MoodBot su `raw.githubusercontent.com`. I link a GitHub, Telegram ed e-mail richiedono un'azione esplicita dell'utente.

Vedi anche [SECURITY-AUDIT.md](SECURITY-AUDIT.md).
