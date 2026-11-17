import { useEffect, useRef, useState } from 'react';
import useCases from '../../features/cases/hooks/useCases';
import { addCase, deleteCase, updateCase } from '../../api/cases.supabase';
import { MAX_IMAGE_BYTES, formatSize } from '../../lib/imageSize';

const EMPTY = {
  slug: '',
  title: '',
  rubro_es: '',
  rubro_en: '',
  problem_es: '',
  problem_en: '',
  built_es: '',
  built_en: '',
  result_es: '',
  result_en: '',
  link: '',
  position: '',
  visible: true,
};

const FIELD =
  'w-full rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm text-white focus:border-neutral-500 focus:outline-none';
const LABEL =
  'block text-[11px] uppercase tracking-wider text-neutral-500 mb-1';

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function CasesAdmin() {
  const { rows, loading, error, refetch } = useCases();
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);
  const fileInputRef = useRef(null);

  const list = Array.isArray(rows) ? rows : [];
  const editingRow = editingId ? list.find((row) => row.id === editingId) : null;
  const currentImage = preview ?? editingRow?.image ?? null;
  const tooHeavy = image ? image.size > MAX_IMAGE_BYTES : false;

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return undefined;
    }
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  const resetForm = () => {
    setForm(EMPTY);
    setEditingId(null);
    setImage(null);
    setFormError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startEdit = (row) => {
    setEditingId(row.id);
    setForm({
      slug: row.slug ?? '',
      title: row.title ?? '',
      rubro_es: row.rubro_es ?? '',
      rubro_en: row.rubro_en ?? '',
      problem_es: row.problem_es ?? '',
      problem_en: row.problem_en ?? '',
      built_es: row.built_es ?? '',
      built_en: row.built_en ?? '',
      result_es: row.result_es ?? '',
      result_en: row.result_en ?? '',
      link: row.link ?? '',
      position: String(row.position ?? ''),
      visible: row.visible !== false,
    });
    setImage(null);
    setFormError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFormError(null);

    const payload = {
      slug: form.slug.trim() || slugify(form.title),
      title: form.title.trim(),
      rubro_es: form.rubro_es.trim(),
      rubro_en: form.rubro_en.trim(),
      problem_es: form.problem_es.trim(),
      problem_en: form.problem_en.trim(),
      built_es: form.built_es.trim(),
      built_en: form.built_en.trim(),
      result_es: form.result_es.trim(),
      result_en: form.result_en.trim(),
      link: form.link.trim(),
      image,
      position: form.position === '' ? 0 : Number(form.position),
      visible: form.visible,
    };

    try {
      if (editingId) await updateCase(editingId, payload);
      else await addCase(payload);

      resetForm();
      refetch();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Borrar este caso?')) return;
    try {
      await deleteCase(id);
      refetch();
    } catch (err) {
      setFormError(err.message);
    }
  };

  const toggleVisible = async (row) => {
    try {
      await updateCase(row.id, { ...row, image: null, visible: row.visible === false });
      refetch();
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-xl font-light tracking-widest uppercase text-white">
          Casos
        </h3>
        <p className="mt-2 text-sm text-neutral-500">
          Se editan en los dos idiomas. El orden define la posición en la home;
          el slug define la futura URL <code>/casos/&lt;slug&gt;</code>.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
          No pudimos leer la tabla <code>cases</code>. Corré{' '}
          <code>supabase/cases.sql</code> en el SQL Editor de Supabase y volvé a
          cargar esta pantalla.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="case-title">
              Título
            </label>
            <input
              id="case-title"
              className={FIELD}
              value={form.title}
              onChange={update('title')}
              required
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="case-slug">
              Slug
            </label>
            <input
              id="case-slug"
              className={FIELD}
              value={form.slug}
              onChange={update('slug')}
              placeholder="se genera del título si lo dejás vacío"
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="case-rubro-es">
              Rubro · Español
            </label>
            <input
              id="case-rubro-es"
              className={FIELD}
              value={form.rubro_es}
              onChange={update('rubro_es')}
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="case-rubro-en">
              Rubro · English
            </label>
            <input
              id="case-rubro-en"
              className={FIELD}
              value={form.rubro_en}
              onChange={update('rubro_en')}
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="case-problem-es">
              Problema · Español
            </label>
            <textarea
              id="case-problem-es"
              className={FIELD}
              rows={2}
              value={form.problem_es}
              onChange={update('problem_es')}
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="case-problem-en">
              Problema · English
            </label>
            <textarea
              id="case-problem-en"
              className={FIELD}
              rows={2}
              value={form.problem_en}
              onChange={update('problem_en')}
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="case-built-es">
              Qué construí · Español
            </label>
            <textarea
              id="case-built-es"
              className={FIELD}
              rows={2}
              value={form.built_es}
              onChange={update('built_es')}
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="case-built-en">
              Qué construí · English
            </label>
            <textarea
              id="case-built-en"
              className={FIELD}
              rows={2}
              value={form.built_en}
              onChange={update('built_en')}
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="case-result-es">
              Resultado · Español
            </label>
            <input
              id="case-result-es"
              className={FIELD}
              value={form.result_es}
              onChange={update('result_es')}
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="case-result-en">
              Resultado · English
            </label>
            <input
              id="case-result-en"
              className={FIELD}
              value={form.result_en}
              onChange={update('result_en')}
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="case-link">
              Link al sitio
            </label>
            <input
              id="case-link"
              className={FIELD}
              value={form.link}
              onChange={update('link')}
              placeholder="https://"
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="case-position">
              Posición
            </label>
            <input
              id="case-position"
              type="number"
              className={FIELD}
              value={form.position}
              onChange={update('position')}
            />
          </div>
        </div>

        <div>
          <label className={LABEL} htmlFor="case-image">
            Imagen
          </label>
          <input
            id="case-image"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(event) => setImage(event.target.files?.[0] ?? null)}
            className="block w-full text-sm text-neutral-400 file:mr-4 file:rounded-full file:border-0 file:bg-neutral-800 file:px-4 file:py-2 file:text-sm file:text-white"
          />
          {tooHeavy && (
            <p className="mt-2 text-xs text-amber-500">
              Pesa {formatSize(image.size)}. Máximo recomendado:{' '}
              {formatSize(MAX_IMAGE_BYTES)}.
            </p>
          )}
          {currentImage && (
            <img
              src={currentImage}
              alt=""
              className="mt-3 h-32 w-auto rounded-lg border border-neutral-800 object-cover"
            />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-neutral-300">
            <input
              type="checkbox"
              checked={form.visible}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  visible: event.target.checked,
                }))
              }
            />
            Visible
          </label>

          <button
            type="submit"
            disabled={saving || tooHeavy}
            className="rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-neutral-300 disabled:opacity-50"
          >
            {saving ? 'Guardando…' : editingId ? 'Actualizar' : 'Agregar'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-neutral-400 hover:text-white"
            >
              Cancelar
            </button>
          )}
        </div>

        {formError && <p className="text-sm text-red-400">{formError}</p>}
      </form>

      <div className="border-t border-neutral-800 pt-8">
        <p className="mb-4 text-[11px] uppercase tracking-wider text-neutral-500">
          {loading ? 'Cargando…' : `${list.length} casos`}
        </p>

        <ul className="space-y-3">
          {list.map((row) => (
            <li
              key={row.id}
              className="rounded-lg border border-neutral-800 p-4 md:flex md:items-start md:justify-between md:gap-6"
            >
              <div className="flex min-w-0 gap-4">
                {row.image && (
                  <img
                    src={row.image}
                    alt=""
                    className="h-14 w-24 shrink-0 rounded object-cover"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-sm text-white">
                    <span className="mr-2 font-mono text-xs text-neutral-500">
                      {row.position}
                    </span>
                    {row.title}
                  </p>
                  <p className="mt-1 truncate font-mono text-xs text-neutral-500">
                    /{row.slug}
                  </p>
                  {row.visible === false && (
                    <p className="mt-2 text-[11px] uppercase tracking-wider text-amber-500">
                      Oculto
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 flex shrink-0 gap-3 md:mt-0">
                <button
                  type="button"
                  onClick={() => startEdit(row)}
                  className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => toggleVisible(row)}
                  className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white"
                >
                  {row.visible === false ? 'Mostrar' : 'Ocultar'}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(row.id)}
                  className="text-xs uppercase tracking-wider text-neutral-500 hover:text-red-400"
                >
                  Borrar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
