import { useEffect, useRef, useState } from 'react';
import useLogos from '../../features/logos/hooks/useLogos';
import { addLogo, deleteLogo, updateLogo } from '../../api/logos.supabase';

const EMPTY = {
  name: '',
  imagePath: '',
  href: '',
  position: '',
  visible: true,
};

const FIELD =
  'w-full rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm text-white focus:border-neutral-500 focus:outline-none';
const LABEL =
  'block text-[11px] uppercase tracking-wider text-neutral-500 mb-1';

export default function LogosAdmin() {
  const { rows, loading, error, refetch } = useLogos();
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);
  const fileInputRef = useRef(null);

  const list = Array.isArray(rows) ? rows : [];
  const editingRow = editingId ? list.find((row) => row.id === editingId) : null;
  const currentImage = preview ?? form.imagePath ?? editingRow?.image ?? null;

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
      name: row.name ?? '',
      imagePath: row.image ?? '',
      href: row.href ?? '',
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
      name: form.name.trim(),
      image,
      imagePath: form.imagePath.trim(),
      href: form.href.trim(),
      position: form.position === '' ? 0 : Number(form.position),
      visible: form.visible,
    };

    try {
      if (editingId) await updateLogo(editingId, payload);
      else await addLogo(payload);

      resetForm();
      refetch();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Borrar este logo?')) return;
    try {
      await deleteLogo(id);
      refetch();
    } catch (err) {
      setFormError(err.message);
    }
  };

  const toggleVisible = async (row) => {
    try {
      await updateLogo(row.id, {
        name: row.name,
        image: null,
        imagePath: null,
        href: row.href,
        position: row.position,
        visible: row.visible === false,
      });
      refetch();
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-xl font-light tracking-widest uppercase text-white">
          Logos
        </h3>
        <p className="mt-2 text-sm text-neutral-500">
          Se muestran en la franja de empresas que confiaron. Podés subir un
          archivo o indicar una ruta de <code>public/img/logos</code>.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
          No pudimos leer la tabla <code>logos</code>. Corré{' '}
          <code>supabase/logos.sql</code> en el SQL Editor de Supabase y volvé a
          cargar esta pantalla.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="logo-name">
              Nombre
            </label>
            <input
              id="logo-name"
              className={FIELD}
              value={form.name}
              onChange={update('name')}
              required
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="logo-image-path">
              Ruta o URL de la imagen
            </label>
            <input
              id="logo-image-path"
              className={FIELD}
              value={form.imagePath}
              onChange={update('imagePath')}
              placeholder="/img/logos/archivo.png"
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="logo-href">
              Link a la vista del proyecto
            </label>
            <input
              id="logo-href"
              className={FIELD}
              value={form.href}
              onChange={update('href')}
              placeholder="/casos/el-rey-del-chaja"
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="logo-position">
              Posición
            </label>
            <input
              id="logo-position"
              type="number"
              className={FIELD}
              value={form.position}
              onChange={update('position')}
            />
          </div>
        </div>

        <div>
          <label className={LABEL} htmlFor="logo-image">
            O subí un archivo
          </label>
          <input
            id="logo-image"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(event) => setImage(event.target.files?.[0] ?? null)}
            className="block w-full text-sm text-neutral-400 file:mr-4 file:rounded-full file:border-0 file:bg-neutral-800 file:px-4 file:py-2 file:text-sm file:text-white"
          />
          {currentImage && (
            <div className="mt-3 rounded-lg border border-neutral-800 bg-neutral-900 p-4">
              <img src={currentImage} alt="" className="h-12 w-auto object-contain" />
            </div>
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
            disabled={saving}
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
          {loading ? 'Cargando…' : `${list.length} logos`}
        </p>

        <ul className="space-y-3">
          {list.map((row) => (
            <li
              key={row.id}
              className="rounded-lg border border-neutral-800 p-4 md:flex md:items-center md:justify-between md:gap-6"
            >
              <div className="flex min-w-0 items-center gap-4">
                <img
                  src={row.image}
                  alt=""
                  className="h-10 w-20 shrink-0 rounded border border-neutral-800 bg-neutral-900 object-contain p-1"
                />
                <div className="min-w-0">
                  <p className="text-sm text-white">
                    <span className="mr-2 font-mono text-xs text-neutral-500">
                      {row.position}
                    </span>
                    {row.name}
                  </p>
                  {row.visible === false && (
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-amber-500">
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
