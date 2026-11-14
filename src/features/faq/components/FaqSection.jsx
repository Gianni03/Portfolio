import { useCopy } from '../../../i18n/context';

export default function FaqSection() {
  const copy = useCopy();

  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/10 border-y border-white/10">
      {copy.faq.items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-white [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="text-lg text-[#FF9FFC] transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
