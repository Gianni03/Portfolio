import useStudies from '../hooks/useStudies';

export default function Studies() {
  const { studies, loading } = useStudies();

  if (loading) return 'Loading...';

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">Studies</h2>

      <div className="space-y-10">
        {studies.map((study) => (
          <div key={study.id} className="flex gap-6">
            
            {study.image && (
              <img
                src={study.image}
                alt={study.title}
                className="w-16 h-16 object-contain"
              />
            )}

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
