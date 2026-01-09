import useStudies from '../hooks/useStudies';

export default function Studies() {
  const { studies, loading } = useStudies();

  if (loading) return 'Loading...';

  return (
    <section className="space-y-10">
      <h2 className="text-3xl font-bold mb-8">Studies</h2>

      <div className="space-y-10">
        {studies.map((study) => (
          <div key={study.id} className="flex gap-6 items-start flex-col sm:flex-row">
            
            <div className="w-24 h-24 flex items-center justify-center shrink-0">
            {study.image && (
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-full object-contain"
              />
            )}
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                {study.title}
              </h3>

              <p className="text-neutral-400">
                {study.institution}
                {study.year && ` · ${study.year}`}
              </p>

              {study.description && (
                <p className="mt-2 text-neutral-300">
                  {study.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
