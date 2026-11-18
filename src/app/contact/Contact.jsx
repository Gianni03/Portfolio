import Section from '../../ui/Section';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';
import { useCopy } from '../../i18n/context';

/**
 * Section header only. The contact content lives inside the showreel that
 * follows, so the curved title sits outside the image like every other
 * section title on the page.
 */
export default function Contact() {
  const copy = useCopy();

  return (
    <Section id="contact">
      <CurvedSectionTitle
        text={copy.contact.title}
        curve={60}
        className="fill-[#fbfffe] transition-colors duration-1000 hover:fill-[#7A43C1]"
        direction="left"
      />
    </Section>
  );
}
