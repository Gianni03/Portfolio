import Section from '../../ui/Section';
import Hero from '../hero/Hero';
import AboutMe from '../about/AboutMe';
import Projects from '../projects/Projects';
import Studies from '../studies/Studies';
import Skills from '../skills/Skills';
import Contact from '../contact/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutMe />
      <Skills />

      <Section title="Projects" id="projects">
        <Projects />
      </Section>
      <Section title="Studies" id="studies">
        <Studies />
      </Section>
      <Contact />
    </>
  );
}
