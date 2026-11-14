import { useCopy } from '../../../i18n/context';

export default function ProcessSection() {
  const copy = useCopy();

  return (
    <ol className="grid gap-6 md:grid-cols-4">
      {copy.process.steps.map((step, index) => (
        <li
          key={step.title}
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <span className="font-mono text-sm text-[#FF9FFC]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
