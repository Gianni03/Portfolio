import Section from '../../ui/Section';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';
import SkillCard from '../../features/skills/components/SkillsCard';
import { SKILLS } from '../../features/skills/data';
import { useCopy } from '../../i18n/context';

export default function Skills() {
  const copy = useCopy();

  return (
    <Section id="skills">
      <CurvedSectionTitle
        text={copy.skills.title}
        curve={-50}
        className="fill-[#7A43C1] transition-colors duration-1000 hover:fill-[#fbfffe]"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {SKILLS.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    </Section>
  );
}
