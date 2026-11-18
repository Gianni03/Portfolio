import { useCopy } from '../../../i18n/context';

/**
 * Card de caso. La imagen es la prueba, el texto es el pie.
 */
export default function CaseCard({ item }) {
  const copy = useCopy();

  return (
    <a
      href={`/casos/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:border-[#7a43c1]/60"
    >
      <div className="relative aspect-video overflow-hidden bg-white/5">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-bold tracking-tight text-white">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-neutral-300">
          {item.result}
        </p>

        <span className="mt-auto pt-5 text-sm font-medium text-[#FF9FFC] transition-colors group-hover:text-white">
          {copy.cases.caseLabel} →
        </span>
      </div>
    </a>
  );
}
