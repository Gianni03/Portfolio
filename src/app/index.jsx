import Section from "../ui/Section";
import ProjectsGrid from "../features/projects/components/ProjectsGrid";
import useProjects from "../features/projects/hooks/useProjects";

export default function Home() {
  const { projects } = useProjects();

  return (
    <>
      <Section title="Proyectos">
        <ProjectsGrid projects={projects} />
      </Section>
    </>
  );
}
