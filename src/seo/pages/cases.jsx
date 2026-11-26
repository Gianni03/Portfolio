/**
 * Índice de casos: /casos
 *
 * Se renderiza a HTML estático en build. Recibe los casos como prop para poder
 * generarse tanto desde Supabase como desde el diccionario de respaldo, igual
 * que la página de detalle.
 */

import CaseCard from '../../features/cases/components/CaseCard';
import SeoFooter from '../components/SeoFooter';

export default function CasesPage({ items = [] }) {
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
          Casos
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-neutral-300">
          Trabajo real, online ahora mismo. Sitios web y sistemas a medida para
          negocios de Rosario y Argentina; cada caso cuenta el problema, qué
          construí y el resultado.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <CaseCard key={item.slug ?? item.title} item={item} />
          ))}
        </div>

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
              href="/#contact"
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
