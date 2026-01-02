import Section from '../../ui/Section';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';
import SkillCard from '../../features/skills/components/SkillsCard';

const skills = [
  { name: 'HTML', logo: '/img/skills/html5.svg' },
  { name: 'CSS', logo: '/img/skills/csslang.webp' },
  { name: 'JavaScript', logo: '/img/skills/javascript.svg' },
  { name: 'React', logo: '/img/skills/react.svg' },
  { name: 'TypeScript', logo: '/img/skills/typescript-icon.svg' },
  { name: 'Tailwind CSS', logo: '/img/skills/tailwindcss-icon.svg' },
  { name: 'Git', logo: '/img/skills/git.svg' },
  { name: 'GitHub', logo: '/img/skills/github.svg' },
  { name: 'Figma', logo: '/img/skills/figma.svg' },
  { name: 'Three.js', logo: '/img/skills/threejs.svg' },
];

export default function Skills() {
  return (
    <Section id="skills">
      <CurvedSectionTitle
        text="Skills"
        curve={-50}
        className="fill-[#7A43C1] transition-colors duration-1000 hover:fill-[#fbfffe]"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {skills.map(skill => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    </Section>
  );
}
