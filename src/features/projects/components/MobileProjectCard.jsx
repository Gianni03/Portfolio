export default function MobileProjectCard({ project, index, total }) {
  const { title, description, image, stack, demo_url, repo_url } = project;

  return (
    <div className="relative bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1">
        {/* Imagen */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-transparent to-transparent" />
        </div>

        {/* Contenido */}
        <div className="p-4">
          <h3 className="text-xl font-bold text-white mb-2">
            {title}
          </h3>

          <p className="text-neutral-400 leading-relaxed mb-2 line-clamp-3">
            {description}
          </p>

          {/* Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(stack || []).map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 rounded-full bg-white/5 text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 text-sm">
            {demo_url && (
              <a href={demo_url} target="_blank" className="text-purple-400">
                Demo →
              </a>
            )}
            {repo_url && (
              <a href={repo_url} target="_blank" className="text-purple-400">
                Repo →
              </a>
            )}
          </div>
        </div>

        {/* Indicador */}
        <div className="absolute top-4 right-4 text-xs text-neutral-500 font-mono">
          {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
