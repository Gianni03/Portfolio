import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Section from '../../ui/Section';
import Hero from '../hero/Hero';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';
import ServicesSection from '../../features/services/components/ServicesSection';
import CasesSection from '../../features/cases/components/CasesSection';
import ProcessSection from '../../features/process/components/ProcessSection';
import FaqSection from '../../features/faq/components/FaqSection';
import ShowreelSection from '../../features/showreel/components/ShowreelSection';
import { useCopy } from '../../i18n/context';

// Only the hero ships with the first paint. Everything below the fold loads
// while the visitor is still reading the top of the page.
const AboutMe = lazy(() => import('../about/AboutMe'));

const TITLE_CLASS =
  'fill-[#fbfffe] transition-colors duration-1000 hover:fill-[#7A43C1]';

/**
 * Sales page order: promise -> what you can buy -> proof -> process ->
 * who -> objections -> call to action.
 */
export default function Home() {
  const copy = useCopy();
  const projectsPath = copy.locale === 'en' ? '/en/projects' : '/projects';

  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <Section id="services">
          <CurvedSectionTitle
            text={copy.services.title}
            curve={90}
            className={TITLE_CLASS}
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
            <p className="mb-10 text-center text-sm text-neutral-400">
              {copy.cases.intro}
            </p>
            <CasesSection />
            <div className="mt-10 text-center">
              <Link
                to={projectsPath}
                className="text-sm font-medium text-[#FF9FFC] transition-colors hover:text-white"
              >
                {copy.cases.viewAll} →
              </Link>
            </div>
          </div>
        </Section>

        <Section id="process">
          <CurvedSectionTitle
            text={copy.process.title}
            curve={-60}
            className={TITLE_CLASS}
          />
          <div className="pt-20">
            <p className="mb-10 text-center text-sm text-neutral-400">
              {copy.process.intro}
            </p>
            <ProcessSection />
          </div>
        </Section>

        <AboutMe />

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

        <ShowreelSection />
      </Suspense>
    </>
  );
}
