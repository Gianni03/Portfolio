import useProjects from "../../features/projects/hooks/useProjects";
import useIsDesktop from "../../hooks/useIsDesktop";
import ProjectsGrid from "../../features/projects/components/ProjectsGrid";
import PrimaryProjects from "../../features/projects/components/PrimaryProjects.jsx";
import MobileProjectsStack from "../../features/projects/components/MobileProjectsStack";
export default function Projects() {
  const { projects, loading } = useProjects();
  const isDesktop = useIsDesktop();
    
    if (loading) return <p className="opacity-50">Loading projects...</p>;
    if (!Array.isArray(projects)) return <p>Error loading projects</p>;

    const primaryProjects = projects
    .filter((p) => p.visibility === 'primary')
    .sort((a, b) => a.order - b.order);
    const secondaryProjects = projects.filter((p) => p.visibility !== 'primary');
    
    if (!isDesktop) {
      return <MobileProjectsStack projects={[...primaryProjects, ...secondaryProjects]} />;
    }

  
    return (
      <>
      <PrimaryProjects projects={primaryProjects} />
      <ProjectsGrid projects={secondaryProjects} />
      </>
    );  

}