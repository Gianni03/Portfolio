import { GUIDES } from '../data/guides';
import SeoFooter from './SeoFooter';

/**
 * Índice de guías: /guias
 *
 * Sin este hub, las guías solo se alcanzan por link directo o por los enlaces
 * cruzados entre ellas. El índice les da una entrada visible y un padre común.
 */
export default function GuideIndexPage() {
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
          Guías para decidir mejor
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-neutral-300">
          Preguntas que aparecen antes de contratar a alguien para hacer una
          web. Respondidas con criterio, incluso cuando la respuesta no me
          conviene.
        </p>

        <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {GUIDES.map((guide) => (
            <li key={guide.path} className="py-6">
              <a
                href={guide.path}
                className="text-xl font-semibold tracking-tight text-white transition-colors hover:text-[#FF9FFC]"
              >
                {guide.title}
              </a>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {guide.blurb}
              </p>
            </li>
          ))}
        </ul>

        <section className="mt-14">
          <p className="text-sm leading-relaxed text-neutral-400">
            Si lo que necesitás no está acá, escribime y lo respondo.
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
              href="/servicios/desarrollo-web"
              className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition-colors hover:border-[#7a43c1] hover:text-[#FF9FFC]"
            >
              Desarrollo web a medida
            </a>
          </div>
        </section>
      </main>

      <SeoFooter />
    </div>
  );
}
