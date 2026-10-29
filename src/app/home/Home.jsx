import { lazy, Suspense } from 'react';
import Section from '../../ui/Section';
import Hero from '../hero/Hero';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';

// Only the hero ships with the first paint. Everything below the fold loads
// while the visitor is still reading the top of the page.
const AboutMe = lazy(() => import('../about/AboutMe'));
const Skills = lazy(() => import('../skills/Skills'));
const Projects = lazy(() => import('../projects/Projects'));
const Studies = lazy(() => import('../studies/Studies'));
const Contact = lazy(() => import('../contact/Contact'));

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <AboutMe />

        <Section title="Projects" id="projects">
          <CurvedSectionTitle
            text="Projects"
            curve={120}
            className="fill-[#fbfffe] transition-colors duration-1000 hover:fill-[#7A43C1]"
          />
          <div className="relative w-full">
            <div className="pt-20 pb-10 px-4 relative w-full">
              <Projects />
            </div>
          </div>
        </Section>
        <Section title="Studies" id="studies">
          <CurvedSectionTitle
            text="Studies"
            curve={-60}
            className="fill-[#7A43C1] transition-colors duration-1000 hover:fill-[#fbfffe]"
          />
          <Studies />
        </Section>
        <Skills />
        <Contact />
      </Suspense>
    </>
  );
}
