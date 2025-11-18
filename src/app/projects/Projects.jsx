import ProjectsGrid from "../../features/projects/components/ProjectsGrid";
import useProjects from "../../features/projects/hooks/useProjects";


export default function Projects() {
  const { projects } = useProjects();

  return (
    <div>
      <h1>Mis Proyectos</h1>
      <ProjectsGrid projects={projects}/>
    </div>
  );
}
