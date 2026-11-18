import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GAP = 24;
const AUTOPLAY_MS = 6000;

const ARROW =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-neutral-950/70 text-neutral-200 transition-colors hover:border-[#7a43c1] hover:text-white';

const ITEM = 'w-[85%] shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]';

/**
 * Carrusel con loop infinito, tres items por vista en desktop, flechas fuera
 * de la pista y puntos como contador.
 *
 * Duplica la lista para que el salto del final al principio no se vea: al
 * terminar la transición vuelve al índice 0 sin animación. Se mueve por
 * transform, así el control es exacto y no depende del scroll.
 */
export default function Carousel({
  items = [],
  renderItem,
  previousLabel = 'Anterior',
  nextLabel = 'Siguiente',
  dotLabel = 'Ir al elemento',
}) {
  const firstItemRef = useRef(null);
  const touchStartX = useRef(null);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  const total = items.length;

  useEffect(() => {
    const measure = () => {
      const node = firstItemRef.current;
      if (!node) return;
      setStep(node.getBoundingClientRect().width + GAP);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [total]);

  const next = () => {
    setAnimate(true);
    setIndex((current) => current + 1);
  };

  const previous = () => {
    // Desde el primero se salta a la copia duplicada sin animación y desde ahí
    // se retrocede uno, así el retroceso también se ve continuo.
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
  };

  useEffect(() => {
    if (paused || total <= 1) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const id = setInterval(() => {
      setAnimate(true);
      setIndex((current) => current + 1);
    }, AUTOPLAY_MS);

    return () => clearInterval(id);
  }, [paused, total]);

  if (total === 0) return null;

  const loop = total > 1 ? [...items, ...items] : items;
  const active = index % total;

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < 50 || total <= 1) return;
    if (delta < 0) next();
    else previous();
  };

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
            aria-label={previousLabel}
            className={`${ARROW} hidden md:flex`}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
        )}

        <div
          className="min-w-0 flex-1 overflow-hidden"
          style={{ touchAction: 'pan-y' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex gap-6 ${animate ? 'transition-transform duration-700 ease-out' : ''}`}
            style={{ transform: `translateX(-${index * step}px)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {loop.map((item, position) => (
              <div
                key={position}
                ref={position === 0 ? firstItemRef : null}
                className={ITEM}
              >
                {renderItem(item, position % total)}
              </div>
            ))}
          </div>
        </div>

        {total > 1 && (
          <button
            type="button"
            onClick={next}
            aria-label={nextLabel}
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
              key={position}
              type="button"
              onClick={() => {
                setAnimate(true);
                setIndex(position);
              }}
              aria-label={`${dotLabel} ${position + 1}`}
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
