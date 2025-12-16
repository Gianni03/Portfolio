import { useState } from 'react';
import useProjects from '../../features/projects/hooks/useProjects';
import { addProject, deleteProject, updateProject } from '../../api/projects.supabase';

export default function ProjectsAdmin() {
  const { projects, loading, refetch } = useProjects();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stack, setStack] = useState('');
  const [image, setImage] = useState(null);
  const [demo_url, setDemo_url] = useState('');
  const [repo_url, setRepo_url] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);


  const techsArray = stack
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (editingId) {
      try {
        await updateProject(editingId, {
          title,
          description,
          stack: techsArray,
          image,
          demo_url,
          repo_url,
        });
        console.log('UPDATE OK');
        setTitle('');
        setDescription('');
        setStack('');
        setImage(null);
        setDemo_url('');
        setRepo_url('');
        setEditingId(null);
        refetch();
      } catch (error) {
        console.log('UPDATE ERROR', error);
        setError(error.message);
      } finally {
        setSaving(false);
      }
      return;
    }
    try {
      const result = await addProject({
        title,
        description,
        stack: techsArray,
        image,
        demo_url,
        repo_url,
      });
      console.log('INSERT OK', result);

      setTitle('');
      setDescription('');
      setStack('');
      setImage(null);
      setDemo_url('');
      setRepo_url('');
      refetch();
    } catch (error) {
      console.log('INSERT ERROR', error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Projects</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title"
          className="px-3 py-1 text-black"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project description"
          className="px-3 py-1 text-black"
        />
        <input
          value={stack}
          onChange={(e) => setStack(e.target.value)}
          placeholder="Project stack"
          className="px-3 py-1 text-black"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          placeholder="Project image"
          className="px-3 py-1 text-black"
        />
        <input
          value={demo_url}
          onChange={(e) => setDemo_url(e.target.value)}
          placeholder="Project demo_url"
          className="px-3 py-1 text-black"
        />
        <input
          value={repo_url}
          onChange={(e) => setRepo_url(e.target.value)}
          placeholder="Project repo_url"
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
              <button
                className="bg-blue-600 px-2 py-1 rounded"
                onClick={() => {
                  setEditingId(p.id);
                  setTitle(p.title);
                  setDescription(p.description);
                  setStack((p.techs || []).join(', '));
                  setDemo_url(p.demo_url || '');
                  setRepo_url(p.repo_url || '');
                }}
              >
                Edit
              </button>

              <button
                className="bg-red-600 px-2 py-1 rounded"
                onClick={async () => {
                  if (!confirm('¿Eliminar este proyecto?')) return;
                  await deleteProject(p.id);
                  refetch();
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
