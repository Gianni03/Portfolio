import { useState } from 'react';
import FlipCard from '../../../components/FlipCard';
import { SERVICE_IMAGES } from '../data/serviceImages';
import { useCopy } from '../../../i18n/context';
import './ServicesSection.css';

/**
 * Decorative image for the card front. If the file is missing or fails to
 * load, it disappears and the card keeps its plain background. The text
 * already names the service, so an empty alt avoids repeating it.
 */
function ServiceImage({ src }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return null;

  return (
    <>
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-[#0b0b0c] via-[#0b0b0c]/80 to-[#0b0b0c]/10"
      />
    </>
  );
}

export default function ServicesSection() {
  const copy = useCopy();

  return (
    <>
      <p className="mb-10 text-center text-sm text-neutral-400">
        {copy.services.intro}
      </p>

      <div className="grid gap-6 md:grid-cols-3">
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
              <div className="relative h-full">
                <ServiceImage src={SERVICE_IMAGES[service.key]} />

                <div className="relative flex h-full flex-col justify-between p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-xs text-[#FF9FFC]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                      {service.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                      {service.summary}
                    </p>
                  </div>

                  <span className="text-[11px] uppercase tracking-wider text-neutral-400">
                    {copy.services.cardHint}
                  </span>
                </div>
              </div>
            }
            back={
              <div className="flex h-full flex-col p-7">
                <p className="text-[10px] uppercase tracking-wider text-[#FF9FFC]">
                  {service.tag}
                </p>

                <p className="mt-2 text-sm leading-snug text-neutral-300">
                  {service.lead}
                </p>

                <ul className="mt-4 space-y-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2 text-[13px] leading-snug text-neutral-400"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-[#7a43c1]"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <p className="mt-auto pt-4 text-[12px] leading-snug text-neutral-400">
                  <span className="text-white">
                    {copy.services.resultLabel}:
                  </span>{' '}
                  {service.result}
                </p>
              </div>
            }
          />
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 md:flex md:items-center md:justify-between md:gap-8">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-neutral-500">
            {copy.services.extra.title}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">
            {copy.services.extra.name}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400">
            {copy.services.extra.description}
          </p>
        </div>

        <a
          href="#contact"
          className="mt-4 inline-block shrink-0 text-sm font-medium text-[#FF9FFC] transition-colors hover:text-white md:mt-0"
        >
          {copy.services.cta} →
        </a>
      </div>
    </>
  );
}
