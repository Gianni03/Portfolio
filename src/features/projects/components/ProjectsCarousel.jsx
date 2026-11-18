import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useProjects from '../hooks/useProjects';
import ProjectCard from './ProjectCard';
import { useCopy } from '../../../i18n/context';

const ARROW =
  'flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-colors hover:border-[#7a43c1] hover:text-white';

/**
 * Carrusel de proyectos. Usa scroll nativo con snap: funciona con touch, con
 * teclado y con los botones, sin calcular posiciones a mano.
 */
export default function ProjectsCarousel() {
  const { projects, loading } = useProjects();
  const copy = useCopy();
  const trackRef = useRef(null);

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

  const scroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {visible.map((project) => (
          <div
            key={project.id}
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label={copy.projects.previous}
          className={ARROW}
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label={copy.projects.next}
          className={ARROW}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
