# Typography Rules for Consistent Design

## Font Selection:

* **Einheitlichkeit:** Wir verwenden Figtree als primäre Schriftart für unsere gesamte Website.
* **Varianten:** Wir nutzen verschiedene Gewichte (400 normal, 600 semi-bold) und Größen, um Hierarchie und visuelle Unterscheidung zu schaffen.

## Heading Usage:

* **H1:** 56px Größe, 60px Zeilenhöhe (1.07), 600 Gewicht, -1% Buchstabenabstand
* **H2:** 36px Größe, 40px Zeilenhöhe (1.11), 600 Gewicht, -0.8% Buchstabenabstand
* **H3:** 28px Größe, 32px Zeilenhöhe (1.14), 600 Gewicht, -0.5% Buchstabenabstand
* **Hierarchie:** Überschriften sollten eine klare visuelle Hierarchie durch Größenabstufung bilden.

## Body Text Sizes:

* **Großer Fließtext:** 20px Größe, 28px Zeilenhöhe (1.4), 400 Gewicht
* **Standard-Fließtext:** 16px Größe, 24px Zeilenhöhe (1.5), 400 Gewicht
* **Kleiner Fließtext:** 14px Größe, 21px Zeilenhöhe (1.5), 400 Gewicht

## Line Height:

* **Überschriften (H1, H2, H3):** Zeilenhöhe von 1.07 bis 1.14 des Schriftgrads
    * H1: 56px/60px (1.07)
    * H2: 36px/40px (1.11)
    * H3: 28px/32px (1.14)
* **Fließtext:** Zeilenhöhe von 1.4 bis 1.5 des Schriftgrads
    * Großer Text: 20px/28px (1.4)
    * Standard-Text: 16px/24px (1.5)
    * Kleiner Text: 14px/21px (1.5)

## Letter Spacing:

* **Überschriften:** Leicht negativer Buchstabenabstand
    * H1: -1% (-0.56px bei 56px)
    * H2: -0.8% (-0.29px bei 36px)
    * H3: -0.5% (-0.14px bei 28px)
* **Fließtext:** Neutraler Buchstabenabstand (0)

## Text Alignment:

* **Lange Textblöcke (mehr als 3 Zeilen):** Linksbündig ausrichten.
* **Konsistenz:** Überschriften und zugehöriger Fließtext sollten die gleiche Ausrichtung haben.

## Text Width:

* **Fließtext:** Zeilenbreite von 50 bis 75 Zeichen anstreben.
    * Ungefähre Desktop-Breite: 600 Pixel.

## Hierarchy:

* **Gewichte:** 400 (normal) für Fließtext, 600 (semi-bold) für Überschriften und Hervorhebungen
* **Hierarchie-Indikatoren:** Klare visuelle Unterscheidung durch Größe und Gewicht

## Colors:

* **Hintergrund:** #000000 (Schwarz) als Standard-Hintergrundfarbe
* **Primäre Textfarbe:** #F5F5F7 (helles Grau) für Überschriften und wichtige Textelemente
* **Sekundäre Textfarbe:** #86868C (mittleres Grau) für Subheader und Fließtexte
* **Hervorhebungen:** #F5F5F7 (helles Grau) für Hervorhebungen innerhalb von Fließtexten
* **Kontrast:** Sicherstellen, dass der Kontrast zwischen Text und Hintergrund den Zugänglichkeitsstandards entspricht

## Spacing Relationships:

* **Nähe:** Elemente mit engerer Beziehung sollten engeren Abstand haben.
    * Beispiel: Wenn der Abstand zwischen Überschrift und Absatz "1x" ist, sollte der Abstand zu einem neuen Abschnitt "2x" sein.
    * Wenn der Abstand zwischen Überschrift und Absatz 16px beträgt, sollte der Abstand zu einem neuen Abschnitt 32px betragen.

# Implementation Notes:

* Diese Regeln konsequent in allen Designs anwenden.
* Lesbarkeit auf verschiedenen Bildschirmgrößen und Geräten testen.
* Relative Einheiten (em, rem) für responsives Design verwenden.
* Bei Bedarf leichte Anpassungen vornehmen, um die optimale Darstellung des Figtree-Fonts zu gewährleisten.

# Apple-Style Karussell-Layout

Für Karussell-Komponenten im Apple-Stil verwenden wir einen speziellen Ansatz, der eine konsistente Ausrichtung und elegante Animation gewährleistet.

## Grundprinzipien:

* **Gemeinsames Bezugssystem:** Überschriften und Karussell-Elemente teilen denselben linken Rand für perfekte Ausrichtung.
* **Grid-basiertes Layout:** Verwende CSS Grid für konsistente Positionierung über verschiedene Bildschirmgrößen hinweg.
* **Bewegender Track statt bewegender Elemente:** Animiere einen Container, nicht einzelne Elemente.

## Implementierung:

```jsx
<div className="grid grid-cols-1">
  {/* Überschrift und Karussell teilen denselben linken Rand */}
  <h1 className="text-left">Überschrift</h1>
  
  <div className="relative overflow-visible">
    {/* Container für alle Slides */}
    <div className="absolute top-0 left-0 w-[300vw]">
      {/* Bewegender Track */}
      <motion.div 
        animate={{ x: `-${currentSlide * 85}vw` }}
        transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Slides mit fester Position */}
        {slides.map((slide, index) => (
          <motion.div 
            style={{ 
              left: index === 0 ? 0 : `${85 * index}vw`,
              width: '80vw'
            }}
          >
            {/* Slide-Inhalt */}
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
</div>
```

## Wichtige Eigenschaften:

* **Erste Box bei 0:** `left: index === 0 ? 0 : ...` stellt sicher, dass die erste Box exakt am linken Rand beginnt.
* **Overflow-Handling:** `overflow-visible` erlaubt Boxen, über den Container hinauszuragen.
* **Animation:** Apple-ähnliche Easing-Kurve `[0.32, 0.72, 0, 1]` für sanfte Bewegungen.
* **Responsive Design:** Verwende `vw`-Einheiten für konsistente Verhältnisse auf allen Bildschirmgrößen.

## Vorteile:

* Perfekte Ausrichtung von Überschrift und erster Box, unabhängig von der Bildschirmgröße
* Boxen können über den Bildschirmrand hinausragen
* Sanfte, elegante Animationen im Apple-Stil
* Konsistentes Layout auf allen Geräten

