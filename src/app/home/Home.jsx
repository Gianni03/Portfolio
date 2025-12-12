import Section from '../../ui/Section';
import Projects from '../projects/Projects';
import Studies from '../studies/Studies';

export default function Home() {
  return (
    <>
      <Section title="Hero" id="hero"></Section>
      <Section title="About Me" id="about"></Section>
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
