import { ExternalLink } from 'lucide-react';
import { useCopy } from '../../../i18n/context';

export default function ProjectCard({ project, to }) {
  const copy = useCopy();
  const english = copy.locale === 'en';

  // Respaldo a `description` mientras la tabla no esté migrada del todo.
  const description = english
    ? project.description_en ?? project.description
    : project.description_es ?? project.description;
  const href = to || project.demo_url || project.repo_url;
  const Element = href ? 'a' : 'div';
  const linkProps = to
    ? { href: to }
    : href
      ? { href, target: '_blank', rel: 'noopener noreferrer' }
      : {};

  return (
    <Element
      {...linkProps}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors ${
        href ? 'hover:border-[#7a43c1]/60' : ''
      }`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold tracking-tight text-white">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-400">
          {description}
        </p>

        {project.stack?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded border border-white/5 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase text-neutral-500"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {href && (
          <span className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-medium text-[#FF9FFC]">
            {to
              ? copy.cases.caseLabel
              : project.demo_url
                ? copy.projects.demo
                : copy.projects.code}
            <ExternalLink size={14} />
          </span>
        )}
      </div>
    </Element>
  );
}
