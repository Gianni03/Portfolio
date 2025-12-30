import Section from '../../ui/Section';

export default function Contact() {
  return (
    <Section title="Contact Me" id="contact">
      <img src="./img/logocontacto.png" alt="Contact" className="w-32 h-32 mb-4" />
      <p className="text-lg text-neutral-300">
        Feel free to reach out to me via email or connect with me on social
        media.
      </p>
    </Section>
  );
}
