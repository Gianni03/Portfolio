import Section from '../../ui/Section';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';

export default function Contact() {
  return (
    <Section title="Contact Me" id="contact">
      <div>
      <CurvedSectionTitle
        text="Contact Me"
        curve={60}
        className="fill-[#fbfffe] transition-colors duration-500 hover:fill-[#7A43C1]"
        />
      </div>
      <div className="-mt-16">

      <CurvedSectionTitle
        text="Get in Touch"
        curve={-60}
        className="fill-[#7A43C1] transition-colors duration-500 hover:fill-[#fbfffe]"
        direction={"right"}
      />
      </div>
      <img src="./img/logocontacto.png" alt="Contact" className="w-32 h-32 mb-4" />
      <p className="text-lg text-neutral-300">
        Feel free to reach out to me via email or connect with me on social
        media.
      </p>
    </Section>
  );
}
