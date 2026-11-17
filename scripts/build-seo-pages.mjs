/**
 * Genera las páginas que tienen que existir como HTML de verdad.
 *
 * El sitio es una SPA: todo el contenido se arma en el navegador. Los motores
 * de respuestas con IA no ejecutan JavaScript, así que estas rutas se
 * renderizan a HTML en build y se escriben como archivos estáticos.
 *
 * Corre después de `vite build`.
 */
import { build } from 'esbuild';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const TMP = path.join(ROOT, 'node_modules', '.seo-build');
const ORIGIN = 'https://giannipasquinelli-webdev.netlify.app';

const PAGES = [
  {
    entry: 'src/seo/pages/rosario.jsx',
    data: 'src/seo/pages/rosario.data.js',
  },
];

const json = (value) => JSON.stringify(value, null, 2);

async function findStylesheet() {
  const files = await readdir(path.join(DIST, 'assets'));
  const css = files.find((file) => file.endsWith('.css'));
  if (!css) throw new Error('No se encontró el CSS generado por Vite.');
  return `/assets/${css}`;
}

async function loadPage(entry) {
  await mkdir(TMP, { recursive: true });
  const outfile = path.join(TMP, `${path.basename(entry, '.jsx')}.mjs`);

  await build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    jsx: 'automatic',
    external: ['react', 'react-dom', 'react-dom/server'],
    logLevel: 'silent',
  });

  return import(pathToFileURL(outfile).href);
}

function documentShell({ meta, body, css, structuredData }) {
  const url = `${ORIGIN}${meta.path}`;

  return `<!doctype html>
<html lang="es-AR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${url}" />
  <meta property="og:site_name" content="Gianni Pasquinelli" />
  <meta property="og:title" content="${meta.title}" />
  <meta property="og:description" content="${meta.description}" />
  <meta property="og:image" content="${ORIGIN}/og-image.jpg" />
  <meta property="og:locale" content="es_AR" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="stylesheet" href="${css}" />
${structuredData
  .map(
    (data) =>
      `  <script type="application/ld+json">\n${json(data)
        .split('\n')
        .map((line) => `    ${line}`)
        .join('\n')}\n  </script>`,
  )
  .join('\n')}
</head>
<body class="bg-neutral-950 antialiased">
${body}
</body>
</html>
`;
}

function sitemap() {
  const now = new Date().toISOString().slice(0, 10);
  const entries = [
    {
      loc: `${ORIGIN}/`,
      alternates: [
        ['es-AR', `${ORIGIN}/`],
        ['en', `${ORIGIN}/en`],
      ],
    },
    {
      loc: `${ORIGIN}/en`,
      alternates: [
        ['es-AR', `${ORIGIN}/`],
        ['en', `${ORIGIN}/en`],
      ],
    },
    { loc: `${ORIGIN}/desarrollo-web-rosario`, alternates: [] },
  ];

  const urls = entries
    .map(({ loc, alternates }) => {
      const links = alternates
        .map(
          ([hreflang, href]) =>
            `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`,
        )
        .join('\n');
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>${
        links ? `\n${links}` : ''
      }\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

async function main() {
  const css = await findStylesheet();
  const generated = [];

  for (const page of PAGES) {
    const mod = await loadPage(page.entry);
    const data = page.data ? await loadPage(page.data) : {};
    const meta = data.meta;
    const body = renderToString(createElement(mod.default));

    const service = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Gianni Pasquinelli',
      description: meta.description,
      url: `${ORIGIN}${meta.path}`,
      email: 'mailto:giannipasquinelli@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Rosario',
        addressRegion: 'Santa Fe',
        addressCountry: 'AR',
      },
      areaServed: [
        'Rosario',
        'Funes',
        'Roldán',
        'Granadero Baigorria',
        'Villa Gobernador Gálvez',
        'Pérez',
        'San Lorenzo',
        'Argentina',
      ].map((name) => ({ '@type': 'City', name })),
    };

    const structuredData = [service];

    if (Array.isArray(data.faqs) && data.faqs.length > 0) {
      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faqs.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      });
    }

    const html = documentShell({ meta, body, css, structuredData });
    const outDir = path.join(DIST, meta.path.replace(/^\//, ''));
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, 'index.html'), html);
    generated.push(meta.path);
    console.log(`  ✓ ${meta.path}`);
  }

  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap());
  console.log(`  ✓ sitemap.xml (${PAGES.length + 2} URLs)`);
  console.log(`SEO pages: ${generated.join(', ')}`);
}

main().catch((error) => {
  console.error('No se pudieron generar las páginas SEO:', error);
  process.exit(1);
});
