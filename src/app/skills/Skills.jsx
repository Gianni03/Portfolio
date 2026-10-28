import Section from '../../ui/Section';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';
import SkillCard from '../../features/skills/components/SkillsCard';

const skills = [
  { name: 'React', logo: '/img/skills/react.svg' },
  { name: 'Next.js', logo: '/img/skills/nextjs-icon.svg' },
  { name: 'TypeScript', logo: '/img/skills/typescript-icon.svg' },
  { name: 'JavaScript', logo: '/img/skills/javascript.svg' },
  { name: 'Tailwind CSS', logo: '/img/skills/tailwindcss-icon.svg' },
  { name: 'Supabase', logo: '/img/skills/supabase-logo-icon.svg' },
  { name: 'Three.js', logo: '/img/skills/threejs.svg' },
  { name: 'Git', logo: '/img/skills/git.svg' },
  { name: 'Figma', logo: '/img/skills/figma.svg' },
  { name: 'Accessibility', logo: '/img/skills/a11y.webp' },
  { name: 'Performance', logo: '/img/skills/InternetDinosaur-Sticker-510x510.webp' },
  { name: 'AI-assisted workflows', logo: '/img/skills/gentle-ai.jpg' },
];

export default function Skills() {
  return (
    <Section id="skills">
      <CurvedSectionTitle
        text="Skills"
        curve={-50}
        className="fill-[#7A43C1] transition-colors duration-1000 hover:fill-[#fbfffe]"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {skills.map(skill => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    </Section>
  );
}
