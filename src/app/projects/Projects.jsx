import ProjectsGrid from "../../features/projects/components/ProjectsGrid";
import useProjects from "../../features/projects/hooks/useProjects";


export default function Projects() {
  const { projects, loading } = useProjects();
  
    if (loading) return <p className="opacity-50">Loading projects...</p>;
    if (!Array.isArray(projects)) return <p>Error loading projects</p>;

  
    return (
      <ProjectsGrid projects={projects} />
    );  
}
