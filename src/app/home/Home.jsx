import Section from '../../ui/Section';
import Hero from '../hero/Hero';
import AboutMe from '../about/AboutMe';
import Projects from '../projects/Projects';
import Studies from '../studies/Studies';
import Skills from '../skills/Skills';
import Contact from '../contact/Contact';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutMe />
      <Skills />

      <Section title="Projects" id="projects">
        <CurvedSectionTitle
          text="Projects"
          curve={120}
          className="fill-[#fbfffe] transition-colors duration-1000 hover:fill-[#7A43C1]"
        />
        <div id="projects" className="relative w-full">
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
      <Contact />
    </>
  );
}
