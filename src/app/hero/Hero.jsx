import Section from '../../ui/Section';
import HeroCard from '@/features/hero/components/HeroCard';

export default function Hero() {
  return (
    <Section id="home" fullWidth={false}>
      <div className="grid gap-12 items-center md:grid-cols-2">
        
        {/* Left: Video Card */}
        <div className="flex justify-center md:justify-start">
          <HeroCard />
        </div>

        {/* Right: Text */}
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-neutral-100 leading-tight">
            Frontend Developer<br />
            focused on clean UI<br />
            & real-world products
          </h1>

          <p className="mt-4 text-neutral-400 max-w-md">
            I build thoughtful interfaces with React, CSS and motion,
            prioritizing clarity, performance and detail.
          </p>

          <a
            href="#projects"
            className="inline-block mt-6 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition"
          >
            View projects
          </a>
        </div>

      </div>
    </Section>
  );
}
