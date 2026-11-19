import { GUIDES } from '../data/guides';

/**
 * Página de servicio: /servicios/<slug>
 *
 * Se renderiza a HTML estático en build. Recibe los datos como prop, así una
 * sola plantilla sirve para todos los servicios que se agreguen.
 */
export default function ServicePage({ data }) {
  if (!data) return null;

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
        <p className="text-xs font-medium uppercase tracking-wider text-[#FF9FFC]">
          {data.eyebrow}
        </p>

        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
          {data.h1}
        </h1>

        {data.intro.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-5 text-base leading-relaxed text-neutral-300"
          >
            {paragraph}
          </p>
        ))}

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Qué incluye
          </h2>
          <ul className="mt-5 space-y-3">
            {data.includes.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-neutral-300"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-[#7a43c1]"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Cómo trabajo
          </h2>
          <ol className="mt-5 space-y-4">
            {data.process.map(([title, body], index) => (
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
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Preguntas frecuentes
          </h2>
          <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
            {data.faqs.map(([question, answer]) => (
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
        </section>

        <section className="mt-16 border-t border-white/10 pt-10">
          <h2 className="text-sm uppercase tracking-wider text-neutral-500">
            Guías para decidir mejor
          </h2>
          <ul className="mt-5 space-y-4">
            {GUIDES.map((guide) => (
              <li key={guide.path}>
                <a
                  href={guide.path}
                  className="text-base font-medium text-[#FF9FFC] transition-colors hover:text-white"
                >
                  {guide.title} →
                </a>
                <p className="mt-1 text-sm text-neutral-500">{guide.blurb}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 border-t border-white/10 pt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Hablemos
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-400">
            Contame qué necesitás y te respondo yo. Trabajo desde Rosario con
            negocios de todo el país.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
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
            <a
              href="/desarrollo-web-rosario"
              className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition-colors hover:border-[#7a43c1] hover:text-[#FF9FFC]"
            >
              Desarrollo web en Rosario
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-3xl px-6 py-8 text-xs text-neutral-500">
          Gianni Pasquinelli · Desarrollo web a medida · Rosario, Argentina
        </div>
      </footer>
    </div>
  );
}
