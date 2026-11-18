import GradientText from '@/components/GradientText';
import LogoLoop from '@/components/LogoLoop';
import useLogos from '../hooks/useLogos';
import { useCopy } from '../../../i18n/context';

export default function LogosSection() {
  const copy = useCopy();
  const { items } = useLogos();

  if (!items || items.length === 0) return null;

  const logos = items.map((item) => ({
    src: item.image,
    alt: item.name,
    title: item.name,
    href: item.href || undefined,
  }));

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
