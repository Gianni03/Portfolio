import Section from '../../ui/Section';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';
import GradientText from '@/components/GradientText';
import { useCopy } from '../../i18n/context';

export default function Contact() {
  const copy = useCopy();

  return (
    <Section title="Contact Me" id="contact">
      <div>
        <CurvedSectionTitle
          text={copy.contact.title}
          curve={60}
          className="fill-[#fbfffe] transition-colors duration-1000 hover:fill-[#7A43C1]"
          direction="right"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xl mx-auto text-left">
        <GradientText
          colors={['#7a43c1', '#FF9FFC', '#fbfffe']}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-10"
        >
          {copy.contact.heading}
        </GradientText>

        <p className="mt-6 text-sm text-[#fbfffe]">{copy.contact.intro}</p>

        <div className="mt-10 space-y-4 text-base">
          <a
            href="mailto:giannipasquinelli@gmail.com"
            className="
      group
      flex items-center gap-3
      rounded-xl
      border border-white/10
      px-6 py-4
      text-white
      transition-all duration-300 ease-out
      hover:border-[#7a43c1]/50
      hover:bg-linear-to-r hover:from-[#7a43c1]/10 hover:to-transparent
      hover:shadow-[0_0_30px_-10px_#7a43c1]
    "
          >
            <span
              className="
        inline-block
        transition-transform duration-300 ease-out
        group-hover:translate-x-1
      "
            >
              → {copy.contact.email}
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/gianni-pasquinelli/"
            target="_blank"
            rel="noopener noreferrer"
            className="
      group
      flex items-center gap-3
      rounded-xl
      border border-white/10
      px-6 py-4
      text-white
      transition-all duration-300 ease-out
      hover:border-[#FF9FFC]/50
      hover:bg-linear-to-r hover:from-[#FF9FFC]/10 hover:to-transparent
      hover:shadow-[0_0_30px_-10px_#FF9FFC]
    "
          >
            <span
              className="
        inline-block
        transition-transform duration-300 ease-out
        group-hover:translate-x-1
      "
            >
              → {copy.contact.linkedin}
            </span>
          </a>
        </div>
      </div>
    </Section>
  );
}
