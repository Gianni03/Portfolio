import Section from '../../ui/Section';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';
import ProjectsCarousel from '../../features/projects/components/ProjectsCarousel';
import { useCopy } from '../../i18n/context';

export default function Projects() {
  const copy = useCopy();

  return (
    <Section id="projects">
      <CurvedSectionTitle
        text={copy.projects.title}
        curve={120}
        className="fill-[#fbfffe] transition-colors duration-1000 hover:fill-[#7A43C1]"
      />
      <div className="pt-20 pb-10 px-4 relative w-full">
        <ProjectsCarousel />
      </div>
    </Section>
  );
}
