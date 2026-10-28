import { SKILLS } from '../../skills/data';

export default function Skills() {
  return (
    <section className="space-y-10">
      <h2 className="text-3xl font-bold mb-8">Skills</h2>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-6 bg-neutral-900 p-6 rounded-lg">
        {SKILLS.map((skill) => (
          <li
            key={skill.name}
            className="flex items-center gap-3 text-neutral-300"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-stone-200">
              <img
                src={skill.logo}
                alt=""
                style={
                  skill.zoom && skill.zoom !== 1
                    ? { transform: `scale(${skill.zoom})` }
                    : undefined
                }
                className="h-5 w-5 object-contain"
              />
            </span>
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
