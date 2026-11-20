import { useEffect, useState } from 'react';
import Section from '../../ui/Section';
import HeroCard from '@/features/hero/components/HeroCard';
import GradientText from '@/components/GradientText';
import LightRays from '@/components/LightRays';
import { useCopy } from '../../i18n/context';

export default function Hero() {
  const copy = useCopy();

  // Los rayos son decorativos y son WebGL: montarlos en el primer paint atrasa
  // la carga sin aportar nada. Se encienden después de pintar el hero.
  const [showRays, setShowRays] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShowRays(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Section id="home" fullWidth={false} className="relative">
       <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 mt-6 lg:grid lg:grid-cols-[420px_1fr] lg:items-start lg:gap-12">
        {/* Left: Video Card */}
        <div className="flex w-full justify-center lg:justify-start">
          <HeroCard />
        </div>

        {/* Right: Text */}
        <div className="relative z-10 w-full text-center lg:text-left">
          <GradientText
            as="h1"
            colors={['#7a43c1', '#FF9FFC', '#fbfffe']}
            animationSpeed={10}
            yoyo={false}
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight"
          >
            {copy.hero.title}
          </GradientText>

          <div className="mt-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/15 p-6 md:p-8">
            <span className="block text-2xl sm:text-3xl font-medium tracking-tight text-[#fbfffe]/90">
              {copy.hero.line1}
            </span>
            <span className="block text-2xl sm:text-3xl font-medium tracking-tight text-[#fbfffe]/75">
              {copy.hero.line2}
            </span>
          </div>

          <p className="mt-6 max-w-md mx-auto lg:mx-0 text-sm leading-relaxed text-[#fbfffe]/70">
            {copy.hero.intro}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-8">
            <a
              href="#cases"
              className="z-10 inline-block px-6 py-3 rounded-full bg-[#7a43c1] text-[#fbfffe] font-medium hover:bg-[#FF9FFC] transition-colors"
            >
              {copy.hero.primaryCta}
            </a>
            <a
              href="#contact"
              className="z-10 inline-block px-6 py-3 rounded-full border border-white/20 text-[#fbfffe] font-medium hover:border-[#7a43c1] hover:text-[#FF9FFC] transition-colors"
            >
              {copy.hero.secondaryCta}
            </a>
          </div>
        </div>
        {showRays && (
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              inset: '0',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <LightRays
              raysOrigin="top"
              lightSpread={8}
              fadeDistance={1}
              rayLength={1}
              raysColor="#7a43c1"
              className="custom-rays"
            />
          </div>
        )}
      </div>
    </Section>
  );
}
