import useProjects from '../hooks/useProjects';
import ProjectCard from './ProjectCard';
import { useCopy } from '../../../i18n/context';

export default function ProjectsShowcase() {
  const { projects, loading } = useProjects();
  const copy = useCopy();

  if (loading) return <p className="opacity-50">{copy.projects.loading}</p>;
  if (!Array.isArray(projects)) return <p>{copy.projects.error}</p>;

  const visible = projects
    .filter((project) => project.visibility !== 'hidden')
    .sort((a, b) => {
      const rank = (project) =>
        project.visibility === 'primary' ? project.order ?? 0 : 999;
      return rank(a) - rank(b);
    });

  if (visible.length === 0) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {visible.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
