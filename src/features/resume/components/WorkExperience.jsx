import useWorkExperience from '../hooks/useWorkExperience';

export default function WorkExperience() {
  const { items, loading } = useWorkExperience();

  if (loading) return 'Loading...';

  return (
    <section className="space-y-10">
      <h2 className="text-3xl font-bold mb-8">Work Experience</h2>

      <div className="space-y-10">
        {items.map((item) => (
          <div key={item.id} className="space-y-3">
            <h3 className="text-xl font-semibold">{item.position}</h3>

            <p className="text-neutral-400 text-sm">
              {item.company} · {item.start_date} –{' '}
              {item.is_current ? 'Present' : item.end_date}
            </p>

            <ul className="list-disc list-inside mt-3 space-y-1 text-neutral-300">
              {(item.description || []).map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
