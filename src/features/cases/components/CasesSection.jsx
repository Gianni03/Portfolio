import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useCases from '../hooks/useCases';
import useProjects from '../../projects/hooks/useProjects';
import CaseCard from './CaseCard';
import { useCopy } from '../../../i18n/context';

const normalize = (url) =>
  String(url ?? '').trim().replace(/\/+$/, '').toLowerCase();

const GAP = 24;
const AUTOPLAY_MS = 6000;

const ARROW =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-neutral-950/70 text-neutral-200 transition-colors hover:border-[#7a43c1] hover:text-white';

const CARD =
  'w-[85%] shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]';

/**
 * Carrusel de casos con loop infinito.
 *
 * Se duplica la lista para que el salto del final al principio no se vea: al
 * terminar la transición se vuelve al índice 0 sin animación. Las cards se
 * desplazan por transform, así el control es exacto y no depende del scroll.
 */
export default function CasesSection() {
  const copy = useCopy();
  const { items } = useCases();
  const { projects } = useProjects();
  const firstCardRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  const imageByUrl = new Map(
    (Array.isArray(projects) ? projects : [])
      .filter((project) => project.demo_url && project.image)
      .map((project) => [normalize(project.demo_url), project.image]),
  );

  const measure = useCallback(() => {
    const card = firstCardRef.current;
    if (!card) return;
    setStep(card.getBoundingClientRect().width + GAP);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, items?.length]);

  const total = items?.length ?? 0;

  const next = useCallback(() => {
    setAnimate(true);
    setIndex((current) => current + 1);
  }, []);

  const previous = useCallback(() => {
    // Desde la primera card se salta a la copia duplicada sin animación y
    // desde ahí se retrocede una, así el retroceso también se ve continuo.
    if (index === 0 && total > 1) {
      setAnimate(false);
      setIndex(total);
      requestAnimationFrame(() => {
        setAnimate(true);
        setIndex(total - 1);
      });
      return;
    }
    setAnimate(true);
    setIndex((current) => Math.max(0, current - 1));
  }, [index, total]);

  useEffect(() => {
    if (paused || total <= 1) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next, paused, total]);

  if (!items || total === 0) return null;

  const loop = total > 1 ? [...items, ...items] : items;
  const active = index % total;

  const handleTransitionEnd = () => {
    if (index < total) return;
    setAnimate(false);
    setIndex(0);
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
  };

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex items-center gap-4">
        {total > 1 && (
          <button
            type="button"
            onClick={previous}
            aria-label={copy.cases.previous}
            className={`${ARROW} hidden md:flex`}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
        )}

        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className={`flex gap-6 ${animate ? 'transition-transform duration-700 ease-out' : ''}`}
            style={{ transform: `translateX(-${index * step}px)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {loop.map((item, position) => (
              <div
                key={`${item.slug ?? item.title}-${position}`}
                ref={position === 0 ? firstCardRef : null}
                className={CARD}
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
        </div>

        {total > 1 && (
          <button
            type="button"
            onClick={next}
            aria-label={copy.cases.next}
            className={`${ARROW} hidden md:flex`}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        )}
      </div>

      {total > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {items.map((item, position) => (
            <button
              key={item.slug ?? item.title}
              type="button"
              onClick={() => {
                setAnimate(true);
                setIndex(position);
              }}
              aria-label={`${copy.cases.gotoCases} ${position + 1}`}
              aria-current={position === active}
              className={`h-2 rounded-full transition-all ${
                position === active
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
