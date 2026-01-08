import ProjectsGrid from "../../features/projects/components/ProjectsGrid";
import useProjects from "../../features/projects/hooks/useProjects";
import PrimaryProjects from "../../features/projects/components/PrimaryProjects.jsx";

export default function Projects() {
  const { projects, loading } = useProjects();
  
    if (loading) return <p className="opacity-50">Loading projects...</p>;
    if (!Array.isArray(projects)) return <p>Error loading projects</p>;

    const primaryProjects = projects
    .filter((p) => p.visibility === 'primary')
    .sort((a, b) => a.order - b.order);
    const secondaryProjects = projects.filter((p) => p.visibility !== 'primary');
    

  
    return (
      <>
      <PrimaryProjects projects={primaryProjects} />
      <ProjectsGrid projects={secondaryProjects} />
      </>
    );  
}
