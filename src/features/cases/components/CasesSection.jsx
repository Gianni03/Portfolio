import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useCases from '../hooks/useCases';
import useProjects from '../../projects/hooks/useProjects';
import CaseCard from './CaseCard';
import { useCopy } from '../../../i18n/context';

const normalize = (url) =>
  String(url ?? '').trim().replace(/\/+$/, '').toLowerCase();

const ARROW =
  'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-neutral-950/80 text-neutral-200 backdrop-blur transition-colors hover:border-[#7a43c1] hover:text-white disabled:pointer-events-none disabled:opacity-30';

/**
 * Carrusel de casos. Tres cards por vista en desktop, flechas a los costados
 * y puntos abajo como contador de páginas. Scroll nativo con snap: touch,
 * teclado y botones funcionan igual.
 */
export default function CasesSection() {
  const copy = useCopy();
  const { items } = useCases();
  const { projects } = useProjects();
  const trackRef = useRef(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const imageByUrl = new Map(
    (Array.isArray(projects) ? projects : [])
      .filter((project) => project.demo_url && project.image)
      .map((project) => [normalize(project.demo_url), project.image]),
  );

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;

    const total = Math.max(1, Math.round(track.scrollWidth / track.clientWidth));
    setPages(total);
    setPage(
      Math.min(total - 1, Math.max(0, Math.round(track.scrollLeft / track.clientWidth))),
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    sync();
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);

    return () => {
      track.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync, items.length]);

  const goTo = (index) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => goTo(page - 1)}
        aria-label={copy.cases.previous}
        disabled={page === 0}
        className={`${ARROW} -left-2 lg:-left-5`}
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => goTo(page + 1)}
        aria-label={copy.cases.next}
        disabled={page >= pages - 1}
        className={`${ARROW} -right-2 lg:-right-5`}
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={item.title}
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
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

      {pages > 1 && (
        <div className="mt-2 flex justify-center gap-2">
          {Array.from({ length: pages }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`${copy.cases.next} ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                index === page
                  ? 'w-6 bg-[#FF9FFC]'
                  : 'w-2 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
