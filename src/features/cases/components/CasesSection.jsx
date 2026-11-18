import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useCases from '../hooks/useCases';
import useProjects from '../../projects/hooks/useProjects';
import CaseCard from './CaseCard';
import { useCopy } from '../../../i18n/context';

const normalize = (url) =>
  String(url ?? '').trim().replace(/\/+$/, '').toLowerCase();

const ARROW =
  'flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-colors hover:border-[#7a43c1] hover:text-white';

/**
 * Carrusel de casos en la home. Scroll nativo con snap: funciona con touch,
 * teclado y los botones. Las cards crecen a medida que se agregan casos.
 */
export default function CasesSection() {
  const copy = useCopy();
  const { items } = useCases();
  const { projects } = useProjects();
  const trackRef = useRef(null);

  const imageByUrl = new Map(
    (Array.isArray(projects) ? projects : [])
      .filter((project) => project.demo_url && project.image)
      .map((project) => [normalize(project.demo_url), project.image]),
  );

  if (!items || items.length === 0) return null;

  const scroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.85,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={item.title}
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)]"
          >
            <CaseCard
              item={{
                ...item,
                image: item.image || imageByUrl.get(normalize(item.link)),
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label={copy.cases.previous}
          className={ARROW}
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label={copy.cases.next}
          className={ARROW}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
