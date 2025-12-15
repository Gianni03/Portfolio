import { useState } from 'react';
import useProjects from '../../features/projects/hooks/useProjects';
import { addProject } from '../../api/project';

export default function ProjectsAdmin() {
  const { projects, loading } = useProjects();
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject({ title }).then(() => {
      setTitle('');
      window.location.reload();
    });
  }

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Projects</h2>

     <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Project title"
          className="px-3 py-1 text-black"
        />
        <button className="bg-green-600 px-3 py-1 rounded">Add</button>
      </form>

      <ul className="space-y-4">
        {projects.map((p) => (
          <li
            key={p.id}
            className="bg-neutral-800 p-4 rounded flex justify-between"
          >
            <span>{p.title}</span>

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
