import { useState } from 'react';
import useStudies from '../../features/studies/hooks/useStudies';
import { addStudy, deleteStudy, updateStudy } from '../../api/studies.supabase';

export default function StudiesAdmin() {
  const { studies, loading, refetch } = useStudies();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [institution, setInstitution] = useState('');
  const [year, setYear] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (editingId) {
      try {
        await updateStudy(editingId, {
          title,
          description,
          image,
          institution,
          year,
        });
        console.log('UPDATE OK');
        setTitle('');
        setDescription('');
        setImage(null);
        setInstitution('');
        setYear('');
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
      const result = await addStudy({
        title,
        description,
        image,
        institution,
        year,
      });
      console.log('INSERT OK', result);

      setTitle('');
      setDescription('');
      setImage(null);
      setInstitution('');
      setYear('');
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
        <h2 className="text-2xl font-light text-white">Studies</h2>
        <button
          onClick={() => {
            setTitle('');
            setDescription('');
            setImage(null);
            setInstitution('');
            setYear('');
            setEditingId(null);
          }}
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
                placeholder="Study Title"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
                Institution
              </label>
              <input
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="Institution Name"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
                Year
              </label>
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2023 - Present"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Study description..."
                rows={4}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
                Logo / Image
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
            {saving ? 'Saving...' : editingId ? 'Update Study' : 'Add Study'}
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {studies.map((s) => (
          <div
            key={s.id}
            className="group bg-neutral-900/30 border border-neutral-800/50 p-4 rounded-xl flex items-center justify-between hover:bg-neutral-900/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-white font-medium">{s.title}</h3>
                <p className="text-xs text-neutral-500">
                  {s.institution} • {s.year}
                </p>
              </div>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditingId(s.id);
                  setTitle(s.title);
                  setDescription(s.description);
                  setImage(s.image);
                  setInstitution(s.institution);
                  setYear(s.year);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (!confirm('¿Eliminar esta experiencia?')) return;
                  deleteStudy(s.id);
                  refetch();
                }}
                className="px-3 py-1 text-xs font-medium text-red-500 hover:text-red-400 bg-red-950/20 hover:bg-red-950/40 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {studies.length === 0 && (
          <div className="text-center py-12 text-neutral-600 text-sm">
            No studies found.
          </div>
        )}
      </div>
    </div>
  );
}
