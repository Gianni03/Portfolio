import Section from '../../ui/Section';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';
import { useCopy } from '../../i18n/context';

export default function AboutMe() {
  const copy = useCopy();

  return (
    <Section id="about" fullWidth={true} >
      <CurvedSectionTitle
        text={copy.about.title}
        curve={160}
        className="fill-[#fbfffe] transition-colors duration-1000 hover:fill-[#7A43C1]"
      />

      <div className="container relative mx-auto px-4 mt-12 max-w-3xl p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
        <div className="max-w-3xl space-y-6">
          {copy.about.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-[#fbfffe] mb-4">
              {paragraph}
            </p>
          ))}

          <p className="mt-6 text-sm text-[#fbfffe]/80">{copy.about.tags}</p>
        </div>
      </div>
    </Section>
  );
}
