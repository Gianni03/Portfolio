import GradientText from '@/components/GradientText';
import LogoLoop from '@/components/LogoLoop';
import useLogos from '../hooks/useLogos';
import useCases from '../../cases/hooks/useCases';
import { useCopy } from '../../../i18n/context';
import './LogosSection.css';

const normalize = (url) =>
  String(url ?? '').trim().replace(/\/+$/, '').toLowerCase();

export default function LogosSection() {
  const copy = useCopy();
  const { items } = useLogos();
  const { items: cases } = useCases();

  if (!items || items.length === 0) return null;

  // El logo representa un proyecto: si su href es el sitio externo, se cambia
  // por la vista del proyecto dentro del sitio.
  const slugByLink = new Map(
    (cases ?? [])
      .filter((entry) => entry.link && entry.slug)
      .map((entry) => [normalize(entry.link), entry.slug]),
  );

  const projectsPath = copy.locale === 'en' ? '/en/projects' : '/projects';

  const logos = items.map((item) => {
    const external = /^https?:\/\//i.test(item.href ?? '');
    const slug = external ? slugByLink.get(normalize(item.href)) : null;

    // Todo apunta dentro del sitio: la vista del caso si existe, y si no el
    // listado de proyectos. Nunca el sitio externo.
    const href = slug
      ? `/casos/${slug}`
      : external
        ? projectsPath
        : item.href || projectsPath;

    return {
      src: item.image,
      alt: item.name,
      title: item.name,
      href,
    };
  });

  return (
    <div className="pt-20">
      <div className="flex justify-center">
        <GradientText
          as="h2"
          colors={['#7a43c1', '#FF9FFC', '#fbfffe']}
          animationSpeed={10}
          yoyo={false}
          className="text-2xl font-semibold tracking-tight md:text-3xl"
        >
          {copy.logos.title}
        </GradientText>
      </div>

      <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2">
        <LogoLoop
          logos={logos}
          speed={70}
          logoHeight={64}
          gap={96}
          fadeOut
          fadeOutWidth={0.08}
          muted={0.15}
          scaleOnHover
          draggable
          ariaLabel={copy.logos.title}
        />
      </div>
    </div>
  );
}
