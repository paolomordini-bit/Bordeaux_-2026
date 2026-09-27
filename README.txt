BORDEAUX & MÉDOC 2026 — v6.2 EXTERNAL LINKS FIX

Questa versione corregge il problema per cui, dalla PWA installata su iPhone,
premendo “Maps” non succedeva nulla.

CORREZIONI TECNICHE
- Rimosso target="_blank" da tutti i link Google Maps.
- I link Maps ora aprono una navigazione diretta nello stesso contesto.
- Il service worker NON intercetta più richieste verso domini esterni.
- Google Maps viene quindi lasciato gestire direttamente a Safari/iOS.
- Tutti i percorsi api=1 della v6.1 sono mantenuti.

PER AGGIORNARE
1. Carica tutti i file di questo ZIP nella root del repository.
2. Sovrascrivi index.html e sw.js.
3. Attendi il deploy GitHub Pages.
4. IMPORTANTE su iPhone: elimina la PWA dalla Home e aggiungila di nuovo da Safari,
   così viene eliminato il vecchio service worker/cache.
