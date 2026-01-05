import Section from '../../ui/Section';
import HeroCard from '@/features/hero/components/HeroCard';
import GradientText from '@/components/GradientText';
import LightRays from '@/components/LightRays';

export default function Hero() {
  return (
    <Section id="home" fullWidth={false} className="relative">
      <div className="grid gap-12 items-start mt-6 md:grid-cols-[420px_1fr]">
        {/* Left: Video Card */}
        <div className="flex justify-center md:justify-start">
          <HeroCard />
        </div>

        {/* Right: Text */}
        <div className="relative z-10 max-w-xl md:mt-20">
          <GradientText
            colors={['#7a43c1', '#FF9FFC', '#fbfffe']}
            animationSpeed={10}
            yoyo={false}
            className="text-7xl md:text-6xl font-semibold leading-tight"
          >
            Frontend Developer
          </GradientText>
          <div
            className="mt-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/15 p-6 md:p-8"
          >
            <span className="block text-3xl font-medium tracking-tight text-[#fbfffe]/90">
              focused on clean UI
            </span>
            <span className="block text-3xl font-medium tracking-tight text-[#fbfffe]/75">
              & real-world products
            </span>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#fbfffe]/70">
            I build thoughtful interfaces with React, CSS and motion,
            prioritizing clarity, performance and detail.
          </p>

          <a
            href="#projects"
            className="z-10 inline-block mt-8 px-6 py-3 rounded-full bg-[#7a43c1] text-[#fbfffe] font-medium hover:bg-[#FF9FFC] transition-colors"
          >
            View projects
          </a>
        </div>
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
      </div>
    </Section>
  );
}
