import Section from '../../ui/Section';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';

export default function Skills() {
  const skillsLogos = [
    { name: 'HTML', src: './img/skills/html5.svg' },
    { name: 'CSS', src: './img/skills/csslang.webp' },
    { name: 'JavaScript', src: './img/skills/javascript.svg' },
    { name: 'React', src: './img/skills/react.svg' },
    { name: 'Tailwind CSS', src: './img/skills/tailwindcss-icon.svg' },
    { name: 'Git', src: './img/skills/git.svg' },
    { name: 'GitHub', src: './img/skills/github.svg' },
    { name: 'Figma', src: './img/skills/figma.svg' },
    { name: 'TypeScript', src: './img/skills/typescript-icon.svg' },
    { name: 'Three.js', src: './img/skills/threejs.svg' },
  ];

  return (
    <Section title="Skills" id="skills" fullWidth={false}>
      <CurvedSectionTitle
        text="Skills"
        curve={-50}
        className="fill-[#7A43C1] transition-colors duration-500 hover:fill-[#fbfffe]"
      />
      <p className="text-lg text-neutral-300">
        Here are some of the skills I possess:
      </p>
      <ul className="list-disc list-inside mt-4">
        {skillsLogos.map((skill) => (
          <li key={skill.name} className="flex items-center mb-2">
            <img src={skill.src} alt={skill.name} className="w-6 h-6 mr-2" />
            {skill.name}
          </li>
        ))}
      </ul>
    </Section>
  );
}
