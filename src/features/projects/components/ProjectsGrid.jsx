// features/projects/components/ProjectsGrid.jsx
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';

const CARD_WIDTH = 300;
const GAP = 24;
const VISIBLE_RANGE = 2;

export default function ProjectsGrid({ projects, title = 'Other Works' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);

  if (!projects || projects.length === 0) return null;

  const total = projects.length;
  const active = projects[activeIndex] ?? projects[0];
  const go = (direction) =>
    setActiveIndex((index) => (index + direction + total) % total);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) go(delta > 0 ? -1 : 1);
    touchStartX.current = null;
  };

  return (
    <section className="relative z-20 py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase">
            {title}
          </h3>
        </div>

        <div
          className="relative h-[400px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="absolute left-2 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-950/80 text-neutral-300 backdrop-blur transition-colors hover:border-purple-500/50 hover:text-white md:top-1/2 md:h-11 md:w-11 md:-translate-y-1/2"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next project"
            className="absolute right-2 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-950/80 text-neutral-300 backdrop-blur transition-colors hover:border-purple-500/50 hover:text-white md:top-1/2 md:h-11 md:w-11 md:-translate-y-1/2"
          >
            <ChevronRight size={20} />
          </button>

          {projects.map((project, index) => {
            let offset = index - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isActive = offset === 0;
            const distance = Math.abs(offset);
            if (distance > VISIBLE_RANGE) return null;

            return (
              <button
                key={project.id || index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                aria-label={`Show ${project.title}`}
                style={{
                  width: CARD_WIDTH,
                  transform: `translateX(calc(-50% + ${
                    offset * (CARD_WIDTH + GAP)
                  }px)) scale(${isActive ? 1 : 0.86})`,
                  opacity: isActive ? 1 : 0.42,
                  zIndex: 20 - distance,
                }}
                className={`group absolute left-1/2 top-0 flex h-[400px] flex-col overflow-hidden rounded-xl border bg-[#0c0c0c] text-left transition-all duration-500 ${
                  isActive
                    ? 'border-purple-500/40 shadow-[0_0_40px_-12px_rgba(122,67,193,0.6)]'
                    : 'pointer-events-none border-white/5'
                }`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div
                    className={`absolute inset-0 transition-colors duration-500 ${
                      isActive
                        ? 'bg-black/10 group-hover:bg-transparent'
                        : 'bg-black/50'
                    }`}
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h4
                    className={`text-lg font-bold transition-colors ${
                      isActive
                        ? 'text-white group-hover:text-purple-400'
                        : 'text-neutral-300'
                    }`}
                  >
                    {project.title}
                  </h4>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-400">
                    {project.description}
                  </p>

                  {project.stack?.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-white/5 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase text-neutral-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className={`absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-transparent to-transparent transition-all duration-700 ${
                    isActive ? 'via-purple-500/50' : 'via-purple-500/0'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,420px)_1fr] md:items-start">
          <div className="overflow-hidden rounded-xl border border-white/10">
            <img
              src={active.image}
              alt={active.title}
              loading="lazy"
              decoding="async"
              className="aspect-video w-full object-cover"
            />
          </div>

          <div>
            <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              {active.title}
            </h4>

            <p className="mt-4 leading-relaxed text-neutral-400">
              {active.description}
            </p>

            {active.stack?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {active.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-white/5 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase text-neutral-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {(active.demo_url || active.repo_url) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {active.demo_url && (
                  <a
                    href={active.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#7a43c1] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#FF9FFC]"
                  >
                    <ExternalLink size={16} />
                    Live demo
                  </a>
                )}
                {active.repo_url && (
                  <a
                    href={active.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#7a43c1]"
                  >
                    <Github size={16} />
                    View code
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
