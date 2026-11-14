/* Kapitelinhalte. Kurzschreibweise: [[Zähler|Nenner]] = Bruch, _{x} = tiefgestellt, ^{x} = hochgestellt, $$ … $$ = Formelzeile */
const DEFS = '<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk" d="M0 0L10 5L0 10z"/></marker><marker id="ard" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mkd" d="M0 0L10 5L0 10z"/></marker></defs>';

const CHAPTERS = [
{
  id: 'einfuehrung', n: 1, title: 'Was ein mechatronisches System ist',
  desc: 'Definition, Grundstruktur, Wirkprinzipien, Integration, V-Modell',
  sections: [
  { id: 'definition', title: 'Definition', html: `
<p>Ein mechatronisches System verbindet drei Dinge zu einem untrennbaren Ganzen:</p>
<ul>
<li><strong>Mechanik</strong> – mechanische Komponenten und Prozesse</li>
<li><strong>Elektrotechnik</strong> – elektrische Komponenten und Prozesse</li>
<li><strong>Informationstechnik</strong> – einschließlich Automatisierungstechnik</li>
</ul>
<p>Die Verbindung passiert auf zwei Ebenen: bei den <strong>Komponenten (Hardware)</strong> und bei der <strong>Informationsverarbeitung (Software)</strong>. Das Schlüsselwort der Definition ist <em>synergetisch</em>: Das Zusammenspiel liefert Funktionen, die keine der Disziplinen allein schafft.</p>
<div class="box"><h4>Entwicklungsziele</h4>
<p>Gesucht ist die beste Lösung bei mechanischer Struktur, Sensor-Aktor-Einbindung, digitaler Informationsverarbeitung und Regelung sowie bei synergetischen Effekten (neue Funktionen durch neue Lösungen).</p></div>
<p>Die digitale Informationsverarbeitung kann mehr als steuern und regeln:</p>
<ul>
<li>nicht oder schwer messbare Größen berechnen</li>
<li>Reglerparameter anpassen (Adaption), Parameter und System identifizieren</li>
<li>Fehler erkennen und diagnostizieren</li>
<li>sich automatisch konfigurieren oder umkonfigurieren</li>
<li>lernen und sich anpassen – das „intelligente“ mechatronische System</li>
</ul>
<p>Beispiele aus den Folien: Fotokamera, Werkzeugmaschine, Roboter, Automobil (ABS, Drosselklappenaktor, x-by-wire, Motormanagement), DVD-Spieler, 3D-Röntgensysteme. Im Automobilbau entfallen rund 90 % der Innovationen auf mechatronische Systeme.</p>
<div class="box say"><h4>So sagst du es in der Prüfung</h4>
<p>„Mechatronik ist die synergetische Integration von Maschinenbau, Elektronik und intelligenter Rechnersteuerung in Entwurf und Fertigung von Produkten und Prozessen. Integriert wird über die Hardware und über die Software.“</p></div>` },

  { id: 'grundstruktur', title: 'Grundstruktur', html: `
<p>Jedes mechatronische System hat vier Grundbestandteile:</p>
<ul>
<li><strong>Grundsystem</strong> – die mechanische, elektromechanische, hydraulische oder pneumatische Struktur</li>
<li><strong>Sensoren</strong> – erfassen ausgewählte Zustandsgrößen des Grundsystems</li>
<li><strong>Informationsverarbeitung</strong> – meist digital, also zeit- und wertdiskret, auf einem Mikrorechner</li>
<li><strong>Aktoren</strong> – greifen in das Grundsystem ein (elektromechanisch, hydraulisch, pneumatisch)</li>
</ul>
<figure>
<svg viewBox="0 0 640 300" role="img" aria-label="Grundstruktur eines mechatronischen Systems">${DEFS}
<rect class="b" x="250" y="30" width="150" height="46"/><text class="mid" x="325" y="50">Informations-</text><text class="mid" x="325" y="66">verarbeitung</text>
<rect class="b" x="110" y="125" width="110" height="46"/><text class="mid" x="165" y="153">Aktoren</text>
<rect class="b" x="430" y="125" width="110" height="46"/><text class="mid" x="485" y="153">Sensoren</text>
<rect class="b" x="250" y="215" width="150" height="46"/><text class="mid" x="325" y="243">Grundsystem</text>
<rect class="b2" x="500" y="30" width="110" height="46"/><text class="mid" x="555" y="58">Mensch</text>
<rect class="b2" x="20" y="30" width="150" height="46"/><text class="mid" x="95" y="50">weitere Informations-</text><text class="mid" x="95" y="66">verarbeitung</text>
<path class="ld" d="M250 53H172" marker-end="url(#ard)" marker-start="url(#ard)"/>
<path class="ld" d="M400 53H498" marker-end="url(#ard)" marker-start="url(#ard)"/>
<path class="ld" d="M285 76V100H165V123" marker-end="url(#ard)"/>
<path class="ld" d="M485 125V100H365V78" marker-end="url(#ard)"/>
<path class="l" d="M165 171V238H248" marker-end="url(#ar)"/>
<path class="l" d="M400 238H485V173" marker-end="url(#ar)"/>
<path class="l" d="M40 148H108" marker-end="url(#ar)"/><text class="sm" x="22" y="140">Leistungsversorgung</text>
<path class="l" d="M620 148H542" marker-end="url(#ar)"/><text class="sm" x="560" y="140">Umgebung</text>
<text class="sm" x="20" y="285">durchgezogen: Energiefluss · gestrichelt: Informationsfluss · blau: notwendig · orange: optional</text>
</svg>
<figcaption>Grundstruktur: Der Kreis Sensor → Informationsverarbeitung → Aktor → Grundsystem ist ein geschlossener Wirkungskreis.</figcaption>
</figure>
<p>Merksatz zum Ablauf: Sensoren messen, der Rechner entscheidet, Aktoren stellen. Aktoren steuern dabei große Energieströme mit Stellsignalen kleiner Leistung.</p>
<h3>Drei Ebenen (Beispiel Automobil)</h3>
<p>Große Systeme werden hierarchisch und modular aufgebaut:</p>
<div class="tablewrap"><table>
<tr><th>Ebene</th><th>Aufgabe</th></tr>
<tr><td>1</td><td>Rückführungen zur Regelung: Stabilisierung, Dämpfung, Linearisierung, Störgrößenaufschaltung</td></tr>
<tr><td>2</td><td>Überwachung: Grenzwertkontrolle, Schutz, Alarmmeldung, Fehlerdiagnose, Koordination von Subsystemen</td></tr>
<tr><td>3</td><td>Optimierung, Koordinierung, Prozessmanagement (Umwelt, Benutzerschnittstelle)</td></tr>
</table></div>
<p>Am Auto: Das Federbein ist ein Grundbaustein, das Fahrzeug ein System aus gekoppelten Grundbausteinen, das Kreuzungsmanagement ein vernetztes System.</p>` },

  { id: 'wirkprinzipien', title: 'Funktions- und Wirkzusammenhänge', html: `
<p><strong>Funktionszusammenhang</strong> heißt: Was fließt durch das System? Es gibt drei Flussarten – <strong>Energie, Stoff, Information</strong>.</p>
<ul>
<li><strong>Hauptflüsse</strong> erfüllen direkt die Funktion des Systems.</li>
<li><strong>Nebenflüsse</strong> unterstützen nur. Sie ergeben sich aus der gewählten Lösung, nicht aus der Soll-Funktion.</li>
</ul>
<p>Je nach Hauptfluss spricht man von energiebestimmten Systemen (Hebewerk, Verbrennungsmotor), stoffbestimmten Systemen (Fertigungs-, Verfahrenstechnik) und informationsbestimmten Systemen (Gerätetechnik, IT).</p>
<p><strong>Wirkzusammenhang</strong> heißt: Mit welchem physikalischen Effekt wird die Funktion umgesetzt? Beispiele: Induktion, Piezoeffekt, Lorentz-Kraft, Hall-Effekt, Seebeck-Effekt, Joule-Wärme.</p>
<div class="tablewrap"><table>
<tr><th>Wirkprinzip</th><th>Eingang → Ausgang</th></tr>
<tr><td>Übertrager</td><td>gleiche physikalische Art (z. B. mechanisch → mechanisch, Getriebe)</td></tr>
<tr><td>Wandler</td><td>andere physikalische Art (z. B. elektrisch → mechanisch)</td></tr>
<tr><td>Sensor (ein Wandler)</td><td>beliebige Größe → <strong>elektrische</strong> Größe</td></tr>
<tr><td>Aktor (ein Wandler)</td><td>beliebige Größe → <strong>mechanische</strong> Größe</td></tr>
</table></div>` },

  { id: 'integration', title: 'Konventionell oder integriert', html: `
<p>Ein konventionelles System koppelt Mechanik und Elektronik nur <strong>additiv</strong>: Beide Teile werden getrennt entworfen und dann zusammengesteckt. Ein mechatronisches System wird als <strong>integriertes Gesamtsystem</strong> entworfen.</p>
<div class="tablewrap"><table>
<tr><th></th><th>Konventionell</th><th>Mechatronisch</th></tr>
<tr><td>Aufbau</td><td>umfänglich, komplexe Mechanik, viele Kabel</td><td>kompakt, einfache Mechanik, Bus oder Funk, autonome Module</td></tr>
<tr><td>Regelung</td><td>Steuerung oder einfache analoge Regelung</td><td>digitale, modellbasierte, adaptive Regelung</td></tr>
<tr><td>Präzision</td><td>durch enge Toleranzen und steifen Aufbau</td><td>durch Messen und Regeln, elektronische Dämpfung</td></tr>
<tr><td>Überwachung</td><td>einfache Grenzwerte</td><td>Fehlerdiagnose, z. B. Verschleiß aus Motorsignalen erkennen</td></tr>
<tr><td>Beispiel</td><td>mechanisch gesteuerte Einspritzpumpe</td><td>Common-Rail-Pumpe mit Magnetventil</td></tr>
</table></div>
<p>Zwei Wege der Integration:</p>
<ul>
<li><strong>Hardware-Integration:</strong> Sensoren, Aktoren und Mikrorechner werden in den Prozess eingebaut (Embedded System).</li>
<li><strong>Software-Integration:</strong> Funktionen entstehen durch Algorithmen. Dafür braucht man ein mathematisches Prozessmodell – gewonnen durch theoretische Modellbildung, Parameteridentifikation und Zustandsgrößenschätzung.</li>
</ul>` },

  { id: 'vmodell', title: 'Entwicklungsmethodik und V-Modell', html: `
<p>Es gibt keinen festen Ablaufplan, der für jede Konstruktion optimal wäre. Die VDI 2206 schlägt deshalb ein flexibles Vorgehen aus drei Teilen vor:</p>
<ul>
<li><strong>Mikrozyklus</strong> – der allgemeine Problemlösungszyklus für einen einzelnen Schritt</li>
<li><strong>Makrozyklus</strong> – das V-Modell für das ganze Projekt</li>
<li><strong>Prozessbausteine</strong> – vordefinierte Abläufe für wiederkehrende Arbeitsschritte</li>
</ul>
<h3>Mikrozyklus</h3>
<ol>
<li>Situation analysieren oder Ziel übernehmen</li>
<li>Lösungsvarianten erarbeiten (Synthese und Analyse)</li>
<li>Varianten bewerten: Berechnung, Simulation, Versuch</li>
<li>Beste Lösung auswählen, Ergebnis zurückkoppeln</li>
<li>Nächsten Zyklus planen</li>
</ol>
<h3>V-Modell</h3>
<figure>
<svg viewBox="0 0 640 290" role="img" aria-label="V-Modell">${DEFS}
<rect class="b3" x="30" y="16" width="130" height="30"/><text class="mid" x="95" y="36">Anforderungen</text>
<rect class="b3" x="480" y="16" width="130" height="30"/><text class="mid" x="545" y="36">Produkt</text>
<path class="c1" d="M95 46L230 215" marker-end="url(#ar)"/><text x="60" y="140" transform="rotate(52 60 140)">Systementwurf</text>
<path class="c1" d="M410 215L545 48" marker-end="url(#ar)"/><text x="495" y="208" transform="rotate(-51 495 208)">Systemintegration</text>
<rect class="b" x="205" y="205" width="230" height="52"/><text class="mid" x="320" y="226">Domänenspezifischer Entwurf</text><text class="mid sm" x="320" y="244">Maschinenbau · Elektrotechnik · Informationstechnik</text>
<path class="ld" d="M470 90H170" marker-end="url(#ard)"/><path class="ld" d="M440 130H200" marker-end="url(#ard)"/><path class="ld" d="M410 170H230" marker-end="url(#ard)"/>
<text class="mid" x="320" y="118">Eigenschaftsabsicherung</text>
<text class="mid sm" x="320" y="278">begleitend: Modellbildung und -analyse</text>
</svg>
<figcaption>Linker Ast: zerlegen. Unten: jede Domäne entwirft ihren Teil. Rechter Ast: zusammenführen. Dazwischen wird laufend gegen die Anforderungen geprüft.</figcaption>
</figure>
<ul>
<li>Start ist der Entwicklungsauftrag. Die Anforderungen sind der Maßstab für das Produkt.</li>
<li>Ein Makrozyklus enthält viele Mikrozyklen.</li>
<li>Komplexe Systeme durchlaufen mehrere Makrozyklen. Mit jedem steigt der Reifegrad, und die Spezifikation wird weiter verfeinert.</li>
</ul>
<h3>Entwicklungswerkzeuge</h3>
<div class="tablewrap"><table>
<tr><th>Kürzel</th><th>Bedeutung</th><th>Was ist echt, was simuliert?</th></tr>
<tr><td>SiL</td><td>Software-in-the-Loop</td><td>Prozess und Steuergerät sind beide simuliert</td></tr>
<tr><td>RCP</td><td>Rapid Control Prototyping</td><td>echter Prozess, Regler läuft auf einem leistungsfähigen Echtzeitrechner</td></tr>
<tr><td>HiL</td><td>Hardware-in-the-Loop</td><td>echtes Steuergerät (ECU), Prozess ist simuliert</td></tr>
<tr><td>ECU</td><td>Electronic Control Unit</td><td>das Steuergerät selbst</td></tr>
</table></div>
<p>Dazu kommen domänenspezifische Werkzeuge (CAE, CFD, Platinen-Layout, Reglerentwurf) und domänenübergreifende Modellbildung (Modelica, Matlab/Simulink).</p>` }
  ],
  check: [
    { q: 'Welche vier Grundbestandteile hat ein mechatronisches System?', a: 'Grundsystem, Sensoren, Informationsverarbeitung, Aktoren.' },
    { q: 'Worin unterscheiden sich Sensor und Aktor als Wandler?', a: 'Der Sensor gibt eine elektrische Größe aus, der Aktor eine mechanische.' },
    { q: 'Was ist bei HiL echt?', a: 'Das Steuergerät. Der Prozess wird simuliert.' }
  ]
},

{
  id: 'mechanik', n: 2, title: 'Mechanik bewegter Massen',
  desc: 'Bewegungsgleichung, Trägheitsmoment, Getriebe, Leistung und Energie',
  sections: [
  { id: 'newton', title: 'Bewegungsgleichung', html: `
<p>Ausgangspunkt ist Newton: Die Summe der Kräfte ändert den Impuls <var>M·v</var>.</p>
$$ f_{M} − f_{L} = [[d|dt]](M·v) = M·[[dv|dt]] + v·[[dM|dt]] $$
<p><var>f_{M}</var> ist die Antriebskraft des Motors, <var>f_{L}</var> die Lastkraft. Bei konstanter Masse fällt der zweite Term weg:</p>
$$ f_{M} − f_{L} = M_{0}·[[dv|dt]] = M_{0}·[[d²s|dt²]] $$
<p>Für die Drehung um eine feste Achse gilt genau dasselbe mit anderen Buchstaben. <var>J·ω</var> ist der Drehimpuls.</p>
$$ m_{M} − m_{L} = J_{0}·[[dω|dt]] = J_{0}·[[d²ε|dt²]] $$
<div class="tablewrap"><table>
<tr><th>Translation</th><th>Rotation</th></tr>
<tr><td>Weg <var>s</var></td><td>Winkel <var>ε</var></td></tr>
<tr><td>Geschwindigkeit <var>v</var></td><td>Winkelgeschwindigkeit <var>ω</var></td></tr>
<tr><td>Masse <var>M</var></td><td>Trägheitsmoment <var>J</var></td></tr>
<tr><td>Kraft <var>f</var></td><td>Drehmoment <var>m</var></td></tr>
<tr><td>Impuls <var>M·v</var></td><td>Drehimpuls <var>J·ω</var></td></tr>
</table></div>
<div class="box"><h4>Zwei Feinheiten</h4>
<p><strong>Veränderliches Trägheitsmoment</strong> gibt es bei Zentrifugen, Wicklern und Robotern mit wechselnder Lastgeometrie. Dann bleibt der Term <var>ω·dJ/dt</var> stehen.</p>
<p><strong>Das Motormoment <var>m_{M}</var></strong> ist das innere elektrische Moment. An der Welle kommt weniger an, weil der Rotor selbst beschleunigt werden muss und innere Reibung wirkt.</p></div>` },

  { id: 'kopplung', title: 'Translation und Rotation gekoppelt', html: `
<p>Eine Rolle mit Radius <var>r</var> zieht über ein Seil eine Masse <var>M</var>. Es gilt <var>v = r·ω</var>, <var>m = r·f</var>. Eingesetzt:</p>
$$ m_{M} − m_{L} = M·r²·[[dω|dt]]   ⇒   J_{e} = M·r² $$
<p><var>J_{e}</var> ist das <strong>wirksame Trägheitsmoment</strong> der geradlinig bewegten Masse, bezogen auf die Rollenachse. Vorstellung: Die Masse sitzt als Ring am Umfang der Rolle.</p>
<p>Praktischer Trick für Aufgaben: Aus gleicher kinetischer Energie folgt <var>J_{e} = M·(v/ω)²</var>. Man braucht den Radius gar nicht, nur Geschwindigkeit und Drehzahl.</p>` },

  { id: 'traegheit', title: 'Trägheitsmoment berechnen', html: `
<p>Jedes Massenelement <var>dM</var> im Abstand <var>r</var> von der Achse trägt <var>r²·dM</var> bei. Summiert über den Körper:</p>
$$ J = ∫ r² dM $$
<p>Für den Hohlzylinder (Radien <var>r_{1}</var>, <var>r_{2}</var>, Länge <var>l</var>, Dichte <var>ρ</var>) nimmt man dünne Rohre als Volumenelement, <var>dM = ρ·2πr·l·dr</var>:</p>
$$ J = [[π|2]]·ρ·l·(r_{2}^{4} − r_{1}^{4}) $$
<div class="box"><h4>Merke</h4><p>Das Trägheitsmoment wächst mit der <strong>vierten Potenz</strong> des Außenradius. Doppelter Durchmesser bedeutet 16-faches Trägheitsmoment.</p></div>
<p><strong>Satz von Steiner:</strong> Dreht ein Körper um eine Achse, die im Abstand <var>a</var> parallel zu seiner Schwerpunktachse liegt, gilt <var>J = J_{S} + M·a²</var>.</p>` },

  { id: 'getriebe', title: 'Getriebe', html: `
<p><strong>Warum überhaupt ein Getriebe?</strong> Die Tangentialkraft pro Rotoroberfläche (spezifischer Drehschub) ist bei Elektromotoren auf einige N/cm² begrenzt – wegen Eisensättigung und Stromwärmeverlusten. Viel Moment direkt an der Last hieße: riesiger Motor. Ein Getriebe erlaubt einen kleinen, schnell drehenden Motor.</p>
<p>Für ein verlustfreies Getriebe mit <var>r_{1}ω_{1} = r_{2}ω_{2}</var> ergibt sich an der Motorwelle:</p>
$$ J_{1e} = J_{1} + ([[ω_{2}|ω_{1}]])²·J_{2} $$
<div class="box"><h4>Merke</h4><p>Trägheitsmomente werden mit dem <strong>Quadrat</strong> des Drehzahlverhältnisses auf die andere Welle umgerechnet. Drehmomente nur mit dem einfachen Verhältnis.</p></div>
<p>Mehrstufiges Getriebe mit Hubwerk (Seiltrommel <var>r_{3}</var>, Masse <var>M_{3}</var>):</p>
$$ J_{1e} = J_{1} + ([[ω_{2}|ω_{1}]])²·J_{2} + ([[ω_{3}|ω_{1}]])²·(J_{3} + M_{3}·r_{3}²) $$
$$ m_{M} = J_{1e}·[[dω_{1}|dt]] + [[ω_{3}|ω_{1}]]·r_{3}·M_{3}·g $$
<p>Der erste Teil beschleunigt, der zweite hält die Last gegen die Schwerkraft.</p>` },

  { id: 'energie', title: 'Leistung und Energie', html: `
<p>Multipliziert man die Bewegungsgleichung mit <var>ω</var>, erhält man die Leistungsbilanz:</p>
$$ ω·m_{M} = ω·m_{L} + J_{0}·ω·[[dω|dt]] $$
<p>Motorleistung = Lastleistung + Leistung zum Beschleunigen. Integriert ergibt das die Energie:</p>
$$ w_{M}(t) = w_{L}(t) + [[1|2]]·J_{0}·ω² $$
<p>Der letzte Term ist die gespeicherte kinetische Energie.</p>
<div class="box say"><h4>Wichtig für die Prüfung: Stetigkeit</h4>
<p>Die kinetische Energie kann nicht springen, denn das bräuchte unendlich viel Leistung. Deshalb ändern sich <var>ω</var> und <var>v</var> immer stetig. Das ist die Kontinuitätsbedingung für jeden Bewegungsvorgang.</p></div>` }
  ],
  check: [
    { q: 'Wie rechnet man ein Trägheitsmoment über ein Getriebe um?', a: 'Mit dem Quadrat des Drehzahlverhältnisses: J₁ₑ = J₁ + (ω₂/ω₁)²·J₂.' },
    { q: 'Warum kann die Drehzahl nicht springen?', a: 'Die kinetische Energie ½Jω² müsste springen, das erfordert unendliche Leistung.' },
    { q: 'Wie groß ist das wirksame Trägheitsmoment einer Masse M an einer Rolle mit Radius r?', a: 'Jₑ = M·r².' }
  ]
},

{
  id: 'antriebe', n: 3, title: 'Gekoppelte Systeme, Kennlinien, Stabilität',
  desc: 'Zweimassensystem, Motor- und Lastkennlinien, Reibung, stabile Arbeitspunkte',
  sections: [
  { id: 'starr', title: 'Starr gekoppelter Antrieb', html: `
<p>Fasst man alle bewegten Massen zu <strong>einem</strong> Trägheitsmoment zusammen, hat man einen starr gekoppelten Antrieb. Zwei Zustandsgleichungen genügen:</p>
$$ J·[[dω|dt]] = m_{M}(ω, ε, y_{M}, t) − m_{L}(ω, ε, y_{L}, t),   [[dε|dt]] = ω $$
<p><var>ω</var> und <var>ε</var> sind die Zustandsgrößen, <var>y_{M}</var> und <var>y_{L}</var> die Eingangsgrößen aus den Stellgliedern. Wer es genauer braucht, nimmt elektrische Zustandsgrößen wie die Motorströme dazu.</p>` },

  { id: 'zweimassen', title: 'Zweimassensystem', html: `
<p>Motor und Last sind in Wirklichkeit über eine Welle verbunden, die sich verdreht. Die Welle wirkt wie eine Drehfeder mit der <strong>Torsionssteifigkeit <var>S</var></strong>:</p>
$$ m_{T} = S·(ε_{1} − ε_{2}) $$
<p>Mit massefreier Welle erhält man vier Zustandsgleichungen:</p>
$$ J_{1}·[[dω_{1}|dt]] = m_{M} − S·(ε_{1} − ε_{2}),   [[dε_{1}|dt]] = ω_{1} $$
$$ J_{2}·[[dω_{2}|dt]] = S·(ε_{1} − ε_{2}) − m_{L},   [[dε_{2}|dt]] = ω_{2} $$
<p>Lies das so: Am Motor zieht das Wellenmoment ab, an der Last treibt dasselbe Moment an.</p>
<div class="box"><h4>Wann braucht man das Modell?</h4>
<p>Das System kann frei schwingen. Liegen diese Schwingungen bei einigen Hz und damit <strong>in der Bandbreite der Regelung</strong>, muss man sie mitmodellieren. Wird die Welle sehr steif, gehen <var>ε_{1}=ε_{2}</var>, <var>ω_{1}=ω_{2}</var> und man landet wieder beim starren System.</p></div>` },

  { id: 'zweiachs', title: 'Zweiachsenantrieb in Polarkoordinaten', html: `
<p>Modell für einen Roboterarm: Eine Achse dreht (Winkel <var>ε</var>), die andere fährt die Masse <var>M_{2}</var> radial aus (Radius <var>r</var>).</p>
$$ (J_{1} + J_{2} + M_{2}r²)·[[dω|dt]] = m_{M} − 2M_{2}rωv − M_{2}g·r·cos ε − m_{R} − m_{L} $$
$$ M_{2}·[[dv|dt]] = f_{M} + M_{2}rω² − M_{2}g·sin ε − f_{R} − f_{L} $$
<p>Dazu kommen <var>dε/dt = ω</var> und <var>dr/dt = v</var>. Das sind vier <strong>nichtlineare</strong> Zustandsgleichungen. Die beiden Achsen beeinflussen sich über drei Effekte:</p>
<div class="tablewrap"><table>
<tr><th>Term</th><th>Effekt</th><th>Anschaulich</th></tr>
<tr><td><var>2M_{2}rωv</var></td><td>Coriolis</td><td>Ausfahren bei laufender Drehung bremst die Drehachse</td></tr>
<tr><td><var>M_{2}rω²</var></td><td>Zentrifugal</td><td>Drehung drückt die Masse nach außen</td></tr>
<tr><td><var>M_{2}g·r·cos ε</var>, <var>M_{2}g·sin ε</var></td><td>Gravitation</td><td>Gewicht wirkt je nach Winkel auf beide Achsen</td></tr>
</table></div>
<p>Auch das Trägheitsmoment der Drehachse hängt über <var>M_{2}r²</var> vom Radius ab.</p>` },

  { id: 'motorkennlinien', title: 'Kennlinien elektrischer Antriebe', html: `
<p>Eine statische Kennlinie zeigt Drehzahl über Drehmoment im eingeschwungenen Zustand. Voraussetzung: Steuergrößen wie Versorgungsspannung oder Erregerstrom bleiben konstant.</p>
<figure>
<svg viewBox="0 0 640 250" role="img" aria-label="Statische Kennlinien elektrischer Maschinen">${DEFS}
<path class="l" d="M70 220V25" marker-end="url(#ar)"/><path class="l" d="M70 220H600" marker-end="url(#ar)"/>
<text x="50" y="30">ω</text><text x="585" y="240">m_M</text>
<path class="c1" d="M70 60H470"/><text x="480" y="64">Synchronmotor</text>
<path class="c2" d="M70 62C250 70 380 82 430 110C445 122 380 150 300 170"/><text x="440" y="108">Asynchronmotor (Nebenschluss-Verhalten)</text><text class="sm" x="440" y="124">Knick = Kipppunkt</text>
<path class="l" d="M95 40C110 130 200 190 420 205"/><text x="225" y="165">Reihenschluss-Verhalten</text>
</svg>
<figcaption>Die drei Grundformen. Durch Verändern der Steuergrößen lassen sich die Kennlinien fast beliebig verschieben.</figcaption>
</figure>
<ul>
<li><strong>Synchronmaschine:</strong> starre Drehzahl am Netz. Deshalb nur wenige Anwendungen direkt am Netz (z. B. Kolbenkompressor), sonst Umrichterbetrieb mit variabler Frequenz.</li>
<li><strong>Nebenschluss-Verhalten:</strong> Drehzahl sinkt unter Last nur wenig. Die Asynchronmaschine verhält sich so bis zum Kipppunkt.</li>
<li><strong>Reihenschluss-Verhalten:</strong> Drehzahl fällt unter Last stark. Gut für Fahrzeuge: weiter Drehzahlbereich ohne Getriebe.</li>
</ul>
<p><strong>Geregelte Antriebe</strong> haben eine eckige Kennlinie mit zwei Bereichen: konstante Drehzahl im Normalbetrieb und Äste mit konstantem Drehmoment. Die Drehmomentgrenze ist eine Strombegrenzung und schützt Motor und Speiseeinheit vor Überlast.</p>` },

  { id: 'lastkennlinien', title: 'Kennlinien von Lasten', html: `
<p>Lastkennlinien sind sehr verschieden, setzen sich aber aus vier einfachen Bausteinen zusammen:</p>
<div class="tablewrap"><table>
<tr><th>Drehmoment</th><th>Leistung</th><th>Beispiele</th></tr>
<tr><td><var>M</var> ≈ konstant</td><td><var>P ~ n</var></td><td>Krane, Aufzüge, Kolbenpumpen, Getriebe (Coulomb-Reibung)</td></tr>
<tr><td><var>M ~ n</var></td><td><var>P ~ n²</var></td><td>Viskosereibung, Transport von Papier und Gewebe</td></tr>
<tr><td><var>M ~ n²</var></td><td><var>P ~ n³</var></td><td>Kreiselpumpe, Lüfter, Gebläse, schnelle Fahrzeuge</td></tr>
<tr><td><var>M ~ 1/n</var></td><td><var>P</var> ≈ konstant</td><td>Haspeln, Wickler, Schälmaschinen</td></tr>
</table></div>
<p>Eselsbrücke: Die Leistung hat immer eine Potenz mehr als das Moment, weil <var>P = M·ω</var>.</p>
<p>Zum Vergleich: Dieselmotor und Turbine haben bei konstanter Einspritzmenge bzw. Ventilstellung eigene, fallende Kennlinien. Bei Hubwerken ist das Lastmoment ein reines <strong>Gravitationsmoment</strong> und hängt nicht von der Drehzahl ab.</p>` },

  { id: 'reibung', title: 'Reibung', html: `
<div class="tablewrap"><table>
<tr><th>Modell</th><th>Kennlinie Kraft über Geschwindigkeit</th></tr>
<tr><td>Coulomb-Reibung</td><td>konstanter Betrag, Vorzeichen wechselt mit der Richtung (Sprung bei <var>v</var> = 0)</td></tr>
<tr><td>Viskose Reibung</td><td>proportional zur Geschwindigkeit (Gerade durch den Ursprung)</td></tr>
<tr><td>Viskos + Coulomb</td><td>Sprung plus Gerade</td></tr>
<tr><td>mit Stribeck-Effekt</td><td>hohe Haftreibung, die beim Losfahren erst <strong>abfällt</strong> und dann wieder steigt</td></tr>
</table></div>
<div class="box"><h4>Warum ist Stribeck problematisch?</h4>
<p>Dort, wo die Reibung mit steigender Geschwindigkeit abnimmt, wirkt sie <strong>mitkoppelnd</strong>: Schneller heißt weniger Bremse, also noch schneller. Das kann zu Ruckgleiten und Instabilität führen.</p></div>
<p>Wie genau man Reibung beschreiben muss, hängt von der Anwendung ab. Für den Reglerentwurf reichen oft einfache mathematische Funktionen.</p>` },

  { id: 'stabil', title: 'Stabile und instabile Arbeitspunkte', html: `
<p>Der Arbeitspunkt liegt dort, wo sich Motor- und Lastkennlinie schneiden (<var>m_{M} = m_{L}</var>). Die Frage ist: Kehrt der Antrieb nach einer kleinen Störung <var>Δn</var> dorthin zurück?</p>
<figure>
<svg viewBox="0 0 640 220" role="img" aria-label="Stabiler und instabiler Arbeitspunkt">${DEFS}
<path class="l" d="M40 190V25" marker-end="url(#ar)"/><path class="l" d="M40 190H290" marker-end="url(#ar)"/><text x="22" y="30">m</text><text x="280" y="208">n</text>
<path class="c1" d="M55 60C120 100 190 125 270 135"/><text x="235" y="155">m_M</text>
<path class="c2" d="M55 170C130 150 200 110 255 40"/><text x="258" y="38">m_L</text>
<circle cx="163" cy="118" r="4" class="mk"/><text class="mid" x="165" y="212">a) stabil</text>
<path class="l" d="M370 190V25" marker-end="url(#ar)"/><path class="l" d="M370 190H620" marker-end="url(#ar)"/><text x="352" y="30">m</text><text x="610" y="208">n</text>
<path class="c1" d="M385 170C460 150 530 110 585 40"/><text x="588" y="38">m_M</text>
<path class="c2" d="M385 60C450 100 520 125 600 135"/><text x="565" y="155">m_L</text>
<circle cx="493" cy="118" r="4" class="mk"/><text class="mid" x="495" y="212">c) instabil</text>
</svg>
<figcaption>Blau: Motor, orange: Last. Rechts vom Schnittpunkt muss die Last überwiegen.</figcaption>
</figure>
<div class="box"><h4>Regel</h4>
<p>Stabil, wenn rechts vom Arbeitspunkt die Last stärker ist als der Motor: Wird der Antrieb zu schnell, bremst der Momentenüberschuss der Last ihn zurück. Als Formel:</p>
$$ [[dm_{L}|dn]] > [[dm_{M}|dn]] $$
<p>Sind die Steigungen gleich, ist der Punkt indifferent.</p></div>
<div class="box say"><h4>Typische Nachfrage: Warum nur notwendig, nicht hinreichend?</h4>
<p>Die Regel benutzt nur <strong>statische</strong> Kennlinien. Sie sagt nichts über das dynamische Verhalten, etwa elektrische Ausgleichsvorgänge, Schwingungen oder die Regelung. Ein Punkt kann die Regel erfüllen und trotzdem dynamisch instabil sein.</p>
<p>Bei der Asynchronmaschine liegen die stabilen Arbeitspunkte bei üblichen Lasten auf dem Ast zwischen Kipppunkt und Leerlaufdrehzahl, dort fällt das Motormoment mit steigender Drehzahl.</p></div>
<h3>Stabilität dynamischer Systeme</h3>
<p>Liegt das System als Übertragungsfunktion oder als Zustandsgleichungen vor, nimmt man die Werkzeuge der Regelungstechnik:</p>
<ul>
<li><strong>Frequenzbereich:</strong> Frequenzkennlinien-Verfahren (Nyquist-Kriterium), Wurzelortskurve</li>
<li><strong>Zustandsraum:</strong> Eigenwertanalyse</li>
</ul>
<p><strong>Regelung</strong> hat eine Rückführung über eine Messeinrichtung und bildet die Regeldifferenz <var>e = w − r</var>. <strong>Steuerung</strong> wirkt ohne diesen geschlossenen Kreis und kann unbekannte Störungen nicht ausgleichen.</p>` }
  ],
  check: [
    { q: 'Wann muss man ein Zweimassensystem statt eines starren Modells verwenden?', a: 'Wenn die Torsionsschwingungen in der Bandbreite der Regelung liegen (einige Hz).' },
    { q: 'Welche Last hat M ~ n²?', a: 'Lüfter, Gebläse, Kreiselpumpen. Die Leistung steigt dann mit n³.' },
    { q: 'Wie lautet die Bedingung für einen stabilen Arbeitspunkt?', a: 'dm_L/dn > dm_M/dn im Schnittpunkt.' }
  ]
},

{
  id: 'modellbildung', n: 4, title: 'Modellbildung, Blockschaltbild, Wärme',
  desc: 'Theoretisch und experimentell, Schwinger aus dem Labor, thermisches Ersatzschaltbild',
  sections: [
  { id: 'arten', title: 'Zwei Wege zum Modell', html: `
<div class="tablewrap"><table>
<tr><th>Theoretische Modellbildung</th><th>Experimentelle Modellbildung (Identifikation)</th></tr>
<tr><td>Prozesselemente mit physikalischen Gleichungen beschreiben</td><td>Ein- und Ausgangssignale messen (Betriebs- oder Testsignale)</td></tr>
<tr><td>Teilmodelle zum Gesamtprozess zusammensetzen</td><td>Modellstruktur aus Vorwissen annehmen</td></tr>
<tr><td>vereinfachende Annahmen treffen</td><td>Identifikationsverfahren liefert das Modell</td></tr>
</table></div>
<p>Zwischen den Extremen gibt es Mischformen:</p>
<div class="tablewrap"><table>
<tr><th>Modell</th><th>Was ist bekannt?</th></tr>
<tr><td>White-Box</td><td>physikalische Gesetze und Parameter bekannt – rein theoretisch</td></tr>
<tr><td>Bright-Grey-Box</td><td>Gesetze bekannt, Parameter unbekannt – Parameter aus Messungen</td></tr>
<tr><td>Dark-Grey-Box</td><td>nur Regeln bekannt, Struktur und Parameter unbekannt</td></tr>
<tr><td>Black-Box</td><td>nur Ein- und Ausgangssignale messbar – rein experimentell</td></tr>
</table></div>
<p><strong>Konzentrierte Parameter:</strong> Größen hängen nur von der Zeit ab (gewöhnliche Dgl.). <strong>Verteilte Parameter:</strong> Größen hängen von Ort und Zeit ab.</p>` },

  { id: 'bsb', title: 'Blockschaltbild-Symbole', html: `
<p>Im Blockschaltbild (BSB) steht jeder Block für eine Rechenvorschrift zwischen Eingang <var>y</var> und Ausgang <var>x</var>.</p>
<div class="tablewrap"><table>
<tr><th>Block</th><th>Gleichung</th><th>Verhalten</th></tr>
<tr><td>Integrator</td><td><var>T·dx/dt = y</var></td><td>summiert den Eingang auf</td></tr>
<tr><td>PI-Glied</td><td><var>T·dx/dt = G·(T·dy/dt + y)</var></td><td>Sprung plus Rampe</td></tr>
<tr><td>Verzögerungsglied 1. Ordnung (PT1)</td><td><var>T·dx/dt + x = G·y</var></td><td>nähert sich dem Endwert verzögert an</td></tr>
<tr><td>PDT1-Glied</td><td><var>T_{1}·dx/dt + x = G·(T_{2}·dy/dt + y)</var></td><td>PT1 mit Vorhalt</td></tr>
<tr><td>Laufzeit</td><td><var>x(t) = G·y(t − T)</var></td><td>verschiebt das Signal zeitlich</td></tr>
<tr><td>Summierstelle</td><td><var>x = y_{1} − y_{2}</var></td><td></td></tr>
<tr><td>Multiplikation, Division</td><td><var>x = y_{1}·y_{2}</var>, <var>x = y_{1}/y_{2}</var></td><td>nichtlinear</td></tr>
<tr><td>Begrenzer</td><td><var>x = y</var> zwischen <var>x_{min}</var> und <var>x_{max}</var></td><td>nichtlinear</td></tr>
</table></div>` },

  { id: 'schwinger', title: 'Feder-Masse-Dämpfer aus Labor 1', html: `
<p>Masse <var>M</var>, Feder <var>c</var>, Dämpfer <var>d</var>, Kraft <var>u(t)</var>, Auslenkung <var>y(t)</var>:</p>
$$ ÿ + 2Dω_{0}·ẏ + ω_{0}²·y = [[1|M]]·u(t) $$
<p><var>ω_{0}</var> ist die Kennkreisfrequenz, <var>D</var> der Dämpfungsgrad.</p>
<h3>Vom Gleichungssystem zum Blockschaltbild</h3>
<ol>
<li>Nach der höchsten Ableitung auflösen: <var>ÿ = u/M − 2Dω_{0}·ẏ − ω_{0}²·y</var></li>
<li>Summierstelle bildet <var>ÿ</var></li>
<li>Erster Integrator macht daraus <var>ẏ</var>, zweiter Integrator <var>y</var></li>
<li><var>ẏ</var> mit Faktor <var>2Dω_{0}</var> und <var>y</var> mit Faktor <var>ω_{0}²</var> negativ zurückführen</li>
</ol>
<figure>
<svg viewBox="0 0 640 200" role="img" aria-label="Blockschaltbild des Feder-Masse-Dämpfers">${DEFS}
<text x="10" y="64">u</text><path class="l" d="M22 60H58" marker-end="url(#ar)"/>
<rect class="b3" x="60" y="42" width="56" height="36"/><text class="mid" x="88" y="65">1/M</text>
<path class="l" d="M116 60H168" marker-end="url(#ar)"/><circle class="b3" cx="180" cy="60" r="11"/>
<path class="l" d="M191 60H248" marker-end="url(#ar)"/><text class="mid sm" x="220" y="52">ÿ</text>
<rect class="b" x="250" y="42" width="70" height="36"/><text class="mid" x="285" y="65">∫</text>
<path class="l" d="M320 60H408" marker-end="url(#ar)"/><text class="mid sm" x="364" y="52">ẏ</text>
<rect class="b" x="410" y="42" width="70" height="36"/><text class="mid" x="445" y="65">∫</text>
<path class="l" d="M480 60H610" marker-end="url(#ar)"/><text x="596" y="50">y</text>
<path class="l" d="M364 60V120H322" marker-end="url(#ar)"/><rect class="b2" x="250" y="102" width="70" height="36"/><text class="mid" x="285" y="125">2Dω₀</text>
<path class="l" d="M250 120H186V73" marker-end="url(#ar)"/><text class="sm" x="192" y="88">−</text>
<path class="l" d="M545 60V170H322" marker-end="url(#ar)"/><rect class="b2" x="250" y="152" width="70" height="36"/><text class="mid" x="285" y="175">ω₀²</text>
<path class="l" d="M250 170H174V73" marker-end="url(#ar)"/><text class="sm" x="160" y="88">−</text>
</svg>
<figcaption>Zwei Integratoren, weil die Gleichung zweiter Ordnung ist.</figcaption>
</figure>
<h3>Drei gleichwertige Darstellungen</h3>
<p><strong>1. Übertragungsfunktion</strong> (Laplace, Anfangswerte null):</p>
$$ G(s) = [[Y(s)|U(s)]] = [[1/M|s² + 2Dω_{0}s + ω_{0}²]] $$
<p><strong>2. Zustandsraum</strong> – aus einer Dgl. 2. Ordnung werden zwei Dgln. 1. Ordnung mit <var>x_{1} = y</var>, <var>x_{2} = ẏ</var>:</p>
$$ ẋ = A·x + B·u,   y = C·x + D·u $$
<div class="tablewrap"><table>
<tr><th>A</th><th>B</th><th>C</th><th>D</th></tr>
<tr><td>[ 0, 1 ; −ω_{0}², −2Dω_{0} ]</td><td>[ 0 ; 1/M ]</td><td>[ 1, 0 ]</td><td>[ 0 ]</td></tr>
</table></div>
<p><strong>3. Blockschaltbild</strong> – siehe oben. Im Labor werden alle drei in Simulink aufgebaut und über die Sprungantwort verglichen (Verifikation).</p>
<h3>Sprungantwort und Frequenzgang</h3>
<p>Die Sprungantwort erhält man im Bildbereich aus <var>H(s) = G(s)/s</var>. Für <var>D</var> &lt; 1 schwingt das System gedämpft mit der Eigenkreisfrequenz</p>
$$ ω_{e} = ω_{0}·√(1 − D²) $$
<p>und klingt mit <var>e^{−Dω_{0}t}</var> ab. Das Bode-Diagramm (logarithmische Frequenzkennlinien) zeigt, wie stark und mit welcher Phase das System bei jeder Frequenz antwortet. Man nutzt es für Stabilitätsuntersuchung und Reglerentwurf.</p>
<div class="box"><h4>Beispiel aus dem Laborblatt</h4>
<p><var>T·ẏ + y = K·T·u̇</var> ergibt <var>G(s) = KTs / (1 + Ts)</var>. Die Sprungantwort ist <var>h(t) = K·e^{−t/T}</var>: ein Sprung auf <var>K</var>, der mit der Zeitkonstante <var>T</var> auf null abklingt.</p></div>` },

  { id: 'verluste', title: 'Verluste und Wärmeübertragung', html: `
<p>Jede Energiewandlung hat Verluste. Die Verlustleistung wird zu Wärme und muss zum Kühlmittel abfließen. Das bestimmt Auslegung und Bauform.</p>
<p><strong>Verlustquellen:</strong></p>
<ul>
<li>Stromwärmeverluste (Kupferverluste)</li>
<li>Eisenverluste (Hysterese und Wirbelströme)</li>
<li>Reibungsverluste (Lager, Getriebe, Luft)</li>
<li>Schalt- und Durchlassverluste der Leistungshalbleiter</li>
<li>passive Bauteile wie Drosseln und Kondensatoren</li>
</ul>
<p><strong>Drei Übertragungsmechanismen:</strong></p>
<div class="tablewrap"><table>
<tr><th>Mechanismus</th><th>Formel</th><th>Abhängigkeit</th></tr>
<tr><td>Wärmeleitung</td><td><var>R_{th} = (T_{2} − T_{1})/P = d/(λ_{th}·A)</var>, Einheit K/W</td><td>linear in ΔT</td></tr>
<tr><td>Konvektion</td><td><var>P = α·A·(T_{S} − T_{m})</var></td><td>linear in ΔT</td></tr>
<tr><td>Strahlung (Stefan-Boltzmann)</td><td><var>P = ε·σ·A·(T⁴ − T_{0}⁴)</var></td><td>vierte Potenz</td></tr>
</table></div>
<p>Strahlung darf man oft vernachlässigen: Die Temperaturen sind niedrig, und Kühlrippen strahlen sich gegenseitig an.</p>` },

  { id: 'thermesb', title: 'Thermisches Ersatzschaltbild', html: `
<p>Wärmeleitung verhält sich wie ein Stromkreis. Man kann deshalb mit einem elektrischen Ersatzschaltbild rechnen.</p>
<div class="tablewrap"><table>
<tr><th>Thermisch</th><th>Elektrisch</th></tr>
<tr><td>Temperatur(differenz)</td><td>Spannung</td></tr>
<tr><td>Wärmestrom (Leistung)</td><td>Strom</td></tr>
<tr><td>Wärmeleitfähigkeit</td><td>elektrische Leitfähigkeit</td></tr>
<tr><td>thermischer Widerstand</td><td>elektrischer Widerstand</td></tr>
<tr><td>Wärmekapazität</td><td>Kondensator</td></tr>
</table></div>
<p>Beispiel Leistungshalbleiter auf Kühlkörper: Die Verlustleistung fließt als „Strom“ durch die Reihenschaltung <var>R_{JC}</var> (Sperrschicht–Gehäuse), <var>R_{CS}</var> (Gehäuse–Kühlkörper), <var>R_{SA}</var> (Kühlkörper–Umgebung). Die Sperrschichttemperatur ist</p>
$$ T_{J} = T_{A} + P·(R_{JC} + R_{CS} + R_{SA}) $$
<h3>Zeitverhalten</h3>
<p>Die thermische Kapazität <var>C = c·ρ·V</var> speichert Wärme. Für einen homogenen Körper mit zugeführter Leistung <var>p_{1}</var>:</p>
$$ T_{th}·[[d(ΔT)|dt]] + ΔT = [[p_{1}|α·A]],   T_{th} = [[C|α·A]] $$
<p>Das ist ein PT1-Glied: Die Übertemperatur steigt nach einer e-Funktion auf den Endwert <var>p_{1}/(αA)</var>.</p>
<div class="box"><h4>Zeitmaßstäbe bei elektrischen Maschinen</h4>
<table>
<tr><th>Vorgang</th><th>Dauer</th></tr>
<tr><td>elektromagnetisch</td><td>0,1 – 100 ms</td></tr>
<tr><td>mechanisch</td><td>10 ms – 10 s</td></tr>
<tr><td>thermisch</td><td>10 – 60 min</td></tr>
</table>
<p>Folge: Eine Maschine verträgt kurz deutlich mehr als ihren Nennstrom, weil sie sich nur langsam erwärmt.</p></div>
<p><strong>Foster-Netzwerk:</strong> Kette aus parallelen RC-Gliedern, deren Werte aus einer gemessenen Abkühl- oder Aufheizkurve angepasst werden. Vorteil: geschlossene Formel, einfach zu parametrieren. Nachteil: Die einzelnen <var>R</var> und <var>C</var> entsprechen keinen realen Bauteilen, die inneren Knoten haben keine physikalische Bedeutung. Ändert sich das System, muss man alles neu bestimmen.</p>` }
  ],
  check: [
    { q: 'Was entspricht im thermischen Ersatzschaltbild dem Strom?', a: 'Der Wärmestrom, also die Verlustleistung.' },
    { q: 'Wie viele Integratoren braucht das BSB des Feder-Masse-Dämpfers?', a: 'Zwei, weil die Differentialgleichung 2. Ordnung ist.' },
    { q: 'Was unterscheidet White-Box und Black-Box?', a: 'White-Box: rein aus physikalischen Gesetzen. Black-Box: rein aus gemessenen Ein-/Ausgangssignalen.' }
  ]
},

{
  id: 'gleichstrommaschine', n: 5, title: 'Gleichstrommaschine und ihre Regelung',
  desc: 'Modellgleichungen, Kennlinien, Feldschwächung, Kaskadenregelung',
  sections: [
  { id: 'gleichungen', title: 'Modell der fremderregten GM', html: `
<p>„Fremderregt“ heißt: Der Erregerkreis (macht das Magnetfeld <var>Φ_{e}</var>) wird getrennt vom Ankerkreis (trägt den momentbildenden Strom <var>i_{a}</var>) gespeist.</p>
<div class="tablewrap"><table>
<tr><th>Was</th><th>Gleichung</th><th>In Worten</th></tr>
<tr><td>Ankerkreis</td><td><var>R_{a}i_{a} + L_{a}·di_{a}/dt + u_{i} = u_{a}</var></td><td>Ankerspannung = ohmscher Abfall + induktiver Abfall + induzierte Spannung</td></tr>
<tr><td>Induzierte Spannung</td><td><var>u_{i} = c·Φ_{e}·ω</var></td><td>steigt mit Drehzahl und Fluss</td></tr>
<tr><td>Drehmoment</td><td><var>m_{M} = c·Φ_{e}·i_{a}</var></td><td>steigt mit Ankerstrom und Fluss</td></tr>
<tr><td>Mechanik</td><td><var>J·dω/dt = m_{M} − m_{L}</var></td><td>Momentenüberschuss beschleunigt</td></tr>
<tr><td>Feldkreis</td><td><var>R_{e}i_{e} + N_{e}·dΦ_{e}/dt = u_{e}</var></td><td>Erregerspannung treibt Erregerstrom</td></tr>
<tr><td>Magnetisierung</td><td><var>Φ_{e} = f(i_{e})</var></td><td>nichtlinear wegen Sättigung</td></tr>
</table></div>
<div class="box"><h4>Der Kern in zwei Sätzen</h4>
<p>Der <strong>Strom</strong> macht das <strong>Moment</strong>. Die <strong>Spannung</strong> bestimmt die <strong>Drehzahl</strong>.</p>
<p>Die Maschine regelt sich ein Stück weit selbst: Dreht sie schneller, steigt <var>u_{i}</var>, der Strom sinkt, das Moment sinkt.</p></div>
<p>Im BSB stecken zwei Multiplizierer (<var>Φ_{e}·ω</var> und <var>Φ_{e}·i_{a}</var>). Hält man den Fluss konstant, wird das Modell linear.</p>` },

  { id: 'stationaer', title: 'Stationäres Verhalten', html: `
<p>Stationär heißt: alle Ableitungen null. Aus Ankerkreis, <var>u_{i}</var> und Moment folgt die Drehzahl-Drehmoment-Kennlinie:</p>
$$ ω = [[u_{a}|c·Φ_{e}]] − [[R_{a}·m_{M}|c²·Φ_{e}²]] $$
<p>Eine fallende Gerade: Der erste Term ist die Leerlaufdrehzahl, der zweite der Drehzahlabfall unter Last. Das ist Nebenschluss-Verhalten.</p>
<p>Mit Nennfluss (<var>b = Φ_{e}/Φ_{e0} = 1</var>) und normiert:</p>
$$ [[ω|ω_{0}]] = [[u_{a}|u_{a0}]] − [[m_{L}|m_{0}]],   [[i_{a}|i_{a0}]] = [[m_{L}|m_{0}]] $$
<div class="tablewrap"><table>
<tr><th>Bezugsgröße</th><th>Bedeutung</th></tr>
<tr><td><var>ω_{0}</var></td><td>Nenn-Leerlaufdrehzahl</td></tr>
<tr><td><var>u_{a0} = c·Φ_{e0}·ω_{0}</var></td><td>Nenn-Ankerspannung</td></tr>
<tr><td><var>i_{a0} = u_{a0}/R_{a}</var></td><td>extrapolierter Stillstandsstrom, etwa das <strong>10-Fache</strong> des Nennstroms</td></tr>
<tr><td><var>m_{0} = c·Φ_{e0}·i_{a0}</var></td><td>extrapoliertes Stillstandsmoment</td></tr>
</table></div>
<figure>
<svg viewBox="0 0 640 250" role="img" aria-label="Kennlinien der Gleichstrommaschine">${DEFS}
<path class="l" d="M60 215V20" marker-end="url(#ar)"/><path class="l" d="M60 215H300" marker-end="url(#ar)"/><text x="14" y="26">ω/ω₀</text><text x="250" y="236">m_L/m₀</text>
<path class="c1" d="M60 60L270 100"/><path class="c1" d="M60 110L270 150"/><path class="c1" d="M60 160L270 200"/>
<text class="sm" x="200" y="78">u_a = u_a0</text><text class="sm" x="200" y="128">kleineres u_a</text>
<text class="mid" x="180" y="248">Ankerspannung: parallel verschieben</text>
<path class="l" d="M390 215V20" marker-end="url(#ar)"/><path class="l" d="M390 215H630" marker-end="url(#ar)"/><text x="344" y="26">ω/ω₀</text><text x="580" y="236">m_L/m₀</text>
<path class="c1" d="M390 150L600 190"/><path class="c2" d="M390 95L560 215"/><path class="c2" d="M390 40L480 215"/>
<text class="sm" x="530" y="170">b = 1</text><text class="sm" x="495" y="140">b = 1/2</text><text class="sm" x="430" y="80">b = 1/3</text>
<text class="mid" x="510" y="248">Feldschwächung: höher und steiler</text>
</svg>
<figcaption>Links Ankerspannungssteuerung, rechts Feldschwächung bei voller Ankerspannung.</figcaption>
</figure>
<p>Die Kennlinien gelten in allen vier Quadranten, Reversieren ist immer möglich. Die Stillstandswerte sind nur rechnerisch: Im Dauerbetrieb würde die Wicklung überlastet. Nutzbar ist nur der Bereich um den Nennstrom.</p>` },

  { id: 'steuerung', title: 'Ankerspannung und Feldschwächung', html: `
<p>Es gibt zwei Stellgrößen für die Drehzahl.</p>
<h3>1. Ankerspannung (Grunddrehzahlbereich)</h3>
<p>Der Fluss bleibt auf Nennwert. Die Kennlinie wird parallel verschoben. Vorteil: Für ein gegebenes Moment fließt der <strong>kleinste Ankerstrom</strong>, weil <var>m = cΦ·i_{a}</var> mit vollem Fluss arbeitet. Bereich: <var>−ω_{0} … +ω_{0}</var>.</p>
<h3>2. Feldschwächung</h3>
<p>Ist die maximale Ankerspannung erreicht, kommt man nur noch schneller, indem man den Fluss senkt (<var>b</var> &lt; 1). Über Nennfluss hinaus geht es kaum, weil das Eisen sättigt.</p>
$$ [[ω|ω_{0}]] = [[1|b]]·[[u_{a}|u_{a0}]] − [[1|b²]]·[[m_{L}|m_{0}]],   [[m_{L}|m_{0}]] = b·[[i_{a}|i_{a0}]] $$
<p>Folgen der Feldschwächung bei voller Ankerspannung:</p>
<ul>
<li>Die Leerlaufdrehzahl steigt mit <var>1/b</var>.</li>
<li>Die Kennlinie wird weicher: Steigung ~ <var>1/b²</var>.</li>
<li>Für dasselbe Moment braucht man mehr Strom – die Stromwärmeverluste steigen.</li>
<li>Bei gleichem Strom sinkt das verfügbare Moment. Die Leistung bleibt etwa konstant.</li>
</ul>
<div class="box"><h4>Merke</h4>
<p>Grunddrehzahlbereich: Moment konstant verfügbar, Leistung steigt mit der Drehzahl. Feldschwächbereich: Leistung konstant, Moment fällt mit <var>1/ω</var>.</p></div>
<p>Die höchste Drehzahl bei gegebenem Moment erreicht man mit <var>b = 2·m_{L}/m_{0}</var>. Die Punkte maximaler Leistung liegen auf der Hyperbel <var>ω/ω_{0} = ¼·m_{0}/m_{L}</var>.</p>` },

  { id: 'dynamik', title: 'Dynamisches Verhalten', html: `
<p>Annahmen: Die Ankerspannung ist eingeprägt, das Lastmoment ist eine Störgröße, der Fluss ein einstellbarer Parameter. Den Drehwinkel braucht man nicht, er wirkt nicht auf den Motor zurück.</p>
<p>Zwei Zeitkonstanten beschreiben die Maschine:</p>
<div class="tablewrap"><table>
<tr><th>Zeitkonstante</th><th>Formel</th><th>Beschreibt</th></tr>
<tr><td>Ankerzeitkonstante</td><td><var>T_{a} = L_{a}/R_{a}</var></td><td>wie schnell sich der Strom aufbaut (elektrisch)</td></tr>
<tr><td>mechanische Anlaufzeitkonstante</td><td><var>T_{mn} = J·ω_{0}/m_{0}</var></td><td>wie schnell die Drehzahl folgt (mechanisch)</td></tr>
</table></div>
<p>Aus dem linearen BSB (PT1 für den Ankerkreis, Integrator für die Mechanik, Rückführung der induzierten Spannung) folgt in normierten Größen:</p>
$$ Ω(s) = [[b·U_{a}(s) − (T_{a}s + 1)·M_{L}(s)|T_{mn}s·(T_{a}s + 1) + b²]] $$
$$ I_{a}(s) = [[T_{mn}s·U_{a}(s) + b·M_{L}(s)|T_{mn}s·(T_{a}s + 1) + b²]] $$
<p>Der Nenner ist zweiter Ordnung: Die Maschine ist ein schwingungsfähiges System aus zwei Energiespeichern (Induktivität und Schwungmasse). Aus dem Nenner <var>T_{mn}T_{a}s² + T_{mn}s + b²</var> liest man ab:</p>
$$ D = [[1|2b]]·√([[T_{mn}|T_{a}]]) $$
<div class="box"><h4>Was passiert bei Feldschwächung?</h4>
<p>Kleineres <var>b</var> bedeutet größere Dämpfung: Die Maschine wird träger, der Anlauf langsamer und ohne Überschwingen. In den Folien: <var>b = 1</var> gibt <var>D = 1/√2</var>, <var>b = 1/2</var> gibt <var>D = √2</var>.</p></div>
<p><strong>Anlauf:</strong> Beim Einschalten ist <var>u_{i} = 0</var>, also schießt der Strom hoch. Mit steigender Drehzahl wächst <var>u_{i}</var> und der Strom klingt ab. <strong>Laststoß:</strong> Die Drehzahl sackt ab, der Strom steigt auf den neuen Wert <var>m_{L}/m_{0}</var>.</p>` },

  { id: 'kaskade', title: 'Kaskadenregelung', html: `
<p>Elektrische Antriebe regelt man mit ineinander geschachtelten Regelkreisen. Das passt, weil die Strecke kettenförmig ist: Spannung → Strom → Moment → Drehzahl → Lage.</p>
<figure>
<svg viewBox="0 0 660 190" role="img" aria-label="Kaskadenregelung der Gleichstrommaschine">${DEFS}
<text x="4" y="56">ω soll</text><path class="l" d="M44 60H62" marker-end="url(#ar)"/><circle class="b3" cx="72" cy="60" r="9"/>
<path class="l" d="M81 60H96" marker-end="url(#ar)"/><rect class="b" x="98" y="40" width="84" height="40"/><text class="mid" x="140" y="57">Drehzahl-</text><text class="mid" x="140" y="72">regler</text>
<path class="l" d="M182 60H204" marker-end="url(#ar)"/><text class="sm" x="183" y="50">i soll</text><circle class="b3" cx="214" cy="60" r="9"/>
<path class="l" d="M223 60H238" marker-end="url(#ar)"/><rect class="b" x="240" y="40" width="74" height="40"/><text class="mid" x="277" y="57">Strom-</text><text class="mid" x="277" y="72">regler</text>
<path class="l" d="M314 60H334" marker-end="url(#ar)"/><rect class="b3" x="336" y="40" width="74" height="40"/><text class="mid" x="373" y="65">Stellglied</text>
<path class="l" d="M410 60H430" marker-end="url(#ar)"/><text class="sm" x="412" y="50">u_a</text><rect class="b2" x="432" y="40" width="80" height="40"/><text class="mid" x="472" y="65">Ankerkreis</text>
<path class="l" d="M512 60H548" marker-end="url(#ar)"/><text class="sm" x="520" y="50">i_a</text><rect class="b2" x="550" y="40" width="64" height="40"/><text class="mid" x="582" y="65">Mechanik</text>
<path class="l" d="M614 60H655" marker-end="url(#ar)"/><text x="640" y="50">ω</text>
<path class="l" d="M530 60V120H214V71" marker-end="url(#ar)"/><text class="sm" x="300" y="114">Strommessung (innerer Kreis, schnell)</text><text class="sm" x="220" y="86">−</text>
<path class="l" d="M632 60V165H72V71" marker-end="url(#ar)"/><text class="sm" x="260" y="159">Drehzahlmessung (äußerer Kreis, langsamer)</text><text class="sm" x="78" y="86">−</text>
</svg>
<figcaption>Der Drehzahlregler gibt dem Stromregler den Sollwert vor.</figcaption>
</figure>
<ul>
<li><strong>Innen:</strong> Stromregelkreis = Drehmomentregelung, weil <var>m ~ i_{a}</var>. Er muss schnell sein.</li>
<li><strong>Außen:</strong> Drehzahlregelkreis. Darüber kann noch ein Lageregelkreis liegen.</li>
</ul>
<div class="box say"><h4>Vorteile, die du nennen solltest</h4>
<ul>
<li>Die Regelaufgabe wird in einfache Teilaufgaben zerlegt. Man legt von innen nach außen aus.</li>
<li>Der Stromsollwert lässt sich <strong>begrenzen</strong>. Das schützt Motor und Stromrichter.</li>
<li>Störungen werden im inneren Kreis ausgeregelt, bevor sie die Drehzahl erreichen.</li>
<li>Für den Entwurf des Drehzahlreglers ersetzt man den geschlossenen Stromregelkreis näherungsweise durch ein <strong>PT1-Glied</strong>.</li>
</ul></div>
<p><strong>Strecke des Stromreglers</strong> (<var>b</var> = 1):</p>
$$ [[I_{a}(s)|U_{a}(s)]] = [[T_{mn}s|T_{mn}T_{a}s² + T_{mn}s + 1]] $$
<p>Stellglied (z. B. Gleichstromsteller) und Strommessung werden je als Verzögerungsglied 1. Ordnung modelliert. Die Zeitkonstante der Speisung liegt bei Stromrichtern im Bereich einiger ms, bei einem rotierenden Generator bei 0,1 bis 1 s.</p>
<p>Bei der Lageregelung verbessert eine <strong>Vorsteuerung</strong> aus einem Führungsgrößenmodell das Folgeverhalten: Drehzahl- und Stromsollwert werden direkt aufgeschaltet, die Regler müssen nur noch Abweichungen korrigieren.</p>` }
  ],
  check: [
    { q: 'Welche zwei Gleichungen koppeln den elektrischen und den mechanischen Teil der GM?', a: 'uᵢ = c·Φ·ω und m_M = c·Φ·iₐ.' },
    { q: 'Was passiert mit der Kennlinie bei Feldschwächung?', a: 'Leerlaufdrehzahl steigt mit 1/b, die Kennlinie wird mit 1/b² steiler (weicher).' },
    { q: 'Welcher Regelkreis liegt bei der Kaskade innen?', a: 'Der Stromregelkreis, er entspricht einer Drehmomentregelung.' }
  ]
},

{
  id: 'asynchronmaschine', n: 6, title: 'Asynchronmaschine und feldorientierte Regelung',
  desc: 'Raumzeiger, Koordinatensysteme, Flussmodell, Vergleich mit der GM',
  sections: [
  { id: 'annahmen', title: 'Modellannahmen', html: `
<p>Hochwertige Drehstromantriebe brauchen ein mathematisches Modell der Maschine. Dafür idealisiert man:</p>
<ul>
<li>Die Wicklung ist kontinuierlich und <strong>sinusförmig</strong> am Umfang verteilt.</li>
<li>Die Maschine ist elektrisch und magnetisch <strong>symmetrisch</strong>.</li>
<li><strong>Sättigung und Eisenverluste</strong> bleiben unberücksichtigt.</li>
<li>End- und Nuteffekte werden vernachlässigt.</li>
</ul>` },

  { id: 'raumzeiger', title: 'Raumzeiger', html: `
<p>Die drei Strangströme wirken räumlich um 120° versetzt. Man fasst ihre gemeinsame Wirkung zu <strong>einem komplexen Vektor</strong> zusammen:</p>
$$ i_{S}(t) = i_{S1} + i_{S2}·e^{j120°} + i_{S3}·e^{j240°} = i_{Sa} + j·i_{Sb} $$
<p>Der Vektor zeigt in die Richtung, in der die Durchflutung gerade am größten ist. Bei symmetrischem Drehstrom läuft er gleichmäßig im Kreis.</p>
<p>Ist der Sternpunkt isoliert, gilt <var>i_{S1} + i_{S2} + i_{S3} = 0</var>. Dann sind nur zwei Ströme unabhängig, und man kann jederzeit zwischen <strong>drei Phasen</strong> und <strong>zwei orthogonalen Komponenten</strong> (a, b) umrechnen. Das ist die 3/2-Wandlung.</p>
<p>Genauso behandelt man Spannungen und Flussverkettungen. Vorteil gegenüber der komplexen Wechselstromrechnung: Die Vektoren sind zeitveränderlich, also lassen sich auch <strong>Übergangsvorgänge</strong> beschreiben, nicht nur stationäre Punkte.</p>` },

  { id: 'koordinaten', title: 'Koordinatensysteme', html: `
<p>Stator und Rotor bewegen sich gegeneinander. Für ein einheitliches Modell muss man alles in <strong>einem</strong> Koordinatensystem ausdrücken. Umrechnen heißt: den Vektor um einen Winkel drehen, also mit <var>e^{jWinkel}</var> multiplizieren.</p>
<div class="tablewrap"><table>
<tr><th>System</th><th>Reelle Achse liegt auf</th><th>Achsen</th><th>Besonderheit</th></tr>
<tr><td>Statorkoordinaten</td><td>Achse der Statorwicklung 1</td><td>a, b</td><td>steht still, Größen sind Wechselgrößen</td></tr>
<tr><td>Rotorkoordinaten</td><td>Achse der Rotorwicklung 1</td><td>–</td><td>dreht mit dem Rotor</td></tr>
<tr><td>Feldkoordinaten</td><td>Vektor der Rotorflussverkettung</td><td>d, q</td><td>dreht mit dem Feld, Größen werden <strong>Gleichgrößen</strong></td></tr>
</table></div>
<figure>
<svg viewBox="0 0 640 270" role="img" aria-label="Statorstromvektor in Feldkoordinaten">${DEFS}
<path class="l" d="M120 220H420" marker-end="url(#ar)"/><text x="425" y="225">a (Stator)</text>
<path class="l" d="M140 240V30" marker-end="url(#ar)"/><text x="148" y="34">b</text>
<path class="c1" d="M140 220L400 125" marker-end="url(#ar)"/><text x="406" y="120">d: Richtung Rotorfluss (i_mR)</text>
<path class="c1" d="M140 220L88 78" marker-end="url(#ar)"/><text x="56" y="70">q</text>
<path class="l" d="M140 220L310 60" marker-end="url(#ar)" stroke-width="2.5"/><text x="316" y="56">i_S</text>
<path class="ld" d="M310 60L343 146"/><path class="ld" d="M310 60L107 134"/>
<path class="c2" d="M140 220L343 146" marker-end="url(#ar)"/><text x="262" y="200">i_Sd → Fluss</text>
<path class="c2" d="M140 220L107 134" marker-end="url(#ar)"/><text x="10" y="160">i_Sq → Moment</text>
<path class="l" d="M230 220A90 90 0 0 0 224 189" /><text x="238" y="210">ρ</text>
</svg>
<figcaption>Der Statorstrom wird auf die Flussrichtung (d) und senkrecht dazu (q) projiziert. ρ ist der Winkel des Rotorflusses.</figcaption>
</figure>` },

  { id: 'schwierig', title: 'Warum die ASM schwieriger ist als die GM', html: `
<ul>
<li>Sie wird mit <strong>drei Wechselspannungen</strong> veränderlicher Frequenz und Amplitude gespeist.</li>
<li>Amplitude, Frequenz und Phase müssen ständig gesteuert werden.</li>
<li>Fluss und Drehmoment hängen beide an denselben Statorgrößen – sie sind <strong>verkoppelt</strong>.</li>
<li>Die Rotorströme sind beim Kurzschlussläufer <strong>nicht messbar</strong>.</li>
</ul>
<p>Die ASM ist eine Mehrgrößen-Regelstrecke. Bei der GM dagegen sind Feld (Erregerstrom) und Moment (Ankerstrom) von Natur aus getrennt.</p>` },

  { id: 'foc', title: 'Idee der Feldorientierung', html: `
<p>Man definiert den <strong>Rotorfluss-Magnetisierungsstrom <var>i_{mR}</var></strong>. Er beschreibt die im Luftspalt umlaufende Flusswelle des Rotors: <var>Ψ_{R} = L_{H}·i_{mR}</var>. Dann betrachtet man den Statorstrom von diesem Vektor aus:</p>
$$ i_{S}·e^{−jρ} = i_{Sd} + j·i_{Sq} $$
<div class="tablewrap"><table>
<tr><th>Komponente</th><th>Wirkung</th><th>Entspricht bei der GM</th></tr>
<tr><td>Längsstrom <var>i_{Sd}</var></td><td>baut den Rotorfluss auf (langsam, mit <var>T_{R}</var>)</td><td>Erregerstrom</td></tr>
<tr><td>Querstrom <var>i_{Sq}</var></td><td>stellt das Drehmoment <strong>sofort</strong></td><td>Ankerstrom</td></tr>
</table></div>
<p>Das Drehmoment ist das Produkt aus Fluss und Querstrom (<var>p</var> Polpaarzahl, <var>σ</var> Streuziffer):</p>
$$ m_{M} = [[2|3]]·p·(1 − σ)·L_{S}·i_{mR}·i_{Sq} $$
<div class="box say"><h4>Der Satz, auf den es ankommt</h4>
<p>„Durch die Feldkoordinaten bekommt die Asynchronmaschine die Struktur einer fremderregten Gleichstrommaschine. Fluss und Drehmoment lassen sich getrennt über <var>i_{Sd}</var> und <var>i_{Sq}</var> einstellen, und aus Wechselgrößen werden Gleichgrößen.“</p></div>` },

  { id: 'flussmodell', title: 'Flussmodell', html: `
<p>Für die Transformation muss man jederzeit wissen, wo der Rotorfluss steht. Messen kann man ihn nicht. Deshalb rechnet ein <strong>Flussmodell</strong> online mit.</p>
$$ T_{R}·[[di_{mR}|dt]] + i_{mR} = i_{Sd} $$
$$ [[dρ|dt]] = ω_{mR} = [[i_{Sq}|T_{R}·i_{mR}]] + p·ω $$
<ul>
<li><strong>Eingänge:</strong> gemessene Statorströme und gemessene Drehzahl</li>
<li><strong>Ausgänge:</strong> Betrag <var>i_{mR}</var> und Winkel <var>ρ</var> des Magnetisierungsstromvektors</li>
</ul>
<p>Erste Gleichung: Der Fluss folgt <var>i_{Sd}</var> wie ein PT1-Glied mit der Rotorzeitkonstante <var>T_{R}</var>. Zweite Gleichung: Das Feld dreht um die Schlupffrequenz <var>i_{Sq}/(T_{R}i_{mR})</var> schneller als der Rotor (<var>p·ω</var>).</p>` },

  { id: 'struktur', title: 'Regelstruktur', html: `
<ol>
<li>Statorströme messen, 3/2-Wandlung in a, b.</li>
<li>Mit <var>e^{−jρ}</var> in Feldkoordinaten drehen: <var>i_{Sd}</var>, <var>i_{Sq}</var>.</li>
<li>Zwei Kaskaden regeln wie bei der GM: Flussregler → <var>i_{Sd}</var>-Regler und Drehzahlregler → <var>i_{Sq}</var>-Regler.</li>
<li>Reglerausgänge sind Spannungssollwerte in d, q. Eine Spannungsentkopplung gleicht die Verkopplung der Achsen aus.</li>
<li>Mit <var>e^{+jρ}</var> zurück in Statorkoordinaten, 2/3-Wandlung auf drei Phasen.</li>
<li>Der Pulswechselrichter stellt die Spannungen.</li>
</ol>
<p>Das Flussmodell liefert in jedem Schritt <var>ρ</var> und <var>i_{mR}</var>. Die feldorientierte Regelung ist das Standardverfahren für drehzahlgeregelte Drehstromantriebe.</p>` }
  ],
  check: [
    { q: 'Was stellt i_Sq ein, was i_Sd?', a: 'i_Sq das Drehmoment, i_Sd den Rotorfluss.' },
    { q: 'Wozu braucht man das Flussmodell?', a: 'Um Lage und Betrag des Rotorflusses zu berechnen, die nicht messbar sind, aber für die Koordinatentransformation gebraucht werden.' },
    { q: 'Welche Größen gehen in das Flussmodell ein?', a: 'Gemessene Statorströme und gemessene Drehzahl.' }
  ]
},

{
  id: 'leistungselektronik', n: 7, title: 'Leistungselektronik und Aktor',
  desc: 'Umrichter, Leistungshalbleiter, Hochsetzsteller, Pulswechselrichter, Traktionsmaschinen',
  sections: [
  { id: 'umrichter', title: 'Aufbau eines Umrichters', html: `
<p>Ein Umrichter macht aus dem festen 50-Hz-Netz ein Drehstromsystem mit einstellbarer Frequenz und Amplitude.</p>
<figure>
<svg viewBox="0 0 640 120" role="img" aria-label="Umrichter mit Zwischenkreis">${DEFS}
<text x="8" y="56">Netz</text><text class="sm" x="8" y="72">3~ 50 Hz</text>
<path class="l" d="M62 60H98" marker-end="url(#ar)"/><rect class="b" x="100" y="36" width="120" height="48"/><text class="mid" x="160" y="57">Gleichrichter</text><text class="mid sm" x="160" y="73">3~ → =</text>
<path class="l" d="M220 60H258" marker-end="url(#ar)"/><rect class="b2" x="260" y="36" width="120" height="48"/><text class="mid" x="320" y="57">Zwischenkreis</text><text class="mid sm" x="320" y="73">Kondensator, U_Z</text>
<path class="l" d="M380 60H418" marker-end="url(#ar)"/><rect class="b" x="420" y="36" width="120" height="48"/><text class="mid" x="480" y="57">Wechselrichter</text><text class="mid sm" x="480" y="73">= → 3~ variabel</text>
<path class="l" d="M540 60H578" marker-end="url(#ar)"/><circle class="b3" cx="605" cy="60" r="24"/><text class="mid" x="605" y="65">ASM</text>
</svg>
<figcaption>Der Zwischenkreis entkoppelt Netz- und Maschinenseite und speichert Energie.</figcaption>
</figure>
<p>Arbeitet die Maschine als Generator (Bremsen), fließt Leistung über den Wechselrichter zurück in den Zwischenkreis.</p>` },

  { id: 'halbleiter', title: 'Leistungshalbleiter', html: `
<p>Leistungshalbleiter arbeiten als <strong>Ventile</strong>: Sie leiten oder sperren, dazwischen gibt es im Betrieb nichts. Umgeschaltet wird periodisch mit der Schaltfrequenz. Die Ansteuersignale kommen aus der Mikroelektronik.</p>
<div class="tablewrap"><table>
<tr><th>Ventil</th><th>Steuerbar?</th><th>Verhalten</th></tr>
<tr><td>Diode</td><td>nein</td><td>leitet bei positiver Spannung <var>u_{AK}</var>, sperrt sonst</td></tr>
<tr><td>Thyristor</td><td>nur einschaltbar</td><td>lässt sich über das Steuersignal <strong>nicht</strong> abschalten</td></tr>
<tr><td>BPT, MOSFET, IGBT, GTO, IGCT, MCT</td><td>ein- und abschaltbar</td><td>idealisiert: Signal <var>s</var> = 1 leitend, <var>s</var> = 0 sperrend</td></tr>
</table></div>
<p>Im <strong>idealisierten</strong> Modell vernachlässigt man: Spannungsabfall im leitenden Zustand, Leckstrom im sperrenden Zustand, Ein- und Ausschaltverzögerung. In Wirklichkeit entstehen genau dort die Durchlass- und Schaltverluste.</p>
<p>Schalter gibt es rückwärts leitend (mit antiparalleler Diode, wie im Pulswechselrichter) und rückwärts sperrend.</p>
<p>Einordnung nach der Tabelle in den Folien: MOSFET schalten am schnellsten bei kleinerer Leistung, IGBT decken den mittleren Bereich ab, GTO und IGCT die höchsten Leistungen bei niedriger Schaltfrequenz.</p>` },

  { id: 'hochsetz', title: 'Hochsetzsteller', html: `
<p>Der Hochsetzsteller macht aus einer niedrigen Gleichspannung eine höhere. Beispiel: die gleichgerichtete Spannung eines Generators bei niedriger Drehzahl.</p>
<p><strong>Bauteile:</strong> Drossel <var>L</var> in Reihe, Transistor <var>T</var> gegen Masse, Diode <var>D</var> zum Ausgang, Kondensator <var>C</var> parallel zur Last.</p>
<ol>
<li><strong>Transistor ein</strong> (<var>t_{ein}</var>): Die Drossel liegt an <var>U_{e}</var>, ihr Strom steigt, sie lädt Energie. Die Diode sperrt, der Kondensator versorgt die Last.</li>
<li><strong>Transistor aus</strong> (<var>t_{aus}</var>): Die Drossel hält ihren Strom aufrecht. Ihre Spannung addiert sich zu <var>U_{e}</var> und drückt den Strom über die Diode in den Ausgang.</li>
</ol>
$$ U_{d} = [[T_{S}|t_{aus}]]·U_{e} = [[1|1 − D]]·U_{e},   D = [[t_{ein}|T_{S}]] $$
<p><var>D</var> ist hier die relative Einschaltdauer (Tastgrad), <var>T_{S} = 1/f_{S}</var> die Periodendauer. Beispiel: <var>D</var> = 0,5 verdoppelt die Spannung. Die Formel gilt im <strong>nichtlückenden Betrieb</strong>, also solange der Drosselstrom nie null wird.</p>` },

  { id: 'gleichrichter', title: 'Drehstrom-Gleichrichter', html: `
<p>Sechs Dioden in Brückenschaltung (drei Halbbrücken). Es leitet immer das Diodenpaar, an dem gerade die größte verkettete Spannung liegt. Pro Netzperiode entstehen sechs Spannungskuppen – daher <strong>6-Puls-Schaltung</strong>. Ungesteuert, weil Dioden nicht ansteuerbar sind.</p>
$$ U_{d} = [[3|π]]·û_{12} ≈ 0,955·û_{12} $$
<p><var>û_{12}</var> ist der Scheitelwert der verketteten Spannung. Die Gleichspannung hat nur eine kleine Welligkeit.</p>` },

  { id: 'pwr', title: 'Pulswechselrichter', html: `
<p>Der Pulswechselrichter (PWR) formt die Zwischenkreis-Gleichspannung <var>U_{Z}</var> in ein dreiphasiges Wechselspannungssystem um. Er hat sechs Schalter, zwei je Phase (Halbbrücke).</p>
<p>Jede Phase kann nur zwei Werte annehmen, bezogen auf die Mitte des Zwischenkreises: <var>+U_{Z}/2</var> oder <var>−U_{Z}/2</var>. Die verketteten Spannungen sind Differenzen:</p>
$$ u_{UV} = u_{U0} − u_{V0},   u_{VW} = u_{V0} − u_{W0},   u_{WU} = u_{W0} − u_{U0} $$
<h3>Pulsweitenmodulation (Trägerverfahren)</h3>
<p>Eine sinusförmige Sollspannung wird mit einem hochfrequenten Dreiecksignal verglichen. Ist der Sollwert größer, schaltet der obere Schalter ein, sonst der untere. Das Ergebnis sind Pulse, deren <strong>Breite</strong> dem Sinus folgt.</p>
<ul>
<li>Die Ausgangsspannung enthält die gewünschte <strong>Grundschwingung</strong> und unerwünschte <strong>Oberschwingungen</strong>.</li>
<li>Die Induktivität der Maschine glättet den Strom, er wird nahezu sinusförmig.</li>
<li>Höhere Schaltfrequenz: glatterer Strom, aber mehr Schaltverluste.</li>
</ul>` },

  { id: 'aktor', title: 'Signalelektronik und mechatronischer Aktor', html: `
<p>Beispiel Drehzahlregelung der ASM. Der regelnde Mikrorechner</p>
<ul>
<li>liest über A/D-Wandler zwei Strangströme und über den Drehgeber die Drehzahl ein,</li>
<li>rechnet online das Fluss- bzw. Maschinenmodell und die feldorientierte Regelung,</li>
<li>erzeugt über den Modulator die Schaltsignale. Gate-Treiber geben sie an die Leistungshalbleiter weiter.</li>
</ul>
<div class="box"><h4>Merke</h4><p>Gemessen werden nur Ströme, Spannungen und Drehzahl. Eine Drehmomentmessung wäre zu aufwändig. Moment und Fluss liefert das Modell.</p></div>
<p><strong>Mechatronischer Aktor</strong> = Mikroelektronik + Leistungselektronik + elektrische Maschine mit Last. Hier treffen sich alle Kapitel: Informationsverarbeitung, Stellglied und Grundsystem aus der Grundstruktur.</p>` },

  { id: 'traktion', title: 'Maschinen für die Traktion', html: `
<p>Vergleich aus den Folien (++ sehr gut, −− sehr schlecht):</p>
<div class="tablewrap"><table>
<tr><th>Kriterium</th><th>ASM</th><th>PSM</th><th>SRM</th><th>GM</th><th>TFM</th></tr>
<tr><td>Momentendichte</td><td>+/−</td><td>++</td><td>+</td><td>−</td><td>++</td></tr>
<tr><td>Wirkungsgrad</td><td>+/−</td><td>++</td><td>+/−</td><td>−</td><td>+</td></tr>
<tr><td>Masse</td><td>+</td><td>++</td><td>+</td><td>−</td><td>++</td></tr>
<tr><td>Stand der Technik</td><td>++</td><td>+</td><td>+/−</td><td>++</td><td>−−</td></tr>
<tr><td>Kosten Maschine</td><td>+/−</td><td>+/−</td><td>+</td><td>−−</td><td>−</td></tr>
<tr><td>Fertigung</td><td>+</td><td>+/−</td><td>++</td><td>−</td><td>−−</td></tr>
<tr><td>Geräusch</td><td>+</td><td>++</td><td>−</td><td>+</td><td>−−</td></tr>
</table></div>
<p>ASM = Asynchronmaschine, PSM = permanenterregte Synchronmaschine, SRM = geschaltete Reluktanzmaschine, GM = Gleichstrommaschine, TFM = Transversalflussmaschine.</p>
<ul>
<li><strong>PSM:</strong> beste Momentendichte und bester Wirkungsgrad, leise.</li>
<li><strong>ASM:</strong> ausgereift, robust, einfach zu fertigen.</li>
<li><strong>SRM:</strong> sehr einfach zu fertigen und günstig, aber laut. Das Moment entsteht durch Reluktanz: Der gezahnte Rotor will sich so stellen, dass der magnetische Widerstand am kleinsten ist.</li>
<li><strong>TFM:</strong> hohe Momentendichte, aber aufwändig, laut und noch wenig ausgereift.</li>
</ul>
<p>Aus der Institutsforschung: Axialfluss-Synchronmotor mit Permanentmagneten. Hohe Momenten- und Leistungsdichte bei niedriger Drehzahl, flache Bauform, gut als getriebeloser Radnabenantrieb.</p>` }
  ],
  check: [
    { q: 'Welche drei Stufen hat ein Umrichter?', a: 'Gleichrichter, Zwischenkreis, Wechselrichter.' },
    { q: 'Wie groß ist die Ausgangsspannung des Hochsetzstellers bei D = 0,75?', a: 'U_d = U_e / (1 − 0,75) = 4·U_e.' },
    { q: 'Welches Ventil lässt sich nicht über das Steuersignal abschalten?', a: 'Der Thyristor. Die Diode ist gar nicht steuerbar.' }
  ]
},

{
  id: 'rechnen', n: 8, title: 'Rechenaufgaben aus den Übungsblättern',
  desc: 'Ü1 bis Ü3 mit Lösungsweg zum Aufklappen',
  sections: [
  { id: 'hinweis', title: 'Hinweis', html: `
<div class="box say"><h4>Die Lösungen sind selbst gerechnet</h4><p>In den Übungsblättern stehen nur die Aufgaben. Die Lösungswege hier sind keine offiziellen Musterlösungen. Vergleiche sie mit deinen Mitschriften.</p></div>
<p>Erst selbst versuchen, dann aufklappen. In der mündlichen Prüfung zählt, dass du den Ansatz erklären kannst.</p>` },

  { id: 'u1', title: 'Ü1 Mechanik', html: `
<h3>1.1 Dünnwandige Hohlkugel</h3>
<p>Trägheitsmoment einer dünnwandigen, homogenen Kugel mit Radius <var>R</var>, Wanddicke <var>d</var> ≪ <var>R</var>, Dichte <var>ρ</var>.</p>
<details class="sol"><summary>Lösungsweg</summary><div>
<p>Ansatz <var>J = ∫ r² dM</var>. Ein Ring unter dem Polwinkel <var>θ</var> hat den Achsabstand <var>r = R·sin θ</var> und die Masse <var>dM = ρ·d·2πR·sin θ·R·dθ</var>.</p>
$$ J = 2πρdR^{4}·∫_{0}^{π} sin³θ dθ = 2πρdR^{4}·[[4|3]] = [[8|3]]·π·ρ·d·R^{4} $$
<p>Mit der Kugelmasse <var>M = 4πR²dρ</var> wird daraus <var>J = ⅔·M·R²</var>.</p>
</div></details>

<h3>1.2 Fahrzeugmasse auf die Kurbelwelle bezogen</h3>
<p><var>M</var> = 1000 kg, <var>v</var> = 150 km/h bei <var>n</var> = 6000 U/min im 4. Gang. a) Bezogenes Trägheitsmoment? b) Im 1. Gang bei Untersetzung 4 zwischen 4. und 1. Gang?</p>
<details class="sol"><summary>Lösungsweg</summary><div>
<p>Gleiche kinetische Energie: <var>½·J_{e}·ω² = ½·M·v²</var>, also <var>J_{e} = M·(v/ω)²</var>.</p>
<p><var>v</var> = 150/3,6 = 41,67 m/s. <var>ω</var> = 2π·6000/60 = 628,3 rad/s. <var>v/ω</var> = 0,0663 m.</p>
$$ J_{e} = 1000 kg · (0,0663 m)² ≈ 4,4 kg·m² $$
<p>b) Im 1. Gang fährt das Fahrzeug bei gleicher Motordrehzahl nur ein Viertel so schnell. <var>v/ω</var> wird ein Viertel, <var>J_{e}</var> ein Sechzehntel:</p>
$$ J_{e,1} = [[4,4|16]] ≈ 0,27 kg·m² $$
<p>Deshalb beschleunigt das Auto im 1. Gang so viel besser: Der Motor „sieht“ nur ein Sechzehntel der Trägheit.</p>
</div></details>

<h3>1.3 Schwingender Kolben</h3>
<p>Kolben der Masse <var>M</var>, reibungsfrei, <var>x = x̂·sin(ωt)</var>. Gesucht: Kraft und Leistung über der Zeit, Art der Leistung.</p>
<details class="sol"><summary>Lösungsweg</summary><div>
<p>Zweimal ableiten: <var>v = x̂ω·cos(ωt)</var>, <var>a = −x̂ω²·sin(ωt)</var>.</p>
$$ f(t) = M·a = −M·x̂·ω²·sin(ωt) $$
$$ p(t) = f·v = −M·x̂²·ω³·sin(ωt)·cos(ωt) = −[[1|2]]·M·x̂²·ω³·sin(2ωt) $$
<p>Die Leistung pendelt mit doppelter Frequenz um null, ihr Mittelwert ist null. Es ist reine <strong>Blindleistung</strong> (Beschleunigungsleistung): Die kinetische Energie wird nur zwischen Antrieb und Masse hin- und hergeschoben, es wird keine Arbeit verrichtet.</p>
</div></details>

<h3>1.4 Walze mit Achsabstand (Satz von Steiner)</h3>
<p>Walze mit Radius <var>r_{a}</var>, Länge <var>l</var>, Dichte <var>ρ</var> rotiert im Abstand <var>a</var> um die y-Achse. Annahme: Die Walzenachse liegt parallel zur y-Achse.</p>
<details class="sol"><summary>Lösungsweg</summary><div>
<p><strong>Ansatz mit Steiner:</strong> Eigenanteil um die Schwerpunktachse plus Masse mal Abstand im Quadrat.</p>
<p><var>M = ρ·π·r_{a}²·l</var>, <var>J_{S} = ½·M·r_{a}²</var> (Vollzylinder, Sonderfall der Hohlzylinderformel mit <var>r_{1}</var> = 0).</p>
$$ J = J_{S} + M·a² = ρ·π·r_{a}²·l·([[r_{a}²|2]] + a²) $$
<p><strong>Direkter Ansatz:</strong> <var>J = ∫ r² dM</var> mit dem Abstand jedes Massenelements zur y-Achse. Legt man den Ursprung in die Walzenachse, ist <var>r² = a² + 2a·x′ + x′² + z′²</var>. Der gemischte Term fällt bei der Integration aus Symmetrie weg, übrig bleiben genau <var>M·a²</var> und <var>J_{S}</var>. Das ist der Beweis des Steiner-Satzes.</p>
</div></details>` },

  { id: 'u2', title: 'Ü2 Elastische Welle', html: `
<p>Ein Motor treibt über eine elastische Welle (Steifigkeit <var>S</var>) eine Last mit Trägheitsmoment <var>Θ_{2}</var>. An der Last wirkt ein drehzahlproportionales Reibmoment <var>m_{R} = k_{R}·ω_{2}</var>. <var>ω_{1}</var> ist eingeprägt.</p>
<details class="sol"><summary>a) Differentialgleichung</summary><div>
<p>Drallsatz an der Last: Wellenmoment treibt, Reibung bremst.</p>
$$ Θ_{2}·[[dω_{2}|dt]] = S·(ε_{1} − ε_{2}) − k_{R}·ω_{2} $$
<p>Einmal nach der Zeit ableiten, damit statt der Winkel die Drehzahlen dastehen (<var>dε/dt = ω</var>):</p>
$$ Θ_{2}·ω̈_{2} + k_{R}·ω̇_{2} + S·ω_{2} = S·ω_{1} $$
<p>Normieren durch Teilen durch <var>S</var> und Vergleich mit der Standardform:</p>
$$ [[1|ω_{0}²]]·ω̈_{2} + [[2D|ω_{0}]]·ω̇_{2} + ω_{2} = ω_{1},   ω_{0} = √([[S|Θ_{2}]]),   D = [[k_{R}|2·√(S·Θ_{2})]] $$
</div></details>
<details class="sol"><summary>b) Blockschaltbild und Übertragungsfunktion</summary><div>
<p>BSB: Summierstelle bildet <var>ω_{1} − ω_{2}</var>, ein Integrator mit <var>S</var> macht daraus das Wellenmoment, davon wird <var>k_{R}·ω_{2}</var> abgezogen, ein zweiter Integrator mit <var>1/Θ_{2}</var> liefert <var>ω_{2}</var>. Zwei Rückführungen von <var>ω_{2}</var>.</p>
$$ [[Ω_{2}(s)|Ω_{1}(s)]] = [[1|1 + [[2D|ω_{0}]]·s + [[1|ω_{0}²]]·s²]] $$
<p>Ein PT2-Glied mit Verstärkung 1: Stationär dreht die Last genauso schnell wie der Motor.</p>
</div></details>
<details class="sol"><summary>c) Aperiodische Dämpfung und Sprungantwort</summary><div>
<p>Kein Überschwingen ab <var>D</var> ≥ 1. Der aperiodische Grenzfall ist <var>D</var> = 1:</p>
$$ k_{R} = 2·√(S·Θ_{2}) $$
<p>Dann hat der Nenner eine doppelte Polstelle bei <var>s = −ω_{0}</var>. Für einen Sprung von <var>ω_{1}</var> auf <var>ω̂_{1}</var>, Last in Ruhe, Welle unverdreht:</p>
$$ ω_{2}(t) = ω̂_{1}·[1 − (1 + ω_{0}t)·e^{−ω_{0}t}] $$
<p>Kontrolle: Bei <var>t</var> = 0 sind Wert und Steigung null (Stetigkeit der Drehzahl, kein Wellenmoment). Für große <var>t</var> geht <var>ω_{2}</var> gegen <var>ω̂_{1}</var>.</p>
</div></details>` },

  { id: 'u3', title: 'Ü3 Gleichstrommotor am Hubwerk', html: `
<p>Konstant erregter Gleichstrommotor in einer Förderanlage. Im Ruhezustand (<var>i_{a}</var> = 0, <var>ω</var> = 0) hält eine Bremse das durchziehende Lastmoment <var>m_{W}</var>. Bei <var>t</var> = 0 wird die Spannung <var>U_{1}</var> eingeschaltet und gleichzeitig die Bremse gelüftet.</p>
<details class="sol"><summary>a) Stationäre Hubdrehzahl</summary><div>
<p>Stationär muss das Motormoment die Last tragen: <var>i_{a} = m_{W}/(c·Φ_{e0})</var>. Eingesetzt in die Ankergleichung ohne Ableitung:</p>
$$ ω_{1} = [[U_{1}|c·Φ_{e0}]] − [[R_{a}·m_{W}|(c·Φ_{e0})²]] $$
</div></details>
<details class="sol"><summary>b) Verlauf von Drehzahl und Strom</summary><div>
<p>Zwei gekoppelte Gleichungen: <var>L_{a}·di_{a}/dt + R_{a}i_{a} + cΦ·ω = U_{1}</var> und <var>Θ·dω/dt = cΦ·i_{a} − m_{W}</var>. Daraus wird eine Dgl. 2. Ordnung mit dem Nenner <var>T_{mn}T_{a}s² + T_{mn}s + 1</var> (vgl. Gl. 2.50).</p>
<p>Anfangswerte: <var>ω(0) = 0</var>, <var>i_{a}(0) = 0</var>. Weil noch kein Strom fließt, wirkt zuerst nur die Last:</p>
$$ [[dω|dt]](0) = −[[m_{W}|Θ]] $$
<p>Lösung für den schwingfähigen Fall mit <var>δ = 1/(2T_{a})</var>, <var>ω_{e} = √(1/(T_{mn}T_{a}) − δ²)</var>:</p>
$$ ω(t) = ω_{1} + e^{−δt}·[A·cos(ω_{e}t) + B·sin(ω_{e}t)],   A = −ω_{1},   B = [[−m_{W}/Θ − δ·ω_{1}|ω_{e}]] $$
<p>Den Strom erhält man aus der Bewegungsgleichung:</p>
$$ i_{a}(t) = [[1|c·Φ_{e0}]]·(m_{W} + Θ·[[dω|dt]]) $$
<p>Bild dazu: Die Drehzahl geht erst ins Negative (Last sackt ab), dreht um und schwingt gedämpft auf <var>ω_{1}</var> ein. Der Strom startet bei null und schwingt auf <var>m_{W}/(cΦ_{e0})</var> ein.</p>
</div></details>
<details class="sol"><summary>c) Maximale Drehzahl in Senkrichtung</summary><div>
<p>Am tiefsten Punkt ist <var>dω/dt = 0</var>. Das ist genau der Moment, in dem das Motormoment das Lastmoment erreicht: <var>i_{a}(t*) = m_{W}/(cΦ_{e0})</var>. Man bestimmt <var>t*</var> aus <var>dω/dt = 0</var> und setzt in <var>ω(t)</var> ein.</p>
</div></details>
<details class="sol"><summary>d) Absacken verhindern</summary><div>
<p>Die Bremse erst lüften, wenn der Ankerstrom schon aufgebaut ist und das Motormoment das Lastmoment trägt (<var>i_{a} = m_{W}/(cΦ_{e0})</var>). Die Last sackt ab, weil die Ankerinduktivität den Stromaufbau verzögert, während das Lastmoment sofort wirkt.</p>
</div></details>` }
  ],
  check: []
}
];
