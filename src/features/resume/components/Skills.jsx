export default function Skills() {
  const skills = [
    { name: 'Html', icon: '/img/skills/html5.svg' },
    { name: 'CSS', icon: '/img/skills/csslang.webp' },
    { name: 'JavaScript', icon: '/img/skills/javascript.svg' },
    { name: 'React', icon: '/img/skills/react.svg' },
    { name: 'TypeScript', icon: '/img/skills/typescript-icon.svg' },
    { name: 'Tailwind', icon: '/img/skills/tailwindcss-icon.svg' },
    { name: 'Figma', icon: '/img/skills/figma.svg' },
    { name: 'Git', icon: '/img/skills/git.svg' },
    { name: 'GitHub', icon: '/img/skills/github.svg' },
    { name: 'Python', icon: '/img/skills/python.svg' },
    { name: 'Twig', icon: '/img/skills/twig.svg' },


  ];
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">Skills</h2>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skills.map((skill) => (
          <li
            key={skill.name}
            className="flex items-center gap-3 text-neutral-300"
          >
            <img src={skill.icon} alt={skill.name} className="w-6 h-6" />
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
