import Section from '../../ui/Section'; 


export default function AboutMe() {
  return (

    // <div className="space-y-6"> este espaciando interno
    <Section title="About Me">
      <p className="text-lg text-neutral-300">
        Hello! I'm Gianni, a passionate frontend developer with a knack for
        creating engaging and user-friendly web applications. With a strong
        foundation in HTML, CSS, and JavaScript, I specialize in building
        responsive and visually appealing websites that provide seamless user
        experiences.
      </p>
      <p className="text-lg text-neutral-300 mt-4">
        When I'm not coding, you can find me exploring the latest tech trends,
        contributing to open-source projects, or indulging in my love for
        photography. I'm always eager to learn new technologies and take on
        exciting challenges that push the boundaries of web development.
      </p>
    </Section>
  );
}
