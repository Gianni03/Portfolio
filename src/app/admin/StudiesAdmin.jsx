import { useEffect, useRef, useState } from 'react';
import useStudies from '../../features/studies/hooks/useStudies';
import { addStudy, deleteStudy, updateStudy } from '../../api/studies.supabase';
import { MAX_IMAGE_BYTES, formatSize } from '../../lib/imageSize';

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
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const currentStudy = editingId
    ? studies?.find((s) => s.id === editingId)
    : null;
  const currentImage = currentStudy?.image ?? null;
  const tooHeavy = image ? image.size > MAX_IMAGE_BYTES : false;

  useEffect(() => {
    if (!image) {
      setImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(image);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImage(null);
    setInstitution('');
    setYear('');
    setEditingId(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
      const result = await addStudy({
        title,
        description,
        image,
        institution,
        year,
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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-light text-white">Studies</h2>
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
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 transition-all"
              />

              {image ? (
                <div className="mt-3 rounded-lg border border-neutral-800 bg-neutral-950 p-3">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-xs text-neutral-400 truncate">
                      {image.name}
                    </span>
                    <span
                      className={`text-xs font-mono shrink-0 ${
                        tooHeavy ? 'text-amber-400' : 'text-neutral-500'
                      }`}
                    >
                      {formatSize(image.size)}
                    </span>
                  </div>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="New image preview"
                      className="w-full h-32 object-contain rounded bg-neutral-900"
                    />
                  )}
                  {tooHeavy && (
                    <p className="mt-2 text-xs text-amber-400">
                      Over {formatSize(MAX_IMAGE_BYTES)}. Compress it before
                      saving — every visitor downloads this file.
                    </p>
                  )}
                </div>
              ) : currentImage ? (
                <div className="mt-3 rounded-lg border border-neutral-800 bg-neutral-950 p-3">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-xs uppercase tracking-wider text-neutral-600">
                      Current image
                    </span>
                    <a
                      href={`${currentImage}?download`}
                      className="text-xs text-neutral-400 hover:text-white underline"
                    >
                      Download
                    </a>
                  </div>
                  <img
                    src={currentImage}
                    alt="Current image"
                    className="w-full h-32 object-contain rounded bg-neutral-900"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-400 bg-red-950/20 border border-red-900/30 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

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
                  setDescription(s.description ?? '');
                  setImage(null);
                  setInstitution(s.institution);
                  setYear(s.year ?? '');
                  setError(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
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
