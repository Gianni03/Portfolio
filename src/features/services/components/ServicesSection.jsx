import { useCopy } from '../../../i18n/context';

export default function ServicesSection() {
  const copy = useCopy();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {copy.services.items.map((service) => (
        <article
          key={service.title}
          className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-[#7a43c1]/50"
        >
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            {service.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-neutral-300">
            {service.description}
          </p>

          <a
            href="#contact"
            className="mt-auto pt-6 inline-block text-sm font-medium text-[#FF9FFC] transition-colors hover:text-white"
          >
            {copy.services.cta} →
          </a>
        </article>
      ))}
    </div>
  );
}
