import { useCopy } from '../../../i18n/context';

export default function CasesSection() {
  const copy = useCopy();
  const labels = copy.cases.labels;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {copy.cases.items.map((item) => (
        <a
          key={item.title}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-[#7a43c1]/60"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-[#FF9FFC]">
            {item.rubro}
          </span>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
            {item.title}
          </h3>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-neutral-500">
                {labels.problem}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                {item.problem}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wider text-neutral-500">
                {labels.built}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                {item.built}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wider text-neutral-500">
                {labels.result}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white">
                {item.result}
              </p>
            </div>
          </div>

          <span className="mt-auto pt-6 text-sm font-medium text-[#FF9FFC] transition-colors group-hover:text-white">
            {copy.cases.liveLabel} →
          </span>
        </a>
      ))}
    </div>
  );
}
