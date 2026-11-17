import FlipCard from '../../../components/FlipCard';
import { useCopy } from '../../../i18n/context';
import './ServicesSection.css';

export default function ServicesSection() {
  const copy = useCopy();

  return (
    <>
      <p className="mb-10 text-center text-sm text-neutral-400">
        {copy.services.intro}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {copy.services.items.map((service, index) => (
          <FlipCard
            key={service.title}
            className="services-card"
            ariaLabel={`${service.title}: ${service.summary}`}
            background="#111113"
            color="#fbfffe"
            radius={20}
            shadow={false}
            glareOpacity={0.14}
            front={
              <div className="flex h-full flex-col justify-between p-7">
                <span className="font-mono text-xs text-[#FF9FFC]">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                    {service.summary}
                  </p>
                </div>

                <span className="text-[11px] uppercase tracking-wider text-neutral-500">
                  {copy.services.cardHint}
                </span>
              </div>
            }
            back={
              <div className="flex h-full flex-col p-7">
                <h3 className="text-[11px] uppercase tracking-wider text-[#FF9FFC]">
                  {service.title}
                </h3>

                <ul className="mt-4 space-y-2.5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-sm leading-snug text-neutral-300"
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
            }
          />
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href="#contact"
          className="text-sm font-medium text-[#FF9FFC] transition-colors hover:text-white"
        >
          {copy.services.cta} →
        </a>
      </div>
    </>
  );
}
