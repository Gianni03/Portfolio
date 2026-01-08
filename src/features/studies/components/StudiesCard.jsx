// features/studies/components/StudiesCard.jsx
export default function StudiesCard({ study, index = 0, total = 1 }) {
  const { title, description, image, institution, year } = study;

  return (
    <div className="relative bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Imagen */}
        <div className="relative h-48 lg:h-64 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-contain aspect-auto" />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-transparent to-transparent lg:bg-linear-to-r" />
        </div>

        {/* Contenido */}
        <div className="p-6 lg:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            {institution && (
              <span className="text-purple-400 text-sm font-medium">
                {institution}
              </span>
            )}
            {year && <span className="text-neutral-500 text-sm">• {year}</span>}
          </div>

          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight">
            {title}
          </h3>

          <p className="text-neutral-400 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </div>

      {/* Indicador de posición */}
      <div className="absolute top-4 right-4 text-xs text-neutral-600 font-mono">
        {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
      </div>
    </div>
  );
}
