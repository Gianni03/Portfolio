import Section from '../../ui/Section';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';
import GradientText from '@/components/GradientText';
import ContactContent from '../../features/contact/components/ContactContent';
import { useCopy } from '../../i18n/context';

export default function Contact() {
  const copy = useCopy();

  return (
    <Section id="contact">
      <CurvedSectionTitle
        text={copy.contact.title}
        curve={60}
        className="fill-[#fbfffe] transition-colors duration-1000 hover:fill-[#7A43C1]"
        direction="right"
      />

      <div className="mx-auto mt-16 max-w-xl">
        <GradientText
          colors={['#7a43c1', '#FF9FFC', '#fbfffe']}
          className="mb-8 text-5xl font-bold tracking-tight md:text-6xl"
        >
          {copy.contact.heading}
        </GradientText>

        <ContactContent />
      </div>
    </Section>
  );
}
