# Reposicionamiento freelance (es-AR)

Objetivo: convertir el sitio de un portfolio que se describe a un sitio que vende desarrollo web a PyMEs y emprendedores de Rosario y Argentina.
Branch: `feat/freelance-posicionamiento` (crear antes del primer cambio de código).
Delivery strategy: `ask-on-risk`. Forecast: ~900 authored changed lines.
Test runner: **ninguno configurado**. Excepción documentada en `## Checks`.

## Specs

- **S1** — El sitio pasa a español (es-AR) como idioma principal; el inglés queda disponible en `/en/`.
  Evidence: L4 — "si quiero el cambio de idioma".
- **S2** — La home conserva el diseño actual: hero, Reflective Card, animaciones y scroll no se rediseñan.
  Evidence: L3 — "el portfolio ya es una gran home".
- **S3** — La home deja de describirse y pasa a vender.
  Quote: "que mi web pase a venderme y no a mostrarme solaente".
- **S4** — Público primario: PyMEs y emprendedores de Rosario y alrededores, y Argentina en general.
  Evidence: L1 — "conseguir clientes freelance, en argentina ... (rosario y alrededores + argentina general)"; L5 — "PyME y emprendedor".
- **S5** — Posicionamiento: promesa de "desarrollo web / producto digital a medida"; las páginas que rankean usan lenguaje de cliente ("sitios web", "tiendas online", "sistemas a medida"), no "ingeniería de productos digitales".
  Evidence: L4 — "desarrollos web, ingenieria de productos digitales..etc..".
- **S6** — Cada ruta pública emite su propio HTML con `lang`, `title`, `description`, `canonical`, `og:locale` y `hreflang` correctos por locale.
  Origin: audit — hoy todas las rutas comparten el `index.html` y el same canonical.
- **S7** — Local SEO: landing `/desarrollo-web-rosario`, `areaServed` + `ProfessionalService` en JSON-LD, sitemap por locale, Google Business Profile.
  Evidence: L1 — "armar un buen SEO para mi region (rosario y alrededores + argentina general)".
- **S8** — El contenido actual no se elimina: el sitio en inglés se preserva condensado en `/en/`.
  Evidence: L1 — "mi portfolio lo hice enteramente en ingles, porque mi objetivo era el encontrar trabajo".
- **S9** — Una sola identidad de LinkedIn en todo el sitio y en el JSON-LD (`sameAs` consistente).
  Origin: audit — hoy conviven `linkedin.com/in/gianni-pasquinelli`, `linkedin.com/in/giannipasquinelli/` y `linkedin.com/in/gianni-pasquinelli/` entre Footer, Contact e `index.html`.
- **S10** — No se ofrece e-commerce en el sitio. Solo se agrega cuando exista un caso real construido.
  Evidence: L6 — "nunca hice un e-commerce es mi gran falta".
- **S11** — El CV se mantiene como página propia y la descarga del PDF vive dentro de esa página, no en el hero.
  Evidence: L6 — "el download cv puede ir dentro de la pagina cv web, que se mantiene".
- **S12** — El home sigue el orden de una página de venta: Hero → Servicios → Proyectos → Sobre mí → Contacto.
  Evidence: L7 + confirmación de estructura.
- **S13** — Formación sale del home (sigue existiendo en `/resume`). Herramientas sale del home en español y se conserva en `/en/`, donde aporta señal técnica a un recruiter.
  Evidence: L7 — "la seccion de estudios creo que la vamos a tener que sacar, no es relevante al cliente".
- **S14** — El scroll narrativo de proyectos primarios deja de renderizarse. `PrimaryProjectsSection` medía `h-[180vh]` por proyecto: 540vh con tres primarios.
  Evidence: L7 — "puede que tambien haya que quitar los proyectos destacados con el scroll". Requiere confirmación explícita porque el AGENTS.md lo fija como decisión bloqueada.
- **S15** — Las cards de proyecto son clickeables y navegan al demo o al repo.
  Evidence: L7 — "no son clickeables".
- **S16** — Cada proyecto relevante se cuenta como caso: rubro, problema, qué se construyó, resultado, link. Y tiene su propia página en `/casos/<slug>`.
  Evidence: L8 — "la web esta bien, pero no es la web de venta que busco".
- **S17** — El home incluye una sección de proceso con pasos y expectativa de tiempo.
- **S18** — El home incluye una sección de preguntas frecuentes que responde precio, plazos y soporte.
- **S19** — WhatsApp es el CTA primario del sitio.
  Origin: audit — no existe ningún canal de WhatsApp y el formulario público de contacto tampoco.
- **S20** — Los casos son **visuales primero**: imagen grande, rubro, título, resultado en una línea y link. El detalle (problema / qué construí) queda en los datos para las páginas `/casos/<slug>`, no en la card.
  Evidence: L15 — "esa card de solo texto no dice nada, no vende nada, hay que mostrar las imagenes... importa mas una buena imagen que todo el detalle del trabajo realizado".
- **S21** — El About es una bio breve de tres párrafos, sin jerga de desarrollo.
  Evidence: L15 — "el about es plano y muy corto, una pequeña bio estaria ien" y "el que contrate no tiene ni idea de que es un ticket".

## Assumptions

- **A1 — Arquitectura.** RESUELTO: **se mantiene Vite + React**. El contenido vive en Supabase y se edita desde un admin que el usuario sigue manteniendo; eso anula la ventaja principal de Astro (contenido estático en markdown con content collections) y agregaría el costo de re-hospedar el admin como isla o app aparte. El requisito real es HTML con `<head>` propio por ruta pública, y eso se resuelve con generación estática en build sobre React. Astro queda descartado por costo/beneficio.
  - Las páginas que necesitan SEO (servicios, Rosario, casos) son simples y sin animación: se pueden generar estáticas sin fricción.
  - El home con hero WebGL es el único componente difícil de prerenderar. Puede quedarse en render de cliente o usar un esqueleto estático.
  - Fase 2 evalúa en este orden: `vite-react-ssg`; si rompe por WebGL/motion, prerender de solo las rutas de contenido; último recurso, inyección de `<head>` en build.
- **A2 — Dominio.** Un solo dominio propio, un solo repo. `giannipasquinelli.com.ar` si el foco es Argentina; `.com` si se quiere conservar opción internacional.
- **A3 — Hero copy.** CONFIRMADO. Opción "Contraste". Forma final: h1 "Productos digitales a medida" + "Sin plantillas." / "Sin intermediarios."

## Design — the sales site

### Principle
The current site proves craft. The sales site must prove competence and remove friction. Same visual identity, but restrained: **the hero is the only spectacle**; everything below it is quiet, scannable and conversion-first. A PyME owner is reading on a mid-range phone, in a hurry, deciding whether this person can be trusted with their business.

The portfolio was the proof. The sales site has to be proof *by being fast, clear and easy to contact*, not by being impressive.

### Home structure

| # | Section | Job | Content |
|---|---|---|---|
| 1 | Hero | Stop the scroll, state the offer | H1 promise, one line of who it is for, primary CTA, one line of proof |
| 2 | Servicios | Answer "what can I buy" | 2 cards: what it solves, for whom, CTA |
| 3 | Casos | Prove it | 3 cards: problem → what was built → result → live link |
| 4 | Proceso | Remove the black-box fear | 4 steps with a time expectation |
| 5 | Sobre mí | Credibility | 3 short paragraphs max |
| 6 | Preguntas | Handle objections | 6 questions, including price and timing |
| 7 | Contacto | Convert | WhatsApp primary, email secondary |
| 8 | Footer | Local signal | Rosario, Santa Fe, Argentina |

