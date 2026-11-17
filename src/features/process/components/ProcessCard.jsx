import { MessageCircle, FileText, Code2, Rocket } from 'lucide-react';

const ICONS = [MessageCircle, FileText, Code2, Rocket];

export default function ProcessCard({ step, index, total }) {
  const Icon = ICONS[index] ?? MessageCircle;

  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111113] p-8 shadow-2xl shadow-black/60 md:p-10">
      <span className="pointer-events-none absolute right-6 top-6 font-mono text-xs text-neutral-600">
        {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
      </span>

      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#7a43c1]/40 bg-[#7a43c1]/10 text-[#FF9FFC]">
          <Icon size={24} aria-hidden="true" />
        </span>

        <div className="flex-1">
          <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {step.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-neutral-300 md:text-base">
            {step.description}
          </p>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {step.points.map((point) => (
              <li
                key={point}
                className="flex gap-2 text-sm leading-snug text-neutral-400"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-[#7a43c1]"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
