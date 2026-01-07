import { useState } from 'react';
import useProjects from '../../features/projects/hooks/useProjects';
import {
  addProject,
  deleteProject,
  updateProject,
} from '../../api/projects.supabase';

export default function ProjectsAdmin() {
  const { projects, loading, refetch } = useProjects();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stack, setStack] = useState('');
  const [image, setImage] = useState(null);
  const [demo_url, setDemo_url] = useState('');
  const [repo_url, setRepo_url] = useState('');
  const [visibility, setVisibility] = useState('secondary');
  const [order, setOrder] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const techsArray = stack
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStack('');
    setImage(null);
    setDemo_url('');
    setRepo_url('');
    setVisibility('secondary');
    setOrder('');
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const orderValue =
      visibility === 'primary' && order !== '' ? parseInt(order, 10) : null;

    if (editingId) {
      try {
        await updateProject(editingId, {
          title,
          description,
          stack: techsArray,
          image,
          demo_url,
          repo_url,
          visibility,
          order: orderValue,
        });
        console.log('UPDATE OK');
        resetForm();
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
        visibility,
        order: orderValue,
      });
      console.log('INSERT OK', result);
      resetForm();
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

      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title"
          className="px-3 py-1 text-black"
          required
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project description"
          className="px-3 py-1 text-black"
          required
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
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="px-3 py-1 text-black"
        >
          <option value="secondary">Secondary</option>
          <option value="primary">Primary</option>
        </select>
        {visibility === 'primary' && (
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            placeholder="Order (1, 2, 3...)"
            className="px-3 py-1 text-black w-32"
            min="1"
          />
        )}
        <button className="bg-green-600 px-3 py-1 rounded" disabled={saving}>
          {saving ? 'Saving...' : editingId ? 'Update' : 'Add'}
        </button>
      </form>

      <ul className="space-y-4">
        {projects.map((p) => (
          <li
            key={p.id}
            className="bg-neutral-800 p-4 rounded flex justify-between"
          >
            <span>
              {p.title}
              <span className="ml-2 text-sm text-neutral-400">
                ({p.visibility || 'secondary'}
                {p.visibility === 'primary' && p.order != null
                  ? ` #${p.order}`
                  : ''}
                )
              </span>
            </span>

            <div className="flex gap-3">
              <button
                className="bg-blue-600 px-2 py-1 rounded"
                onClick={() => {
                  setEditingId(p.id);
                  setTitle(p.title);
                  setDescription(p.description);
                  setStack((p.stack || []).join(', '));
                  setDemo_url(p.demo_url || '');
                  setRepo_url(p.repo_url || '');
                  setVisibility(p.visibility || 'secondary');
                  setOrder(p.order != null ? String(p.order) : '');
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
