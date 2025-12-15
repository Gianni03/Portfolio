import useStudies from '../../features/studies/hooks/useStudies';

export default function StudiesAdmin() {
  const { studies, loading } = useStudies();

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Studies</h2>

      <button className="bg-green-600 px-3 py-1 rounded mb-6">+ Add</button>

      <ul className="space-y-4">
        {studies.map((s) => (
          <li
            key={s.id}
            className="bg-neutral-800 p-4 rounded flex justify-between"
          >
            <span>{s.title}</span>

            <div className="flex gap-3">
              <button className="bg-blue-600 px-2 py-1 rounded">Edit</button>
              <button className="bg-red-600 px-2 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
