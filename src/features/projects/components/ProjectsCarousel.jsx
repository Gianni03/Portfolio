import useProjects from '../hooks/useProjects';
import useCases from '../../cases/hooks/useCases';
import ProjectCard from './ProjectCard';
import Carousel from '../../../ui/Carousel';
import { useCopy } from '../../../i18n/context';

const normalize = (url) =>
  String(url ?? '').trim().replace(/\/+$/, '').toLowerCase();

/**
 * Carrusel de proyectos para la home: todos los visibles, primarios primero.
 * Si un proyecto tiene página de caso, la card lleva ahí en vez del sitio
 * externo, así el caso no queda huérfano.
 */
export default function ProjectsCarousel() {
  const copy = useCopy();
  const { projects, loading } = useProjects();
  const { items: cases } = useCases();

  if (loading) return <p className="opacity-50">{copy.projects.loading}</p>;
  if (!Array.isArray(projects)) return <p>{copy.projects.error}</p>;

  const slugByLink = new Map(
    (cases ?? [])
      .filter((entry) => entry.link && entry.slug)
      .map((entry) => [normalize(entry.link), entry.slug]),
  );

  const items = projects
    .filter((project) => project.visibility !== 'hidden')
    .sort((a, b) => {
      const rank = (project) =>
        project.visibility === 'primary' ? project.order ?? 0 : 999;
      return rank(a) - rank(b);
    })
    .map((project) => ({
      ...project,
      to: slugByLink.get(normalize(project.demo_url))
        ? `/casos/${slugByLink.get(normalize(project.demo_url))}`
        : undefined,
    }));

  return (
    <Carousel
      items={items}
      renderItem={(project) => <ProjectCard project={project} to={project.to} />}
      previousLabel={copy.projects.previous}
      nextLabel={copy.projects.next}
      dotLabel={copy.projects.goto}
    />
  );
}