### Copy rules
- Client language everywhere: "página web", "sistema", "presupuesto", "turnos". Never "producto digital" in a heading a client reads first.
- Every section answers one question and ends with one action.
- Never claim a capability without a project that backs it. E-commerce stays out until one exists.

### Case card format

Two formats, never mixed. The difference is factual, not cosmetic: one had a client, the other did not.

**Client case**
```
Rubro          → "Pastelería, Rosario"
Problema       → one or two lines, the client's own words if possible
Qué construí   → one or two lines, plain language
Resultado      → one concrete line (orders, bookings, time saved)
Link           → live site
```

**Product case** (own products: Plataforma 1810, Kli)
```
Qué es         → one line, what the product does and for whom
Qué construí   → scope: auth, panel, plans, themes, payments, whatever applies
Estado         → live, in production, what it runs today
Link           → live site
```

Rules:
- Never present an own product as client work: no invented client, no invented metric, no invented testimonial.
- Own products are framed as evidence of end-to-end ownership, which is a stronger signal for a client than an outsourced build.
- Results only appear when they are real and measurable. Otherwise the "Resultado" line is omitted, not softened.

Each case is also a **page** (`/casos/<slug>`), not only a card. That page targets one niche keyword and is the highest-leverage SEO asset a freelancer has: proof and search intent in the same URL.

**Worked example — El Rey del Chajá (client case, verifiable facts only)**
```
Rubro        → Pastelería artesanal, Rosario. Desde 1960, tercera generación.
Problema     → Tenía un sitio sobre un template de Framer: poco claro, sin SEO,
               y cada cambio de precio obligaba a llamar al desarrollador.
Qué construí → Sitio nuevo de cero en Astro, con panel de administración para
               editar precios y contenido, y un generador de imágenes para las
               3 pantallas de 55" del local, manejado desde el mismo panel.
Resultado    → El negocio actualiza precios y pantallas sin depender de un tercero.
Link         → elreydelchaja.com
```
The address (Blvd. Oroño 2955), the 232 Google reviews and the business history are public and verifiable. The problem, the scope and the autonomy outcome come from the user's own account of the build.

This case is the flagship. It proves the whole offer at once: frontend, SEO, backoffice, and integration with the physical store. It is also the clearest sales hook available: **"no dependés de mí para cambiar un precio"**.

### Case slate (read from production, 2026-11-13)

| Project | Type | What is actually live | Case angle |
|---|---|---|---|
| El Rey del Chajá | Client work | Sitio en Astro, panel de administración para precios y contenido, y generador de imágenes para 3 pantallas de 55" del local, todo desde el mismo panel | **Flagship.** Prueba frontend + SEO + backoffice + integración con el local físico. Hook: "no dependés de mí para cambiar un precio". |
| Plataforma 1810 | Own product | Onboarding en 5 pasos, temas, planes, acceso premium, login sin contraseña, panel de edición | **Sistemas.** No es una landing: es un producto con panel, planes y cuentas. |
| Kli | Own product | Seis etapas de precio, cobro integrado, eventos, contenido y memoria | **Sistemas.** Prueba de pagos, suscripciones y lógica de negocio. |

Relationship (L11): 1810 and Kli are **own products**. They are framed as product cases, never as client work, and never with invented metrics or testimonials. For a buyer, "built this alone, end to end, still live" is stronger evidence than an outsourced build.

`holocruxe.com` no devolvió contenido (probablemente app JS o bloqueo). Confirmar qué es o descartarlo del slate.

Strategic read: the two strongest builds are **products**, not websites. The positioning "hago páginas web" undersells the evidence. The honest structure is two offers on one site:
- **Sitios** → probado por El Rey del Chajá. Entrada para PyMEs de Rosario.
- **Sistemas a medida** → probado por Plataforma 1810 y Kli. Ticket alto.

Open question: whether 1810 and Kli are client work or own products. The case framing changes radically:
- Client work → "problema del cliente → solución → resultado".
- Own product → "producto propio, de cero a producción", which is strong but is not client proof and must not be presented as such.

