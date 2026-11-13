import useProjects from "../../features/projects/hooks/useProjects";
import useIsDesktop from "../../hooks/useIsDesktop";
import ProjectsGrid from "../../features/projects/components/ProjectsGrid";
import PrimaryProjects from "../../features/projects/components/PrimaryProjects.jsx";
import { useCopy } from "../../i18n/context";

export default function Projects() {
  const { projects, loading } = useProjects();
  const isDesktop = useIsDesktop();
  const copy = useCopy();

    if (loading) return <p className="opacity-50">{copy.projects.loading}</p>;
    if (!Array.isArray(projects)) return <p>{copy.projects.error}</p>;

    const visibleProjects = projects.filter((p) => p.visibility !== 'hidden');

    const primaryProjects = visibleProjects
    .filter((p) => p.visibility === 'primary')
    .sort((a, b) => a.order - b.order);
    const secondaryProjects = visibleProjects.filter((p) => p.visibility !== 'primary');

    if (!isDesktop) {
      return (
        <>
          <ProjectsGrid projects={primaryProjects} title={copy.projects.featured} />
          <ProjectsGrid projects={secondaryProjects} title={copy.projects.other} />
        </>
      );
    }

  
    return (
      <>
      <PrimaryProjects projects={primaryProjects} />
      <ProjectsGrid projects={secondaryProjects} title={copy.projects.other} />
      </>
    );  

}
