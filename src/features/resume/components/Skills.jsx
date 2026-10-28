export default function Skills() {
  const skills = [
    { name: 'React', icon: '/img/skills/react.svg' },
    { name: 'Next.js', icon: '/img/skills/nextjs-icon.svg' },
    { name: 'TypeScript', icon: '/img/skills/typescript-icon.svg' },
    { name: 'JavaScript', icon: '/img/skills/javascript.svg' },
    { name: 'Tailwind', icon: '/img/skills/tailwindcss-icon.svg' },
    { name: 'Supabase', icon: '/img/skills/supabase-logo-icon.svg' },
    { name: 'Three.js', icon: '/img/skills/threejs.svg' },
    { name: 'Git', icon: '/img/skills/git.svg' },
    { name: 'Figma', icon: '/img/skills/figma.svg' },
    { name: 'Accessibility', icon: '/img/skills/a11y.webp' },
    { name: 'Performance', icon: '/img/skills/InternetDinosaur-Sticker-510x510.webp' },
    { name: 'AI-assisted workflows', icon: '/img/skills/gentle-ai.jpg' },
  ];
  return (
    <section className="space-y-10">
      <h2 className="text-3xl font-bold mb-8">Skills</h2>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-6 bg-neutral-900 p-6 rounded-lg">
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
