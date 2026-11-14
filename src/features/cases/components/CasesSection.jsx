import useProjects from '../../projects/hooks/useProjects';
import { useCopy } from '../../../i18n/context';

const normalize = (url) => String(url ?? '').trim().replace(/\/+$/, '').toLowerCase();

/**
 * Image-led case cards. The picture is the proof; the text is a caption.
 * Images come from the projects already managed in the admin, matched by
 * live URL, so the client can change a screenshot without touching code.
 */
export default function CasesSection() {
  const copy = useCopy();
  const { projects } = useProjects();

  const imageByUrl = new Map(
    (Array.isArray(projects) ? projects : [])
      .filter((project) => project.demo_url && project.image)
      .map((project) => [normalize(project.demo_url), project.image]),
  );

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {copy.cases.items.map((item) => {
        const image = imageByUrl.get(normalize(item.link));

        return (
          <a
            key={item.title}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:border-[#7a43c1]/60"
          >
            <div className="relative aspect-video overflow-hidden bg-white/5">
              {image && (
                <img
                  src={image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <span className="text-xs font-medium uppercase tracking-wider text-[#FF9FFC]">
                {item.rubro}
              </span>

              <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                {item.result}
              </p>

              <span className="mt-auto pt-5 text-sm font-medium text-[#FF9FFC] transition-colors group-hover:text-white">
                {copy.cases.liveLabel} →
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