### Visual rules
- Hero keeps `ReflectiveCard`, `LightRays` and the gradient title. Untouched.
- **Animation source: React Bits only** (https://reactbits.dev). Every existing animated component in the repo already comes from there (`ReflectiveCard`, `LightRays`, `CurvedLoop`, `GradientText`, `ScrollStack`). No hand-rolled animations and no other animation library. Rule recorded in `AGENTS.md`.
- Below the hero: no continuous motion, no parallax.
- One accent (`#7a43c1`) per section, never two.
- `CurvedSectionTitle` keeps brand continuity but appears once per section.
- Text sections cap at `max-w-3xl`. Cards in a 2-column grid on desktop, 1 on mobile.
- Minimum body size 15px on mobile; contrast `text-neutral-300` or lighter on `neutral-950`.
- Every interactive element gets a visible focus state.

### Conversion rules
- **WhatsApp is the primary CTA.** A Rosario PyME will not fill a form. It gets a persistent, obvious button in the header and in contact.
- Email and LinkedIn stay as secondary options for people who prefer them.
- One primary action per screen. The hero CTA and the contact section are the same action.
- The `AGENTS.md` contact-form spec (submit/reset/loading/success/error) is currently unimplemented. Recommendation: WhatsApp first, and keep a 3-field form as fallback, not as the main path.
- `public/_redirects` contains `/success.html` and `/success` rules pointing to a file that does not exist. Remove them or restore the page.

### SEO architecture
- Spanish `es-AR` at `/`, English at `/en/*`.
- Routes: `/`, `/servicios/desarrollo-web`, `/servicios/sistemas-a-medida`, `/desarrollo-web-rosario`, `/casos/<slug>`, `/contacto`.
- Each route ships its own static HTML with `lang`, `title`, `description`, `canonical`, OG and `hreflang`.
- `ProfessionalService` schema with `areaServed`: Rosario, Funes, Roldán, Granadero Baigorria, Villa Gobernador Gálvez, Pérez, San Lorenzo.
- One strong local page beats five thin city pages. No doorway pages.
- Google Business Profile as a service-area business. Highest local lever, zero code.
- Sitemap per locale, `sameAs` unified (S9).

### Phasing
- **Phase 1 — Conversion.** Structure, copy, cases, process, FAQ, WhatsApp. This is what turns the portfolio into a sales site, and it does not depend on the SEO mechanism.
- **Phase 2 — SEO.** Static HTML per public route, service pages, local page, `ProfessionalService` schema, sitemap, Google Business Profile, own domain.
- **Phase 3 — Content.** More cases, niche pages, one keyword each.

### Differentiation
The Chajá build exposes the real offer: a business does not buy "a website", it buys **not depending on a developer for every price change**. That is the hook. Candidate third service, to confirm: **pantallas / señalización digital** for physical stores, managed from the same admin panel.

### Pricing
Show a floor, never a fixed price. "Desde $X" plus the factors that move it, published where the client can read them.

| Service | Display |
|---|---|
| Sitios web | "Desde $X" |
| Sistemas a medida | "Presupuesto según alcance" |

Published factors that move the price (one FAQ entry):
- number of sections or screens
- custom design vs adapted template
- animation and interaction work
- integrations (payments, WhatsApp, spreadsheets, an existing system)
- content: written by the client or by me
- ongoing maintenance

Rules:
- The "desde" is the floor of the cheapest project actually accepted, never an average.
- **Never publish a number you would not accept.** The client reads "desde" as "the price".
- Quote validity: 15 days. Argentine inflation makes open-ended quotes a loss.
- If a project spans more than a month, quote in ARS with a USD reference.

How to derive the numbers (the client fills them, not the site):
1. Define a working-day rate: what you need to earn per working day.
2. Estimate days per project type (simple landing 2–3, custom-designed site 5–8, custom system 15+).
3. Price = days × day rate + costs (domain, hosting, licences) + a 20% risk margin.
4. The published "desde" is the floor of the smallest project you would still accept.

### Open decisions
- WhatsApp number and whether the button is persistent in the header.
- Contact form: restore per `AGENTS.md` or drop it in favour of WhatsApp.
- Which of the 8 projects become written cases (recommend 3).
- Own domain.
- The actual price numbers for the "desde".

## Tasks

| ID | Task | Specs | Route | Status |
|---|---|---|---|---|
| T1 | Copy español PyME-first (hero, servicios, por qué yo, proceso, CTA) | S3, S4, S5 | inline | done — `src/content/es.js` |
| T2 | Scaffolding i18n: es-AR en `/`, en en `/en/` | S1, S8 | inline | done — `src/i18n/` |
| T3 | Head SEO por ruta + check estructural post-build | S6 | inline (dep. A1) | pending |
| T4 | Páginas `/servicios` y `/desarrollo-web-rosario` | S5, S7 | inline | pending |
| T5 | Schema `areaServed`/`ProfessionalService`, sitemap por locale, robots, `sameAs` unificado | S7, S9 | inline | pending |
| T6 | Versión inglesa condensada en `/en/` | S1, S8 | inline | pending |
| T7 | Checklist sin código: dominio propio, Google Business Profile | S7 | inline | pending |
| T8 | Descarga de CV dentro de `/resume` | S11 | inline | done |
| T9 | Reestructurar el home como página de venta (Servicios + grilla de proyectos) | S3, S12, S13, S14, S15 | inline | done |
| T10 | Eliminar componentes muertos: `PrimaryProjects`, `PrimaryProjectsSection`, `ProjectsGrid` | S14 | inline | pending |
| T11 | Decidir destino de la ruta `/studies` (huérfana tras sacar el nav) | — | inline | pending |
| T12 | Casos: estructura de card + 3 casos escritos | S16 | inline | done — cards; páginas `/casos/<slug>` pending |
| T13 | Sección Proceso (4 pasos con expectativa de tiempo) | S17 | inline | done |
| T14 | Sección Preguntas (6 objeciones, incluido precio y plazos) | S18 | inline | done |
| T15 | WhatsApp como CTA primario + formulario + limpiar `_redirects` muerto | S19 | inline | done — número pendiente en `.env` |

## Checks

No existe runner de tests. La verificación de esta feature es:
`pnpm build` + `pnpm lint` + inspección del HTML emitido (lang, title, canonical, hreflang por ruta) + integridad de enlaces.
T3 agrega un script de verificación estructural mínimo para no depender de inspección manual.

## Log

- **L1** (2026-11-13) — "ufff mi portfolio lo hice enteramente en ingles, porque mi objetivo era el encontrar trabajo, y aunque sea en argentina si esta en ingles esta bien, pero ahora quiero poder conseguir clientes freelance, en argentina, se dificulta mucho tener los dos idiomas, y armar un buen SEO para mi region (rosario y alrededores + argentina general)"
- **L2** (2026-11-13) — "para, entonces, esta complicado, se me ocurre entonces, que en mi portfolio podriamos poner un link nuevo a una pagina de mi como freelance y crear un nuevo sitio, en otro repo y todo? que tal eso, una pagina como \"agencia de desarrollo\"?"
- **L3** (2026-11-13) — "ahhh no me convence el cambio, pero si la explicación. mi home entonces seria la de freelance, pero el portfolio ya es una gran home, no estoy seguro"
- **L4** (2026-11-13) — "para, si quiero el cambio de idioma, y tal vez cambiar lo que expreso? desarrollos web, ingenieria de productos digitales..etc.. que mi web pase a venderme y no a mostrarme solaente"
- **L5** (2026-11-13) — Público primario elegido: "PyME y emprendedor".
- **D1** (2026-11-13) — Se descarta el segundo repo/dominio: parte la autoridad SEO y duplica mantenimiento, justo el costo que L1 quiere evitar. Enfoque aditivo sobre el sitio existente.
- **D2** (2026-11-13) — Corrección de criterio: "ingeniería de productos digitales" es lenguaje de vendedor, no de comprador. Va en la promesa; el lenguaje de cliente va en las páginas indexables.
- **D3** (2026-11-13) — Branch `feat/freelance-posicionamiento` creada desde `main`. T1 completado: todo el copy español vive en `src/content/es.js` con la misma forma que tendrá `en.js`. Todavía no está cableado a componentes (eso es T2), así que el sitio no cambia de comportamiento.
- **D4** (2026-11-13) — Hallazgo del audit: tres variantes de URL de LinkedIn en Footer, Contact y `index.html`. Se unifica en T5 bajo S9.
- **D5** (2026-11-13) — RESUELTO. El botón "Download CV" del hero se reemplaza por "Hablemos" → `#contact`. La descarga del PDF pasa a `/resume`.
- **D6** (2026-11-13) — E-commerce eliminado de servicios y del hero. Motivo: nunca construyó uno, y montar una tienda desde cero cuando Tiendanube/Shopify ya resuelven el caso no se justifica comercialmente. Ofrecerlo sin respaldo quema al primer cliente.
- **D7** (2026-11-13) — Se elimina el párrafo de "cómo trabajo" (cantidad de proyectos, intermediarios). Reemplazado por una formulación directa problema → solución, sin explicar el proceso.
- **L6** (2026-11-13) — "si cambiar cv por hablemos, el download cv puede ir dentro de la pagina cv web, que se mantiene, la bajada:sacaria la palabra tienda, nonca hice un e-commerce es mi gran falta, pero ya hay soluciones que no justificar crear una tienda de 0. el como trabajo no me gusta, sin tantas explicaciones si tomo muchos o pocos proyectos, o si hay intermediario o no, hay un problema, yo se lo resuelvo (espero)"
- **D8** (2026-11-13) — T2 completado. `LocaleProvider` + `useCopy` cableados en Header, Footer, Hero, Home, AboutMe, Contact, Projects, Studies, Skills y ProjectsGrid. Español en `/` y `/en/*`; selector ES/EN en el header. Se separó `context.js` (funciones) de `LocaleProvider.jsx` (componente) porque la regla `react-refresh/only-export-components` rechazaba el archivo mixto.
  Verificación observada con Chrome headless sobre el dev server: `/` renderiza "Productos digitales a medida", "Sin plantillas", "Sin intermediarios", "Vos planteás el problema", "Sobre mí", "Hablemos"; sin "Download CV" ni "View projects". `/en` renderiza el copy inglés con "Let's talk". `/resume` contiene "Download CV".
  Residual conocido: el `<head>` estático de `index.html` sigue con "Product Engineer" en title/meta/OG para todas las rutas. Es exactamente T3.
- **D9** (2026-11-13) — Commit `007aea1`: 15 archivos, +181/−88. Ningún componente visual, animación ni clase de Tailwind modificada.
- **L7** (2026-11-13) — "bueno esta bien, todavia no vende, la seccion de estudios creo que la vamos a tener que sacar, no es relevante al cliente. no se si esas cards la podremos reutilizar para proyectos, creo que si pero no son clickeables... y puede que tambien haya que quitar los proyectos destacados con el scroll"
- **D10** (2026-11-13) — Diagnóstico de "todavía no vende": la home conserva el orden de un portfolio (Hero → Sobre mí → Proyectos → Formación → Herramientas → Contacto). No existe sección de servicios, así que la página nunca responde "qué compro". T4 pasa a ser la tarea de mayor impacto, por encima de cualquier ajuste visual.
- **D11** (2026-11-13) — `PrimaryProjectsSection` mide `h-[180vh]` por proyecto. Con 3 primarios son 540vh, unas 5,4 pantallas de scroll animado antes de que el cliente llegue al CTA. Es un problema de conversión, no solo de gusto. Además contradice el AGENTS.md, que fija el scroll narrativo como decisión bloqueada: el cambio requiere confirmación explícita.
- **D12** (2026-11-13) — Confirmada la reestructuración (S12). T9 completado: `ServicesSection`, `ProjectCard` y `ProjectsShowcase` nuevos; `Home.jsx` reordenado; nav del Header actualizado a Servicios/Proyectos/Sobre mí/Contacto + CV; observer de scroll actualizado. `PrimaryProjects` y `ProjectsGrid` dejan de renderizarse.
  Verificación observada con Chrome headless: `/` → home→services→projects→about→contact, "Formación" y "Herramientas" ausentes, 8 cards con 8 links externos. `/en` → misma estructura con "Skills" conservado antes de contacto.
- **D13** (2026-11-13) — Hallazgo relevante: los proyectos cargados desde Supabase son sitios reales en producción (`plataforma1810.com.ar`, `kli.com.ar`, `elreydelchaja.com`, `holocruxe.com`) más demos en Vercel. La prueba de trabajo existe; el problema era de presentación, no de falta de casos. Refuerza que el siguiente salto de conversión está en contar esos proyectos como casos (problema → qué se hizo → resultado), no en conseguir el primero.
- **L8** (2026-11-13) — "ok, va queriendo.. creo que esto que empezo con una pequeña idea ahora es un cambio bastante grande, vamos a diseñar todo antes de seguir, porque la web esta bien, pero no es la web de venta que busco"
- **D14** (2026-11-13) — Se detiene la implementación. Se escribe `## Design` con la estructura completa, reglas de copy, formato de caso, reglas visuales, reglas de conversión, arquitectura SEO y fases. El orden deja de ser incremental: Fase 1 conversión, Fase 2 SEO, Fase 3 contenido.
- **D15** (2026-11-13) — Hallazgos del audit de contacto: no existe WhatsApp en el proyecto, no existe formulario público de contacto (los únicos `<form>` son del admin), y `public/_redirects` referencia `/success.html` y `/success` apuntando a un archivo inexistente.
- **L9** (2026-11-13) — "mmm es que no tengo numero reales, y depende un poco de cada pedido, porque te piden una landin que ya le pongo precio y todo ok, pero despues me piden otra con muchas animaciones, y el precio es otro, el desde puede ser, pero tambien según alcance"
- **D16** (2026-11-13) — Modelo de precios definido: piso publicado ("Desde $X") más los factores de alcance publicados. Sistemas a medida sin piso, con "presupuesto según alcance". Regla dura: nunca publicar un número que no se aceptaría. Validez de presupuesto 15 días por inflación. Los números los define el cliente; el sitio no los inventa.
- **L10** (2026-11-13) — Lectura de los proyectos en producción: Plataforma 1810 (SaaS de campañas políticas con onboarding, planes y panel), Kli (plataforma de comunidades con membresías y cobro integrado), El Rey del Chajá (pastelería real en Blvd. Oroño 2955, Rosario, con catálogo, precios y crédito a Gianni en el footer). `holocruxe.com` no devolvió contenido.
- **D17** (2026-11-13) — El slate de casos queda en tres: El Rey del Chajá (SEO local y prueba verificable en Rosario), Plataforma 1810 y Kli (prueba de sistemas, panel, planes y pagos). Los dos builds más fuertes son productos, no sitios: el posicionamiento "hago páginas web" subestima la evidencia disponible.
- **L11** (2026-11-13) — "son productos propios, pero son desarrollos full, de producto, no se aclara nada, son trabajos hechos, de forma correcta y live, no son ejemplos de estudio... el cliente fui yo , me contarte"
- **D18** (2026-11-13) — Se definen dos formatos de caso que nunca se mezclan: caso de cliente (rubro → problema → qué construí → resultado → link) y caso de producto (qué es → alcance → estado → link). Regla: un producto propio nunca se presenta como trabajo de cliente, y no se inventan métricas ni testimonios. Contrapeso argumentado: el producto propio se enmarca como prueba de ownership de punta a punta, que para un comprador pesa más que un build tercerizado.
- **D19** (2026-11-13) — El caso de El Rey del Chajá se redacta solo con hechos verificables (dirección, reseñas, historia, contenido del sitio). Problema y resultado quedan como placeholders hasta que el usuario los aporte.
- **L12** (2026-11-13) — "tenia una web, no my clara, sin seo correcto, de un template de framer, y requeria llamar al dev para cada cambio, le hice una web de 0 en astro, con un admin para modificacion de precios, ademas de un generador de imagenes para 3 tv de 55' dentro del local, tambien desde el admin"
- **D20** (2026-11-13) — El Rey del Chajá pasa a ser el caso flagship y el diseño de caso queda completo con hechos aportados por el usuario: problema (template de Framer, sin SEO, dependencia del dev), alcance (sitio en Astro + admin de precios + generador de imágenes para 3 TVs de 55") y resultado (autonomía del negocio).
- **D21** (2026-11-13) — A1 resuelto: Astro. El usuario ya construyó y mantiene Chajá en Astro en producción, así que la migración es su propio stack. Consecuencia de secuencia: se agrega **Fase 0** (portar el shell a Astro) antes de Fase 1, para no construir las mismas páginas dos veces.
- **D22** (2026-11-13) — Diferenciación detectada: un negocio no compra "una web", compra no depender de un dev para cada cambio de precio. Hook de venta: "no dependés de mí para cambiar un precio". Servicio candidato a confirmar: pantallas / señalización digital para locales físicos, administradas desde el mismo panel.
- **L13** (2026-11-13) — "porque pasar la web a astro??? si ademas tenemos el admin que voy a mantener para seguir agregando o modificando contenido... es necesario ese cambio, que valor le agrega por sobre react?"
- **D23** (2026-11-13) — Se revierte la recomendación de Astro. El argumento anterior ("ya lo usás en Chajá, el riesgo es bajo") respondía a la pregunta equivocada. Con contenido en Supabase y un admin que se mantiene, la ventaja de Astro (content collections en markdown) no aplica, y el costo de re-hospedar el admin y rehacer la capa i18n no se justifica. Se vuelve a Vite + React con generación estática en build, que satisface el requisito real (HTML con `<head>` por ruta) sin cambiar de stack. Fase 0 eliminada.
- **L14** (2026-11-13) — "y para cualquier animacion nueva que se pueda llegar a agregar hay que utilizar esto https://reactbits.dev/get-started/index que es de donde venia sacando las animaciones"
- **D24** (2026-11-13) — Regla de proyecto: toda animación nueva sale de React Bits. Verificado que `ReflectiveCard`, `LightRays`, `CurvedLoop`, `GradientText` y `ScrollStack` provienen de ahí. Escrito en `AGENTS.md` y en las reglas visuales del diseño. No se escriben animaciones a mano ni se agregan otras librerías.
- **L15** (2026-11-13) — "el numero es +54 9 3413704638 hay cosas que no estan bien, el about es plano y muy corto, una pequeña bio estaria ien, y la parte de me escribis a mi no a un ticket, el que contrate no tiene ni idea de que es un ticket, asi que eso no va ni a palos, y despues los proyectos, es creo una de las secciones principales,,, esa card de solo texto no dice nada, no vende nada, hay que mostrar las imagenes... esto es todo visual, importa mas una buena imagen que todo el detalle del trabajo realizado"
- **D25** (2026-11-13) — About reescrito a tres párrafos con bio real (Rosario, música y docencia, qué construye, trato directo) y sin la metáfora del ticket.
- **D26** (2026-11-13) — La card de caso se rehace visual-first: imagen `aspect-video` arriba, rubro, título, resultado y link. `problem` y `built` se conservan en los diccionarios para las páginas de caso, pero no se renderizan en la card. Las imágenes se toman de los proyectos de Supabase, emparejadas por `demo_url`, así que se cambian desde el admin sin tocar código.
- **L42** (2026-11-17) — "vamos con los proyectos, las cards como estan estan perfectas, pero deberia ser un carrousel, para que puedan pasar todos los proyectos, y te dije mal en los logos pueden ser link a la view del proyecto."
- **D81** (2026-11-17) — `/projects` pasa de grilla a carrusel: `ProjectsCarousel` con scroll nativo, `snap-x snap-mandatory` y flechas que avanzan por ancho de contenedor. Una card en mobile, dos en tablet, tres en desktop. Sin librerías ni cálculo manual de posiciones: touch, teclado y botones funcionan igual. `ProjectCard` no se tocó.
- **D82** (2026-11-17) — Los logos vuelven a ser link. El campo `href` regresa al admin con el placeholder `/casos/<slug>`, para apuntar a la vista del proyecto en vez del sitio externo. Como los links del seed apuntaban afuera, hace falta un update para redirigirlos.
- **D83** (2026-11-17) — Hallazgo: las descripciones de `projects` están solo en inglés en la base, así que el carrusel muestra texto en inglés dentro del sitio en español. Queda pendiente decidir si la tabla se vuelve bilingüe.
- **L41** (2026-11-17) — "hay un par de logos que no estan, porque? y se pueden rendondear las puntas del contenedor de los logos? porque algunos son redondos o un texto y estan bien, pero algunos son cuadrados y no quedan bien"
- **D79** (2026-11-17) — Diagnóstico de logos faltantes: la carpeta `public/img/logos` tiene siete archivos (1810, chaja, focus_logo, holocruxe, jobtracker, kli, vibado) pero la tabla tiene cinco filas. `focus_logo.png` y `jobtracker.png` nunca se insertaron: el seed es una foto del momento y agregar archivos a la carpeta no crea filas. Se cargan desde `/admin/logos` o con un insert.
- **D80** (2026-11-17) — `LogosSection.css` aplica `border-radius: 12px` a `.logoloop__item img`, así los logos cuadrados con fondo sólido quedan con puntas redondeadas y los que son texto o tienen transparencia no cambian. Verificado en el render.
- **L40** (2026-11-17) — "hay que modificar los curved text, hay que cambiar como se mueven, servicios, como trabajo y contacto que inviertan el movimiento"
- **D78** (2026-11-17) — Dirección de los títulos curvos invertida en tres secciones: Servicios y Cómo trabajo pasan a `direction="right"`, Contacto pasa a `direction="left"`. Casos y Preguntas quedan como estaban. Verificado que `CurvedLoop` usa la prop: `dirRef` solo cambia por drag cuando `interactive` es true, y en las secciones se pasa `interactive={false}`.
- **L39** (2026-11-17) — "los logos que se muevan a o ancho de toda la pantalla, y con un tamaño un poco mayor, y al hacer hover, ahora se frena y estaria bien te tambien escale un poquito"
- **D77** (2026-11-17) — Franja de logos a ancho completo (breakout `left-1/2 w-screen -translate-x-1/2`, igual que la banda del showreel), `logoHeight` 46→64, `gap` 96, `fadeOutWidth` 0.08, y `scaleOnHover` activo: al pasar el mouse sigue frenando y además escala 1.2.
- **L38** (2026-11-17) — "abajo de las cards de los proyectos, quiero este componente https://reactbits.dev/animations/logo-loop ... que antes diga, empresas que confiaron ... con el titulo con el texto con el degrade, como en el hero, pero mas pequeño, y los logos estan en img logos, eso tambien quiero poder ir agregando o quitando desde el admin"
- **D75** (2026-11-17) — Franja de logos debajo de las cards de casos: `LogoLoop` de React Bits copiado a `src/components/LogoLoop.jsx` (`logoHeight 46`, `gap 72`, `muted 0.15`, draggable, fade en los bordes) con el título "Empresas que confiaron" en `GradientText` más chico que el del hero.
- **D76** (2026-11-17) — Tabla `logos` (`supabase/logos.sql`) con nombre, imagen, link, posición y visible; seed con los cinco logos de `public/img/logos` (Chajá, 1810, Kli, Holocruxe, Vibado). Admin en `/admin/logos` con ruta o URL de imagen **o** subida de archivo al bucket `projects`, más editar, ocultar y borrar. Hook con fallback a la misma lista para que la franja exista antes de correr el SQL.
  Ajustes obligados al componente: dos `catch {}` vacíos y la asignación de `config.current` durante el render, que la regla `react-hooks/refs` rechaza; se movió a un layout effect declarado antes del que crea el motor.
- **L37** (2026-11-17) — "dale" (seguir con la plantilla de caso).
- **D71** (2026-11-17) — Plantilla de caso en `src/seo/pages/case.jsx`: recibe el caso como prop, así se genera tanto desde Supabase como desde el diccionario de respaldo. Muestra rubro, título, imagen, problema, qué construí, resultado destacado, link al sitio y un bloque final de contacto.
- **D72** (2026-11-17) — El build consulta `cases` por REST con la anon key; si la tabla no existe, está vacía o falla, genera igual desde `es.cases.items` (cada item ganó un `slug`). Resultado del build: `/casos/el-rey-del-chaja`, `/casos/plataforma-1810`, `/casos/kli`, cada uno con canonical, description y JSON-LD `Article` + `ProfessionalService`, y sitemap de 6 URLs sin duplicados.
- **D73** (2026-11-17) — Las cards de la home ahora enlazan internamente a `/casos/<slug>` (antes iban al sitio externo; el link externo vive en la página del caso). Se agregan rutas SPA `/casos/:slug` y `/desarrollo-web-rosario` fuera del Layout, para que la navegación interna y el entorno de desarrollo funcionen aunque el HTML estático se sirva primero en producción.
- **D74** (2026-11-17) — `package.json` pasa a `vite build && node --env-file-if-exists=.env scripts/build-seo-pages.mjs`, así el build lee Supabase en local y en Netlify.
- **L36** (2026-11-17) — "si, como las paginas de casos? no se si primero habri que definir que proyectos muestro, o no?"
- **D69** (2026-11-17) — Criterio de selección de casos: una página de caso solo se justifica si cuenta problema real, alcance y resultado. Chajá califica completo; 1810 y Kli como productos propios; los otros cinco quedan solo en la galería `/projects`. Tres casos buenos valen más que ocho flacos, y el contenido fino penaliza.
- **D70** (2026-11-17) — Fase B implementada: tabla `cases` (`supabase/cases.sql`) con slug, título, campos bilingües de rubro/problema/construido/resultado, link, imagen, posición y visible; RLS de lectura pública y escritura autenticada; seed con los tres casos y sus imágenes reales. API en `src/api/cases.supabase.js` con subida al bucket `projects`, hook `useCases` con fallback al diccionario, `CasesSection` leyendo del hook, y pantalla `/admin/cases` con formulario bilingüe, subida de imagen con control de peso y listado con editar/ocultar/borrar. `toggleVisible` reutiliza `updateCase` pasando `image: null` para no volver a subir la imagen.
  Verificado con la tabla todavía inexistente: la home sigue mostrando los tres casos con sus tres imágenes (fallback al diccionario + imagen del proyecto por URL), y las siete FAQs ya vienen de la base.
- **L35** (2026-11-17) — Elección: "Fase 2: SEO real ahora (Recomendado)".
- **D66** (2026-11-17) — Primer entregable de Fase 2: generación de páginas SEO como HTML real en build. `scripts/build-seo-pages.mjs` bundlea cada página con esbuild, la renderiza con `react-dom/server` y escribe `dist/<ruta>/index.html` con título, description, canonical, OG y JSON-LD propios. Sin Puppeteer y sin cambiar de framework: las páginas de contenido son componentes simples, sin router ni contexto, así que renderizan en Node sin tocar el navegador.
- **D67** (2026-11-17) — Primera página: `/desarrollo-web-rosario`. H1 "Desarrollo web en Rosario", servicios, proceso, el caso de El Rey del Chajá con dirección real, zona (Rosario, Funes, Roldán, Granadero Baigorria, Villa Gobernador Gálvez, Pérez, San Lorenzo), cuatro preguntas locales y canales de contacto. JSON-LD `ProfessionalService` con `areaServed` y `FAQPage` con las preguntas de la página.
- **D68** (2026-11-17) — `sitemap.xml` pasa a generarse en el mismo script, con alternates `hreflang` es-AR / en para la home y su versión inglesa. Los datos de la página se separaron a `rosario.data.js` porque la regla `react-refresh/only-export-components` rechaza mezclar exports de datos con el componente.
  Verificado: el HTML generado pesa 12 KB, contiene el texto completo, dos bloques JSON-LD, canonical propio y el CSS del sitio; renderizado en navegador se ve igual que el resto del sitio.
- **L34** (2026-11-17) — "listo, ya corri la query, si lo principal de este sitio ahora es el SEO/GEO, ser encontrado, asi que esos cambio si tardan no hay problema, una vez que mande a prod el sitio lo voy a analizar en answer the public y modificaremos algo del contenido para las respuestas que debe dar el sitio"
- **D63** (2026-11-17) — Verificado contra Supabase: la tabla `faqs` existe con las siete filas y la lectura pública funciona con la anon key.
- **D64** (2026-11-17) — Se adelantan mejoras de SEO/GEO que no dependen de la arquitectura. `index.html` pasa a `lang="es"`, título y descripción en español orientados a la venta, OG con `og:locale es_AR` y `alternate en_US`, y el JSON-LD cambia de `Person` a `ProfessionalService` con `areaServed` (Rosario, Funes, Roldán, Granadero Baigorria, Villa Gobernador Gálvez, Pérez, San Lorenzo, Argentina) y `hasOfferCatalog` con los tres servicios. Se agrega `public/llms.txt` siguiendo la convención llmstxt.org. `LocaleProvider` sincroniza `document.documentElement.lang` con el locale activo: verificado `/` → es-AR y `/en` → en.
- **D65** (2026-11-17) — Diagnóstico que reordena prioridades: los crawlers de IA casi no ejecutan JavaScript, así que sobre una SPA el GEO es prácticamente nulo. La generación de HTML estático por ruta deja de ser una optimización y pasa a ser la condición para que el contenido exista para esos motores.
- **L33** (2026-11-17) — "antes de seguir... lo que esta en la home, tene y debe poder se editable desde el admin, por lo menos algunas cosas, como los proyectos... y tambien me interes poder editar, quitar o agregar, las faqs, como lo ves a eso?"
- **D60** (2026-11-17) — Fase A de contenido editable: FAQs. Tabla `faqs` (`supabase/faqs.sql`, con RLS de lectura pública y escritura autenticada, más seed con las siete preguntas actuales), API en `src/api/faqs.supabase.js`, hook `useFaqs` y pantalla `/admin/faqs`. Regla de diseño: la base es **override**, no fuente única — si la tabla no existe, está vacía o falla, la home usa `copy.faq.items`. Verificado: con la tabla todavía inexistente, la home sigue mostrando las siete preguntas.
- **D61** (2026-11-17) — Pendiente de infraestructura para Fase 2: si el contenido vive en Supabase, el HTML estático se arma en build, así que editar una FAQ exige rebuild. La salida es un deploy hook de Netlify disparado al guardar.
- **D62** (2026-11-17) — Próximas fases acordadas: B casos (con imagen y orden), C logos (como campo de `projects`, no entidad nueva), D servicios/proceso/hero si hace falta.
- **L32** (2026-11-17) — "ahhh no te dije, agregue las imagenes con numero y borre la que decia obsidian, asi aparecen de forma aleatoria"
- **D59** (2026-11-17) — `SHOWREEL_MEDIA` pasa a listar `/img/01.webp` a `/img/06.webp`. Se elige una al azar por carga (resuelta a nivel módulo, estable durante la visita). Verificado con cinco cargas seguidas: 03, 05, 01, 04, 02. Las imágenes son fondos oscuros con detalle violeta en los bordes, así que el formulario sigue legible con el velo 0.72.
- **L31** (2026-11-17) — "buenisimo!!!!! entonces ahora para la home quitemos el sobre mi, y pasemos la seccion de preguntas frecuentes al final despues del contacto"
- **D58** (2026-11-17) — Home sin Sobre mí, y Preguntas movida al final. Orden actual: Hero → Servicios → Casos → Proceso → Contacto (título curvo) → banda de imagen con el formulario → Preguntas. `src/app/about/AboutMe.jsx` queda sin uso en la home (el portfolio legacy tiene su propia copia), y las claves `copy.about` quedan sin uso pero se conservan.
  Verificado en DOM: secciones `home, services, cases, process, contact, faq`; sin `#about`; FAQ después de `#showreel`.
- **L30** (2026-11-17) — "ahora si!!! bien el sobre mi hay que quitarlo, y hay que modificarla seccion d proyectos, pero eso mas adelante... quiero mantener toda la pagina tal cual esta ahora live pero que no se sea la home sino una ruta extra a portfolio"
- **D56** (2026-11-17) — La raíz `/` queda como la página nueva de venta. La página vieja (el portfolio orientado a recruiters) se preserva en `/portfolio`, recuperada completa desde `main` en `src/legacy-portfolio/` (Home, Hero, AboutMe, Projects, Studies, Skills, Contact originales, con imports reescritos). Se envuelve en `LocaleProvider locale="en"` porque nació monolingüe y los componentes compartidos leen el idioma del contexto.
- **D57** (2026-11-17) — El menú suma un link "Portfolio" a `/portfolio`. En rutas sin las secciones de venta (por ejemplo `/portfolio`), los ítems de ancla ya no quedan muertos: `scrollToId` navega al inicio cuando no encuentra el destino.
- **Pendientes anotados por el usuario:** quitar la sección Sobre mí y modificar la sección de Proyectos. Explícitamente "más adelante".
- **L29** (2026-11-17) — "ahi va, depues de los botones de enviar del form que estan los links muy pequeño de escribime y linkedin, vamos a cambiar eso, por un pequeño subtitulo, que sea o tamien pode contactarme por, y unos botones del mail, linkedin y wapp"
- **D54** (2026-11-17) — Los links chicos de email y LinkedIn dentro del formulario se reemplazan por un bloque de canales: subtítulo "O también podés contactarme por" y tres botones pill (Email, LinkedIn, WhatsApp) con iconos. WhatsApp se arma con `VITE_WHATSAPP_NUMBER`, igual que el FAB.
  En mobile los tres entran en una fila gracias a iconos y padding reducidos (`text-xs`, `px-3`). Sin eso, WhatsApp caía a una segunda fila y quedaba tapado por el FAB.
- **D55** (2026-11-17) — El FAB de WhatsApp se oculta mientras la banda `#showreel` está en pantalla (IntersectionObserver): ahí el WhatsApp ya está entre los botones de canal y el flotante los tapaba. Verificado en 390×844: los tres botones visibles, contenido 558px dentro de 844.
- **L28** (2026-11-17) — "noooooo, afuera de la imagen!!!! la puta madre ya van 20 veces que pido que este afuerA!!!!!!! como entodas las otras secciones, no tiene sentido que aparezca adentro!!!!"
- **D53** (2026-11-17) — CORRECCIÓN: el contacto NO va dentro de la imagen. Se revierte el overlay. `ScrollExpand` queda como banda pura de imagen, sin `children`. La sección de contacto vuelve a ser una sección normal después de la banda: `CurvedSectionTitle` "Contacto" a todo el ancho, luego `GradientText` "Hablemos", luego intro, formulario y links — igual que el resto de las secciones. `ContactContent` pierde el `CurvedLoop` interno y el `id="contact"`, que ahora vive en el `Section`.
  Error de interpretación repetido: se leyó "que se abra la imagen y aparezca la sección de contacto" como "el contacto dentro de la imagen", cuando era "la imagen se abre y después viene la sección".
- **L27** (2026-11-17) — "el curved text de contaco sigue apreciendo donde no corresponde, no esta adentro de la imagen esta arriba de la seccion, como las otras secciones, el titulo con el curved text y despues el contenido"
- **D50** (2026-11-17) — Causa real encontrada midiendo el DOM con CDP: la expansión del frame y la aparición del overlay estaban atadas al mismo reloj, y el overlay entraba recién en p=0.85. Con `scrollDistance 0.55` y `holdDistance 0.15`, el progreso alcanzado antes de que la sección se soltara quedaba cerca de 0.9, así que el contenido aparecía tarde, encima de una imagen todavía no full-bleed, y a veces directamente no aparecía. Se desacoplan: el frame llega a pantalla completa en p=0.5 (`smoothstep(0, 0.5, p)`), el titular se va entre 0.22 y 0.45, y el overlay entra entre 0.5 y 0.7.
- **D51** (2026-11-17) — `holdDistance` sube de 0.15 a 0.5 para que la sección quede fijada con el contacto visible el tiempo suficiente para leerlo y empezar a completarlo.
- **D52** (2026-11-17) — Verificado con capturas reales vía CDP (`Page.captureScreenshot` con scroll posicionado y `Emulation.setDeviceMetricsOverride`): a p=0.4 el frame está casi lleno y el overlay oculto; a p=0.75 el clip es `inset(0%)`, el overlay tiene opacidad 1 y el contacto se ve sobre la imagen. En 390×844 el contenido mide 530px y entra en 844 con margen.
- **L26** (2026-11-17) — "ok, unos cambio, el curved text de contacto, esta por fuera de la imagen que se agranda, tal como estaba antes,... donde dice trabajo real, sacalo y escribi TRABAJEMOS JUNTOS y la imagen deberia comenzar mucho mas pequeña, y una duda, si cargo diferentes imagenes, puede ser que sea random entre las que suba la que aparezca?"
- **D46** (2026-11-17) — El texto se salía de la imagen porque el overlay empezaba a aparecer en p=0.68, cuando el frame todavía no llegaba a pantalla completa, y el titular, que es hermano del frame y no está clipeado, desbordaba una imagen chica. Se mueve la aparición del overlay a `smoothstep(0.85, 1, p)` y se reduce el tamaño del titular de `clamp(w*0.075, 20, 84)` a `clamp(w*0.033, 16, 44)`.
- **D47** (2026-11-17) — La banda arranca mucho más chica: `startWidth 40`, `startHeight 34` (antes 60/84) y `mediaZoom 1.05`. El aspecto 40:34 evita el recorte extremo que dejaba solo la zona oscura del arte. Titular nuevo: "TRABAJEMOS JUNTOS".
- **D48** (2026-11-17) — Soporte de imágenes random: `SHOWREEL_MEDIA` es un array y `PICKED_MEDIA` se resuelve una vez al cargar el módulo, así no cambia a mitad del scroll. `Math.random()` no puede ir dentro del render porque la regla `react-hooks/purity` lo rechaza.
- **D49** (2026-11-17) — Verificación visual de los dos estados con capturas headless reales: arranque como card chica con el titular contenido, y estado expandido con la banda curva y el formulario legibles sobre el arte.
- **L25** (2026-11-13) — "ok, sacaste el curved text de contacto, ponelo de nuevo, no pedi quitarlo, y agregue la imagen obsidian en public img"
- **D44** (2026-11-13) — Vuelve el texto curvo al contacto, pero usando `CurvedLoop` directamente en vez de `CurvedSectionTitle`: ese componente hace breakout con `w-screen` + `-ml-[50vw]`, y dentro del overlay (que ya es ancho completo) el texto se salía de cuadro. El marquee va a todo el ancho del overlay y el formulario queda en una columna centrada. Versión inicial quedó cortada al meterla en la columna de 512px; corregido sacándola a ancho completo.
- **D45** (2026-11-13) — `public/img/Obsidian.jpg` (2752×1536, 2.2 MB) convertida a `public/img/obsidian.webp` de 64 KB con ImageMagick, y usada como media de la banda final. El JPEG original queda sin trackear a propósito por peso.
  Verificación visual real con captura headless (forzando `enabled={false}` y la banda al inicio, luego revertido): el arte encaja con la paleta, el formulario se lee sobre el velo 0.72 y el marquee curvo cruza a todo el ancho.
- **L24** (2026-11-13) — "no, la card del hero no se toca, y no lo que quiero que se abra es la seccion de contacto, se uede? que se abra la imagen y aparecta la seccion de contacto? que tipo de imagen podria quedar bien ahi?"
- **D42** (2026-11-13) — El `children` del `ScrollExpand` pasa a ser la sección de contacto completa: `ContactContent` (`src/features/contact/components/`), con heading, intro, formulario Netlify y una línea compacta de email + LinkedIn. Se elimina `src/app/contact/Contact.jsx` y su uso en Home; el `id="contact"` vive ahora dentro del overlay para que el ancla del nav apunte ahí.
  Se compactó el contacto a propósito: se fueron las tres tarjetas de links grandes y el título curvo, porque dentro del overlay (padding 6%, alto = viewport) el contenido tiene que entrar sin desbordar. Estimado ~450px de alto contra ~616px disponibles en un viewport de 700px.
- **D43** (2026-11-13) — La card del hero no se toca por decisión del usuario, así que el "HIRING READY" del video queda como está.
- **L23** (2026-11-13) — "creo que iria muy bien al final una buena imagen y que se abra todo el form de contacto..."
- **D41** (2026-11-13) — `ScrollExpand` se mueve del arranque al final: ahora va entre Preguntas y Contacto. El mensaje de cierre ("Una idea, un diseño y un desarrollo hecho a medida") pasa a ser el `children` del componente, así que aparece sobre la imagen cuando termina de expandirse y entrega al formulario. `overlayScrim` sube a 0.72 para que el texto tenga contraste. Se elimina `ClosingSection` (archivo y uso) porque quedó absorbido por el overlay.
  Verificado en DOM: showreel antes de `#contact`, overlay con el texto de cierre, orden de secciones intacto.
- **L22** (2026-11-13) — "genial, me gusta mas... ahora mira, quiero utilizar este componente https://reactbits.dev/animations/scroll-expand, pero o se bien donde quedaria correcto algo así,"
- **D38** (2026-11-13) — `ScrollExpand` de React Bits integrado como banda full-bleed entre el Hero y Servicios: premia el scroll y responde al problema de que el hero no invitaba a bajar. Copiado a `src/components/ScrollExpand.jsx` + `.css`. Único cambio de fondo: el componente asignaba `propsRef.current` durante el render y la regla `react-hooks/refs` lo rechazaba; se movió a un `useEffect` sin silenciar el lint. Configuración: `startWidth 60`, `startHeight 84`, `scrollDistance 0.55`, `holdDistance 0.15` → 170vh de recorrido, muy por debajo de las 540vh que se eliminaron del scroll narrativo.
- **D39** (2026-11-13) — Hallazgo al revisar el render: el video del `ReflectiveCard` tiene texto incrustado que dice **"HIRING READY"** y **"PRODUCT ENGINEER"**. Contradice directamente el posicionamiento freelance. No se puede corregir por código: hay que rehacer el asset de video.
- **D40** (2026-11-13) — La banda usa como media la imagen del primer proyecto primario (Chajá), que es una ilustración de marca, no una captura del sitio. Sirve como provisorio; conviene una captura real o un video.
- **L21** (2026-11-13) — "genial, lo que hay que modificar un poco el el hero principal y los textos, en este omento no me llaman a sigue scroleando, y es lo primero que ve el usuario, la card esta perfecta, pero el titulo se corta y hace que no quede bien alineado las card con el texto, el sin plantilla y sin intermediarios afuera ahi va otro texto , algo como que hago, o lo que necesite el cliente, no lo se bien"
- **D35** (2026-11-13) — Hero corregido. Causa del título cortado: `GradientText` usa `max-w-fit` + `overflow-hidden` en su raíz, y el titular entraba en una columna limitada a `max-w-xl` (576px) con `lg:text-7xl`. Se quita el `max-w-xl` (la columna ahora usa todo el ancho de la grilla, ~812px) y se baja a `lg:text-6xl` con `leading-[1.05]`. La card no se tocó.
- **D36** (2026-11-13) — Copy del hero: H1 "Desarrollo web a medida"; tarjeta "Sitios y landing pages" / "sistemas y paneles a medida"; bajada "Actualizás precios, textos y pantallas sin llamar a nadie. Diseño y construyo cada proyecto de principio a fin." Se elimina "Sin plantillas / Sin intermediarios".
- **D37** (2026-11-13) — Bug encontrado y corregido: el CTA primario apuntaba a `#projects`, ancla que dejó de existir cuando la sección pasó a `#cases`. Ahora apunta bien.
- **L20** (2026-11-13) — "buenisimo, ya cargue las imagenes y estan exelente, ahora, en el como trabajo, vamos a hacerlo como estaba hecha la seccion de estudios, con las cards que se iban apilando con el scroll, y con un poco mas de info y alguna imagen o icono explicativo"
- **D33** (2026-11-13) — Proceso rehecho como stack de cards apiladas con `position: sticky` y `zIndex` creciente, el mismo mecanismo que Estudios: `ProcessCard` + `ProcessSection`, cuatro tarjetas con icono (MessageCircle, FileText, Code2, Rocket), título, descripción, tres puntos y contador 01/04. Se descartó a propósito el `ScrollStack` de React Bits: inicializa Lenis sobre la ventana y habría cambiado el scroll de todo el sitio, además de traer padding interno de pantalla completa (`pb-[50rem]`) incompatible con una sección del home.
- **D34** (2026-11-13) — Imágenes de servicio cargadas por el usuario en `public/img/services/` como `sitios-web.webp`, `landing-pages.webp` y `sistemas.webp` (más los PNG originales, que no se usan). Verificado en DOM: las tres cargan en las cards.
- **L19** (2026-11-13) — "son imagenes que van a ir en las cards, otras las estoy creando, y ahora las paso para que las coloquemos"
- **D32** (2026-11-13) — Las cards de servicio quedan preparadas para imagen. `src/features/services/data/serviceImages.js` mapea `key` → ruta en `public/img/services/`. El frente monta la imagen a sangre con degradado inferior para mantener legible el texto; si el archivo no existe o falla, `ServiceImage` la desmonta y la card vuelve al fondo plano, sin ícono roto. Los `key` (`websites`, `landing`, `systems`) viven en ambos diccionarios. Archivos esperados: `sitios-web.webp`, `landing-pages.webp`, `sistemas.webp`.
- **L18** (2026-11-13) — El usuario consolida Servicios en **tres cards** y aporta copy definitivo: 01 Sitios web a medida (Servicio principal), 02 Landing pages (Servicio principal), 03 Sistemas y paneles web (Desarrollo complementario). Agrega "Servicios adicionales — Mantenimiento y evolución", reemplaza el FAQ por siete preguntas propias, y define el mensaje de cierre ("Una idea, un diseño y un desarrollo hecho a medida"). En el mensaje también aparecen tres dominios sueltos (creamu.co.jp, zavabuild.com, samuelivx.github.io) que **no** son trabajo del usuario: no se usaron.
- **D30** (2026-11-13) — T9 reescrito: tres `FlipCard` en grilla de 3 columnas a 440px de alto. Frente: número, tag, título, resumen y "Ver qué incluye". Dorso: tag, lead, seis bullets y "Resultado:". Debajo, una franja compacta de Servicios adicionales con el CTA. Se eliminan Catálogos digitales, Pantallas para el local, Rediseño y migración y Web apps y sistemas por pedido explícito.
- **D31** (2026-11-13) — Nuevo `ClosingSection` entre Preguntas y Contacto: banda con borde superior e inferior, titular grande, cuerpo y firma. Sin CurvedSectionTitle, para diferenciarla de las secciones y que funcione como remate. Verificado en DOM en `/` y `/en`.
- **L17** (2026-11-13) — "vamos con la seccion de servicios, vamos a utilizar estas cards https://reactbits.dev/micro/flip-card con mas detalle de lo que se puede ofrecer, sitios web, landing pages (y no se que otro tipo de webs, o webapps, pero si listar, despues voy corrigiendo,)"
- **D29** (2026-11-13) — Servicios rehecho con `FlipCard` de React Bits (fuente oficial, `src/content/Micro/FlipCard`), copiado a `src/components/FlipCard.jsx` + `.css`. Seis servicios con detalle en el reverso: Sitios web, Landing pages, Web apps y sistemas, Rediseño y migración, Catálogos digitales, Pantallas para el local. El listado es una propuesta: el usuario corrige después.
  Ajustes de layout: el componente trae ancho y alto fijos, así que `ServicesSection.css` los sobreescribe a `width: 100%` y `height: 420px` para que las cards llenen la grilla (1 / 2 / 3 columnas), y agrega el borde de 1px que usa el resto del sitio. `shadow={false}` para no apilar seis sombras.
  Verificado en DOM: 6 cards con `role="button"`, contenido de frente y dorso presente, en `/` y en `/en`.
- **L16** (2026-11-13) — "bien, saquemo en la seccion de contact el wapp y hagamos con este componente de reactbits https://reactbits.dev/text-animations/circular-text , que la imagen del centro sea el logo de wapp, y el texto al alrededor sea escribime, y sea fijo en la pagina abajo a la derecha, vamos con esto ahora"
- **D28** (2026-11-13) — WhatsApp sale de la sección de contacto y pasa a un FAB fijo abajo a la derecha: `CircularText` de React Bits con "Escribime · " girando alrededor del glifo de WhatsApp. Componente copiado del fuente oficial en `src/components/CircularText.jsx` + `.css`; composición en `src/features/layout/WhatsAppFab.jsx`, montada en `Layout`. Se oculta en `/admin` y `/login`, y no renderiza sin `VITE_WHATSAPP_NUMBER`. Respeta `prefers-reduced-motion` porque el componente usa `useReducedMotion`. Verificado en DOM: un solo `wa.me`, sin link de WhatsApp en contacto, FAB ausente en `/login`.
- **D27** (2026-11-13) — Incidencia y corrección: no existía `.env`; las credenciales de Supabase venían del entorno del shell, así que reiniciar el dev server desde otro shell dejaba el root vacío porque `createClient(undefined, undefined)` revienta al evaluar el módulo. Se restauraron las tres variables en `.env` (gitignoreado, valores recuperados del bundle ya construido) y se endureció `supabaseClient.js` para fallar en tiempo de llamada con un error legible en vez de en blanco total.
