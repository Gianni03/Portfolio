import SeoFooter from './SeoFooter';

/**
 * Página legal: /terminos y /privacidad
 *
 * Se renderiza a HTML estático en build. Sin CTA agresivo: son páginas de
 * referencia.
 */
export default function LegalPage({ data }) {
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
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
          {data.h1}
        </h1>

        <p className="mt-4 text-xs uppercase tracking-wider text-neutral-500">
          Última actualización: {data.updated}
        </p>

        <p className="mt-6 text-base leading-relaxed text-neutral-300">
          {data.lead}
        </p>

        {data.sections.map((section) => (
          <section key={section.title} className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-3 text-sm leading-relaxed text-neutral-400"
              >
                {paragraph}
              </p>
            ))}
            {section.list && (
              <ul className="mt-3 space-y-2">
                {section.list.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-neutral-400"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-[#7a43c1]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <p className="mt-12 text-sm leading-relaxed text-neutral-400">
          Por cualquier consulta sobre este documento:{' '}
          <a
            href="mailto:giannipasquinelli@gmail.com"
            className="text-[#FF9FFC] transition-colors hover:text-white"
          >
            giannipasquinelli@gmail.com
          </a>
        </p>
      </main>

      <SeoFooter />
    </div>
  );
}
