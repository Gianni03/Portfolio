import { lazy, Suspense } from 'react';
import Section from '../../ui/Section';
import Hero from '../hero/Hero';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';
import ServicesSection from '../../features/services/components/ServicesSection';
import ProjectsShowcase from '../../features/projects/components/ProjectsShowcase';
import { useCopy, isEnglish } from '../../i18n/context';

// Only the hero ships with the first paint. Everything below the fold loads
// while the visitor is still reading the top of the page.
const AboutMe = lazy(() => import('../about/AboutMe'));
const Skills = lazy(() => import('../skills/Skills'));
const Contact = lazy(() => import('../contact/Contact'));

/**
 * Sales page order: promise → what you can buy → proof → who → call to action.
 * Studies and the desktop scroll narrative live outside the sales path.
 */
export default function Home() {
  const copy = useCopy();
  const english = isEnglish(copy);

  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <Section id="services">
          <CurvedSectionTitle
            text={copy.services.title}
            curve={90}
            className="fill-[#fbfffe] transition-colors duration-1000 hover:fill-[#7A43C1]"
          />
          <div className="pt-20">
            <ServicesSection />
          </div>
        </Section>

        <Section id="projects">
          <CurvedSectionTitle
            text={copy.projects.title}
            curve={120}
            className="fill-[#fbfffe] transition-colors duration-1000 hover:fill-[#7A43C1]"
          />
          <div className="pt-20 pb-10 px-4 relative w-full">
            <ProjectsShowcase />
          </div>
        </Section>

        <AboutMe />

        {english && <Skills />}

        <Contact />
      </Suspense>
    </>
  );
}
