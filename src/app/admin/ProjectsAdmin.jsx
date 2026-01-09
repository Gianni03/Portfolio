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
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-light text-white">Projects</h2>
        <button
          onClick={resetForm}
          className="text-xs uppercase tracking-wider text-neutral-500 hover:text-white transition-colors"
        >
          Reset Form
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-12 bg-neutral-900/30 p-6 rounded-xl border border-neutral-800/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Project Title"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
                Stack (comma separated)
              </label>
              <input
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                placeholder="React, Node.js, Tailwind..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
                Visibility
              </label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all appearance-none"
              >
                <option value="secondary">Secondary (Grid)</option>
                <option value="primary">Primary (Featured)</option>
              </select>
            </div>

            {visibility === 'primary' && (
              <div>
                <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
                  Order Priority
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="1"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
                  min="1"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Project description..."
                rows={4}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
                  Demo URL
                </label>
                <input
                  value={demo_url}
                  onChange={(e) => setDemo_url(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
                  Repo URL
                </label>
                <input
                  value={repo_url}
                  onChange={(e) => setRepo_url(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
                Cover Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-neutral-800">
          <button
            className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-50"
            disabled={saving}
          >
            {saving
              ? 'Saving...'
              : editingId
              ? 'Update Project'
              : 'Add Project'}
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="group bg-neutral-900/30 border border-neutral-800/50 p-4 rounded-xl flex items-center justify-between hover:bg-neutral-900/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-2 h-2 rounded-full ${
                  p.visibility === 'primary' ? 'bg-amber-400' : 'bg-neutral-600'
                }`}
              ></div>
              <div>
                <h3 className="text-white font-medium">{p.title}</h3>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-1 max-w-md">
                  {p.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-600 border border-neutral-800 px-1.5 py-0.5 rounded">
                    {p.visibility}
                  </span>
                  {p.visibility === 'primary' && p.order != null && (
                    <span className="text-[10px] uppercase tracking-wider text-amber-500/80 border border-amber-900/30 px-1.5 py-0.5 rounded">
                      #{p.order}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="px-3 py-1 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                onClick={() => {
                  setEditingId(p.id);
                  setTitle(p.title);
                  setDescription(p.description);
                  setStack((p.stack || []).join(', '));
                  setDemo_url(p.demo_url || '');
                  setRepo_url(p.repo_url || '');
                  setVisibility(p.visibility || 'secondary');
                  setOrder(p.order != null ? String(p.order) : '');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Edit
              </button>

              <button
                className="px-3 py-1 text-xs font-medium text-red-500 hover:text-red-400 bg-red-950/20 hover:bg-red-950/40 rounded-lg transition-colors"
                onClick={async () => {
                  if (!confirm('Are you sure you want to delete this project?'))
                    return;
                  await deleteProject(p.id);
                  refetch();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-12 text-neutral-600 text-sm">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
}
