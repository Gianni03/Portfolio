import { useMemo } from 'react';
import ScrollExpand from '../../../components/ScrollExpand';
import useProjects from '../../projects/hooks/useProjects';
import { useCopy } from '../../../i18n/context';

// Shown while the project images are still loading, or if none is available.
const FALLBACK_MEDIA = '/img/services/sitios-web.webp';

/**
 * Closing showreel. The frame grows from a rounded card to the full viewport
 * and the closing statement fades in over it, handing the visitor straight to
 * the contact form.
 */
export default function ShowreelSection() {
  const copy = useCopy();
  const { projects } = useProjects();

  const src = useMemo(() => {
    const list = Array.isArray(projects) ? projects : [];
    const featured = list
      .filter((project) => project.visibility === 'primary' && project.image)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))[0];

    return featured?.image ?? FALLBACK_MEDIA;
  }, [projects]);

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <ScrollExpand
        src={src}
        mediaType="image"
        alt=""
        title={copy.showreel.title}
        scrollHint={copy.showreel.hint}
        startWidth={60}
        startHeight={84}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.16}
        scrollDistance={0.55}
        holdDistance={0.15}
        smoothing={0.12}
        overlayScrim={0.72}
        useWindowScroll
      >
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
            {copy.closing.title}
          </h2>

          <p className="mt-6 text-base leading-relaxed text-neutral-200">
            {copy.closing.body}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-neutral-400">
            {copy.closing.footer}
          </p>
        </div>
      </ScrollExpand>
    </div>
  );
}
