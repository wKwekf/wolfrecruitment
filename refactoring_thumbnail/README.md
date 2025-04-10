# Thumbnail Refactoring Projekt

## Projektübersicht
Dieses Dokument dient als zentrale Anlaufstelle für das Refactoring der Thumbnail-Funktionalität im Homepage-Projekt.

## Aktuelle Probleme
- [x] Veraltetes Thumbnail wird für Links zur Startseite (z.B. `wolfai.de/?section=video`) in sozialen Medien (z.B. LinkedIn) angezeigt.
  - Die URL `?section=video` dient nur der internen Seitennavigation (Scrollen).
  - Es ist kein spezifisches Open Graph (OG) Bild für diese URL oder die Startseite definiert.
  - Externe Plattformen greifen auf das globale OG-Bild (`/public/Logo_Wolf_Preview.png`) zurück, das in `app/layout.tsx` definiert ist.
  - **Ursache:**
    - Die Datei `/public/Logo_Wolf_Preview.png` enthält das alte Thumbnail.
    - ODER: Externe Plattformen haben das alte Thumbnail für `wolfai.de` gecached.

- [x] **Update:** Veraltetes Thumbnail (`/videos/Thumbnail/BayernLB_Thumbnail.png`) wird für Links zur spezifischen BayernLB-Fallstudie (`wolfai.de/case-studies/bayernlb`) auf LinkedIn angezeigt.
  - **Ursache:** Die Seite `app/(sides)/case-studies/bayernlb/page.tsx` definiert **kein eigenes `og:image`**.
  - LinkedIn wählt wahrscheinlich automatisch das `poster`-Attribut des Video-Elements (`/videos/Thumbnail/BayernLB_Thumbnail.png`) als Vorschau.

## Geplante Änderungen
- [ ] Liste der geplanten Refactoring-Maßnahmen

## Technische Details
- [ ] Abhängigkeiten
- [ ] Betroffene Komponenten
- [ ] API-Änderungen

## Zeitplan
- [ ] Meilensteine
- [ ] Deadlines

## Notizen
- Analyse durchgeführt am 10.04.2025.

- **Problem 1 (Link zur Startseite):** 
  - Ursache: Globales `og:image` (`/public/Logo_Wolf_Preview.png`) ist veraltet oder extern gecached.
  - Lösung: `Logo_Wolf_Preview.png` aktualisieren UND/ODER Cache extern leeren.
- **Problem 2 (Link zur BayernLB-Fallstudie):**
  - Ursache: Fehlendes spezifisches `og:image` für `bayernlb/page.tsx`; LinkedIn greift auf Video-`poster` (`/videos/Thumbnail/BayernLB_Thumbnail.png`) zurück, welches veraltet ist.
  - Lösung: Spezifisches `og:image` für die Fallstudien-Seite definieren UND/ODER das `poster`-Bild (`BayernLB_Thumbnail.png`) aktualisieren UND/ODER Cache extern leeren.
- Hier können wir wichtige Notizen und Entscheidungen während des Refactoring-Prozesses sammeln 