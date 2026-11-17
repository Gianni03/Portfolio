/**
 * Landing local: /desarrollo-web-rosario
 *
 * Se renderiza a HTML estático en build (scripts/build-seo-pages.mjs), así que
 * no usa router, contexto ni ningún componente que dependa del navegador.
 * Todo el texto español vive acá a propósito: es la página que tiene que
 * rankear y ser citada por motores de respuestas.
 */

import { faqs } from './rosario.data';

const SERVICIOS = [
  {
    title: 'Sitios web a medida',
    body: 'Diseño y desarrollo desde cero, adaptado a celulares y computadoras, con SEO técnico, formularios y dominio configurado a tu nombre.',
  },
  {
    title: 'Landing pages',
    body: 'Una página con un solo objetivo: que la visiten y te escriban. Con formulario o contacto directo por WhatsApp.',
  },
  {
    title: 'Sistemas y paneles web',
    body: 'Herramientas para administrar precios, stock, turnos o clientes, con acceso desde cualquier dispositivo.',
  },
];

const PROCESO = [
  ['Charla', 'Me contás qué necesitás. Veinte minutos, sin compromiso.'],
  ['Propuesta', 'Alcance, precio y fecha, por escrito antes de empezar.'],
  ['Desarrollo', 'Avances cada semana sobre un entorno de prueba.'],
  ['Entrega', 'Publicado en tu dominio. Te enseño a manejarlo.'],
];

const ZONA = [
  'Rosario',
  'Funes',
  'Roldán',
  'Granadero Baigorria',
  'Villa Gobernador Gálvez',
  'Pérez',
  'San Lorenzo',
];


function Section({ title, children }) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}


export default function RosarioPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <a href="/" className="text-lg font-bold tracking-tight">
            Gianni.dev
          </a>
          <a
            href="/"
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            Volver al inicio
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
          Desarrollo web en Rosario
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-neutral-300">
          Diseño y construyo sitios, landing pages y sistemas a medida para
          negocios de Rosario, Funes, Roldán y la región. Escribo el código yo:
          sin plantillas y sin intermediarios.
        </p>

        <p className="mt-4 text-base leading-relaxed text-neutral-400">
          La diferencia concreta: podés actualizar precios, textos e imágenes
          desde un panel, sin llamar a un desarrollador cada vez.
        </p>

        <Section title="Qué hago">
          <ul className="space-y-5">
            {SERVICIOS.map((item) => (
              <li key={item.title}>
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Cómo trabajo">
          <ol className="space-y-4">
            {PROCESO.map(([title, body], index) => (
              <li key={title} className="flex gap-4">
                <span className="mt-1 font-mono text-xs text-[#FF9FFC]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Un trabajo en la ciudad">
          <p className="text-sm leading-relaxed text-neutral-400">
            El Rey del Chajá es una pastelería artesanal en Boulevard Oroño
            2955, Rosario. Tenía un sitio de plantilla, sin SEO, y cada cambio de
            precio dependía del desarrollador. Rehice el sitio, agregué un panel
            para editar precios y sumé las tres pantallas de 55 pulgadas del
            local, todo manejado desde el mismo panel.
          </p>
          <a
            href="https://www.elreydelchaja.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium text-[#FF9FFC] transition-colors hover:text-white"
          >
            Ver el sitio →
          </a>
        </Section>

        <Section title="Zona de trabajo">
          <p className="text-sm leading-relaxed text-neutral-400">
            Trabajo desde Rosario con negocios de la ciudad y sus alrededores,
            y de forma remota con clientes de todo el país.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-300">
            {ZONA.join(' · ')}
          </p>
        </Section>

        <Section title="Preguntas frecuentes">
          <div className="divide-y divide-white/10 border-y border-white/10">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-white">
                  {question}
                  <span
                    aria-hidden="true"
                    className="text-lg text-[#FF9FFC] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </Section>

        <Section title="Hablemos">
          <p className="text-sm leading-relaxed text-neutral-400">
            Contame qué necesitás y te respondo yo.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="mailto:giannipasquinelli@gmail.com"
              className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition-colors hover:border-[#7a43c1] hover:text-[#FF9FFC]"
            >
              Email
            </a>
            <a
              href="https://wa.me/5493413704638"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-[#7a43c1] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#FF9FFC]"
            >
              WhatsApp
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition-colors hover:border-[#7a43c1] hover:text-[#FF9FFC]"
            >
              Formulario
            </a>
          </div>
        </Section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-3xl px-6 py-8 text-xs text-neutral-500">
          Gianni Pasquinelli · Desarrollo web a medida · Rosario, Argentina
        </div>
      </footer>
    </div>
  );
}
