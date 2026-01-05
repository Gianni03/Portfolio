import Section from '../../ui/Section';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';

export default function AboutMe() {
  return (
    <Section id="about" fullWidth={true} >
      <CurvedSectionTitle
        text="About Me"
        curve={160}
        className="fill-[#fbfffe] transition-colors duration-1000 hover:fill-[#7A43C1]"
      />

      <div className="container relative mx-auto px-4 mt-12 max-w-3xl p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
        <div className="max-w-3xl space-y-6">
            <p className="text-base leading-relaxed text-[#fbfffe] mb-4">
        My name is Gianni, I’m a frontend developer from Argentina with a
        background in music composition and visual aesthetics. My path into web
        development wasn’t linear, it grew from a creative foundation and
        evolved into a strong focus on building clean, intentional, and expressive
        user interfaces.
      </p>

      <p className="text-base leading-relaxed text-[#fbfffe] mb-4">
        I work at the intersection of logic and creativity. Every layout,
        animation, and interaction is a chance to bring clarity and rhythm into
        a product. I care deeply about visual consistency, maintainable
        components, and micro-details that subtly elevate the user experience.
      </p>

      <p className="text-base leading-relaxed text-[#fbfffe] mb-4">
        Coming from music and teaching, I naturally think in systems, patterns,
        and flow. I enjoy refining UI, translating designs into polished
        interfaces, and making sure that every element feels purposeful rather
        than decorative.
      </p>

      <p className="text-base leading-relaxed text-[#fbfffe]">
        I’m especially motivated by environments where quality matters, where
        attention to detail is valued, and where the user experience is treated
        as a core part of the product. Always learning, always building.
      </p>

      <p className="mt-6 text-sm text-[#fbfffe]/80">
        Frontend · UI Engineering · Visual Polish · Motion & Interaction
      </p>
        </div>
      </div>
    </Section>
  );
}
