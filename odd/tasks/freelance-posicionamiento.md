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

## Assumptions

- **A1 — Arquitectura.** Se mantiene Vite SPA y se genera HTML estático por ruta en build. **No** se migra a Astro. Confirmar antes de T3.
- **A2 — Dominio.** Un solo dominio propio, un solo repo. `giannipasquinelli.com.ar` si el foco es Argentina; `.com` si se quiere conservar opción internacional.
- **A3 — Hero copy.** CONFIRMADO. Opción "Contraste". Forma final: h1 "Productos digitales a medida" + "Sin plantillas." / "Sin intermediarios."

## Tasks

| ID | Task | Specs | Route | Status |
|---|---|---|---|---|
| T1 | Copy español PyME-first (hero, servicios, por qué yo, proceso, CTA) | S3, S4, S5 | inline | done — `src/content/es.js` |
| T2 | Scaffolding i18n: es-AR en `/`, en en `/en/` | S1, S8 | inline | pending |
| T3 | Head SEO por ruta + check estructural post-build | S6 | inline (dep. A1) | pending |
| T4 | Páginas `/servicios` y `/desarrollo-web-rosario` | S5, S7 | inline | pending |
| T5 | Schema `areaServed`/`ProfessionalService`, sitemap por locale, robots, `sameAs` unificado | S7, S9 | inline | pending |
| T6 | Versión inglesa condensada en `/en/` | S1, S8 | inline | pending |
| T7 | Checklist sin código: dominio propio, Google Business Profile | S7 | inline | pending |
| T8 | Descarga de CV dentro de `/resume` | S11 | inline | done |

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
