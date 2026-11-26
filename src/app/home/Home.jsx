import { lazy, Suspense, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Section from '../../ui/Section';
import Hero from '../hero/Hero';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';
import { useCopy } from '../../i18n/context';

// Only the hero ships with the first paint. Everything below the fold loads
// while the visitor is still reading the top of the page.
const Contact = lazy(() => import('../contact/Contact'));

// Todo lo que está debajo del hero se carga aparte. Antes estas secciones y
// sus componentes de React Bits viajaban en el bundle de entrada, y el primer
// paint solo necesita el hero.
const ServicesSection = lazy(
  () => import('../../features/services/components/ServicesSection'),
);
const CasesCarousel = lazy(
  () => import('../../features/cases/components/CasesCarousel'),
);
const ProcessSection = lazy(
  () => import('../../features/process/components/ProcessSection'),
);
const FaqSection = lazy(() => import('../../features/faq/components/FaqSection'));
const ShowreelSection = lazy(
  () => import('../../features/showreel/components/ShowreelSection'),
);
const LogosSection = lazy(
  () => import('../../features/logos/components/LogosSection'),
);

const TITLE_CLASS =
  'fill-[#fbfffe] transition-colors duration-1000 hover:fill-[#7A43C1]';

const INTRO_CLASS =
  'mb-10 bg-linear-to-r from-[#7a43c1] via-[#FF9FFC] to-[#fbfffe] bg-clip-text text-center text-sm font-medium text-transparent';

/**
 * En una visita directa a /#contact el navegador intenta saltar al ancla
 * antes de que React monte las secciones lazy: no la encuentra y la página
 * queda arriba. Reintentamos hasta que el destino exista y ahí saltamos.
 */
function useHashLanding() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return undefined;

    const id = decodeURIComponent(hash.slice(1));

    const land = (behavior) => {
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView({ behavior, block: 'start' });
      return true;
    };

    // El ancla ya existe (cambio de hash dentro de la home): se anima.
    if (land('smooth')) return undefined;

    // Visita directa: las secciones lazy todavía no están montadas. Esperamos
    // a que aparezcan y saltamos, como haría el navegador con el ancla.
    const observer = new MutationObserver(() => {
      if (land('instant')) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [hash]);
}

/**
 * Sales page order: promise -> what you can buy -> proof -> process ->
 * call to action -> objections.
 */
export default function Home() {
  const copy = useCopy();
  useHashLanding();

  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <Section id="services">
          <CurvedSectionTitle
            text={copy.services.title}
            curve={90}
            className={TITLE_CLASS}
            direction="right"
          />
          <div className="pt-20">
            <ServicesSection />
          </div>
        </Section>

        <Section id="cases">
          <CurvedSectionTitle
            text={copy.cases.title}
            curve={120}
            className={TITLE_CLASS}
          />
          <div className="pt-20">
            <CasesCarousel />
            <div className="mt-10 text-center">
              <Link
                to="/casos"
                className="text-sm font-medium text-[#FF9FFC] transition-colors hover:text-white"
              >
                {copy.cases.viewAll} →
              </Link>
            </div>

            <LogosSection />
          </div>
        </Section>

        <Section id="process">
          <CurvedSectionTitle
            text={copy.process.title}
            curve={-60}
            className={TITLE_CLASS}
            direction="right"
          />
          <div className="pt-20">
            <p className={INTRO_CLASS}>{copy.process.intro}</p>
            <ProcessSection />
          </div>
        </Section>

        <Contact />

        <ShowreelSection />

        <Section id="faq">
          <CurvedSectionTitle
            text={copy.faq.title}
            curve={-40}
            className={TITLE_CLASS}
          />
          <div className="pt-20">
            <FaqSection />
          </div>
        </Section>
      </Suspense>
    </>
  );
}
