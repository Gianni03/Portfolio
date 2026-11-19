/**
 * Página de caso: /casos/<slug>
 *
 * Se renderiza a HTML estático en build. Recibe el caso como prop para poder
 * generarse tanto desde Supabase como desde el diccionario de respaldo.
 */

import SeoFooter from '../components/SeoFooter';

const SITE_CONTACT = '/#contact';

function Block({ title, children }) {
  return (
    <section className="mt-12">
      <h2 className="text-xs uppercase tracking-wider text-[#FF9FFC]">
        {title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-neutral-300">
        {children}
      </p>
    </section>
  );
}

export default function CasePage({ item }) {
  if (!item) return null;

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
          {item.rubro}
        </p>

        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
          {item.title}
        </h1>

        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="mt-8 w-full rounded-2xl border border-white/10"
          />
        )}

        {item.problem && <Block title="El problema">{item.problem}</Block>}

        {item.built && <Block title="Qué construí">{item.built}</Block>}

        {item.result && (
          <section className="mt-12 rounded-2xl border border-[#7a43c1]/40 bg-[#7a43c1]/10 p-6">
            <h2 className="text-xs uppercase tracking-wider text-[#FF9FFC]">
              Resultado
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white">
              {item.result}
            </p>
          </section>
        )}

        {item.link && (
          <p className="mt-10">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#FF9FFC] transition-colors hover:text-white"
            >
              Ver el sitio →
            </a>
          </p>
        )}

        <section className="mt-16 border-t border-white/10 pt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            ¿Tenés algo parecido en mente?
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
              href={SITE_CONTACT}
              className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition-colors hover:border-[#7a43c1] hover:text-[#FF9FFC]"
            >
              Formulario
            </a>
          </div>
        </section>
      </main>

      <SeoFooter />
    </div>
  );
}
