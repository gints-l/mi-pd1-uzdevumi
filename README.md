# mi-pd1-uzdevumi

## Par lietotni

**"Mani uzdevumi"** ir vienkārša uzdevumu saraksta tīmekļa lietotne. Tā ir veidota ar tīru HTML, CSS un JavaScript, bez bibliotēkām. Saskarne ir latviešu valodā.

Lietotne sastāv no trim failiem:

| Fails | Saturs |
|-------|--------|
| `index.html` | Lapas struktūra |
| `style.css` | Izskats |
| `app.js` | Lietotnes loģika |

### Funkcijas

1. **Pievienošana**: uzdevumu pievieno ar pogu "Pievienot" vai taustiņu Enter. Atstarpes teksta sākumā un beigās tiek noņemtas, un tukšu tekstu nepievieno.
2. **Atzīmēšana**: ar izvēles rūtiņu uzdevumu atzīmē kā izpildītu, un tā teksts kļūst izsvītrots. Atkārtots klikšķis atzīmi atceļ.
3. **Dzēšana**: katrai rindai ir sava poga "Dzēst".
4. **Filtrs**: pogas Visi / Aktīvie / Izpildītie. Izvēlētā poga ir vizuāli izcelta.
5. **Skaitītājs**: rāda, cik uzdevumu atlicis, piemēram, "Atlikuši 3 uzdevumi" vai "Atlicis 1 uzdevums". Tas atjaunojas pēc katras darbības.
6. **Saglabāšana**: dati glabājas pārlūka `localStorage` ar atslēgu `pd1-uzdevumi` JSON formātā, tāpēc saglabājas arī pēc lapas pārlādes.

Dati tiek glabāti kā masīvs ar objektiem `{ id, text, done }`. Katram uzdevumam ir unikāls `id`, ko iegūst no `Date.now()` un pārbauda, lai nebūtu dublikātu.

## Palaišana

1. Lejupielādējiet vai noklonējiet repozitoriju, lai `index.html`, `style.css` un `app.js` būtu vienā mapē.
2. Atveriet `index.html` ar dubultklikšķi Chrome vai Firefox pārlūkā.
3. Serveris, instalācija un interneta savienojums nav vajadzīgi.

## Papildfunkcija: uzdevuma labošana

Uzdevuma tekstu var labot jau pēc pievienošanas:

- **Dubultklikšķis** uz uzdevuma teksta atver labošanas lauku.
- **Enter** saglabā jauno tekstu. Atstarpes teksta sākumā un beigās tiek noņemtas.
- **Esc** vai **klikšķis ārpus lauka** atceļ labošanu.
- Ja jaunais teksts ir **tukšs**, saglabājas vecais teksts.

## Izmantotais MI rīks

Lietotne izveidota ar **Claude Code** (Anthropic, modelis Claude Opus 5.5) Visual Studio Code paplašinājumā. Uzvednes, ar kurām lietotne veidota, ir failā [uzvednes.md](uzvednes.md).

- Pamata lietotne radīta pēc strukturētas uzvednes. Tajā bija aprakstīta loma, mērķis, tehnoloģijas, funkcijas, elementu ID, datu struktūra un ierobežojumi.
- Papildfunkcijai MI vispirms piedāvāja plānu. Lietotājs izvēlējās, kā rīkoties neskaidrajos gadījumos (klikšķis ārpus lauka un tukšs teksts), un tikai pēc tam MI veica izmaiņas kodā.
- Kodu pārskatīja un testēja lietotājs.
