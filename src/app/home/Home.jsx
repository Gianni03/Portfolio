import Section from '../../ui/Section';
import Hero from '../hero/Hero';
import AboutMe from '../about/AboutMe';
import Projects from '../projects/Projects';
import Studies from '../studies/Studies';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutMe />
      <Section title="Skills" id="skills"></Section>

      <Section title="Projects" id="projects">
        <Projects />
      </Section>
      <Section title="Studies" id="studies">
        <Studies />
      </Section>
      <Section title="Contact Me" id="contact"></Section>
    </>
  );
}
