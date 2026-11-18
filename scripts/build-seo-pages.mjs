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
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const TMP = path.join(ROOT, 'node_modules', '.seo-build');
// Se puede sobreescribir con SITE_URL en Netlify el día que haya dominio propio.
const ORIGIN =
  process.env.SITE_URL || 'https://giannipasquinelli-webdev.netlify.app';

const STATIC_PAGES = [
  {
    entry: 'src/seo/pages/rosario.jsx',
    data: 'src/seo/pages/rosario.data.js',
  },
];

const json = (value) => JSON.stringify(value, null, 2);

/**
 * Netlify sirve los directorios con barra final y redirige 301 si falta.
 * El canonical y el sitemap tienen que apuntar a la URL servida, no a la que
 * redirige, o Google recibe señales contradictorias.
 */
const publicUrl = (routePath) =>
  routePath === '/' ? `${ORIGIN}/` : `${ORIGIN}${routePath}/`;

/**
 * En Netlify las variables vienen del entorno. En local están en .env, y este
 * script se ejecuta con Node pelado, así que no las ve. Se cargan acá a mano
 * para no depender de flags de la CLI que cambian entre versiones de Node.
 */
async function loadEnvFile() {
  if (process.env.VITE_SUPABASE_URL) return;

  try {
    const content = await readFile(path.join(ROOT, '.env'), 'utf8');
    for (const line of content.split('\n')) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    // Sin .env: en Netlify las variables ya están en el entorno.
  }
}

async function findStylesheet() {
  const files = await readdir(path.join(DIST, 'assets'));
  const css = files.find((file) => file.endsWith('.css'));
  if (!css) throw new Error('No se encontró el CSS generado por Vite.');
  return `/assets/${css}`;
}

async function loadModule(entry) {
  await mkdir(TMP, { recursive: true });
  const outfile = path.join(TMP, `${entry.replace(/[\\/]/g, '_')}.mjs`);

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

function serviceSchema(meta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Gianni Pasquinelli',
    description: meta.description,
    url: publicUrl(meta.path),
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
}

function documentShell({ meta, body, css, structuredData }) {
  const url = publicUrl(meta.path);

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
  <meta property="og:image" content="${meta.image ?? `${ORIGIN}/og-image.jpg`}" />
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

async function fetchCases() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  try {
    const response = await fetch(
      `${url}/rest/v1/cases?select=*&visible=eq.true&order=position.asc`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    );
    if (!response.ok) return null;

    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length === 0) return null;

    return rows.map((row) => ({
      slug: row.slug,
      title: row.title,
      rubro: row.rubro_es,
      problem: row.problem_es,
      built: row.built_es,
      result: row.result_es,
      link: row.link,
      image: row.image,
      position: row.position,
    }));
  } catch {
    return null;
  }
}

async function fallbackCases() {
  const { es } = await import(
    pathToFileURL(path.join(ROOT, 'src/content/es.js')).href
  );

  return es.cases.items.map((item, index) => ({
    slug: item.slug,
    title: item.title,
    rubro: item.rubro,
    problem: item.problem,
    built: item.built,
    result: item.result,
    link: item.link,
    image: null,
    position: index + 1,
  }));
}

async function casePages() {
  const CasePage = (await loadModule('src/seo/pages/case.jsx')).default;
  const cases = (await fetchCases()) ?? (await fallbackCases());
  const pages = [];

  for (const item of cases) {
    const slug = item.slug ?? `caso-${item.position}`;
    const meta = {
      path: `/casos/${slug}`,
      title: `${item.title} | Caso — Gianni Pasquinelli`,
      description: `${item.rubro}: ${item.problem} ${item.result}`.trim(),
      image: item.image ?? undefined,
    };

    const structuredData = [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: item.title,
        description: meta.description,
        image: item.image ?? `${ORIGIN}/og-image.jpg`,
        url: publicUrl(meta.path),
        author: { '@type': 'Person', name: 'Gianni Pasquinelli' },
        publisher: { '@type': 'Person', name: 'Gianni Pasquinelli' },
      },
      serviceSchema(meta),
    ];

    pages.push({
      meta,
      html: renderToString(createElement(CasePage, { item })),
      structuredData,
    });
  }

  return pages;
}

function sitemap(extraPaths) {
  const now = new Date().toISOString().slice(0, 10);

  const homeAlternates = [
    ['es-AR', `${ORIGIN}/`],
    ['en', `${ORIGIN}/en`],
  ];

  const entries = [
    { loc: `${ORIGIN}/`, alternates: homeAlternates },
    { loc: `${ORIGIN}/en`, alternates: homeAlternates },
    ...extraPaths.map((p) => ({ loc: publicUrl(p), alternates: [] })),
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
  await loadEnvFile();

  const css = await findStylesheet();
  const pages = [];

  for (const page of STATIC_PAGES) {
    const mod = await loadModule(page.entry);
    const data = page.data ? await loadModule(page.data) : {};
    const meta = data.meta;

    const structuredData = [serviceSchema(meta)];

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

    pages.push({
      meta,
      html: renderToString(createElement(mod.default)),
      structuredData,
    });
  }

  pages.push(...(await casePages()));

  for (const page of pages) {
    const html = documentShell({ meta: page.meta, body: page.html, css, structuredData: page.structuredData });
    const outDir = path.join(DIST, page.meta.path.replace(/^\//, ''));
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, 'index.html'), html);
    console.log(`  ✓ ${page.meta.path}`);
  }

  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap(pages.map((p) => p.meta.path)));
  console.log(`  ✓ sitemap.xml (${pages.length + 2} URLs)`);
}

main().catch((error) => {
  console.error('No se pudieron generar las páginas SEO:', error);
  process.exit(1);
});
