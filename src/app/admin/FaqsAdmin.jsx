import { useState } from 'react';
import useFaqs from '../../features/faq/hooks/useFaqs';
import { addFaq, deleteFaq, updateFaq } from '../../api/faqs.supabase';

const EMPTY = {
  question_es: '',
  question_en: '',
  answer_es: '',
  answer_en: '',
  position: '',
  visible: true,
};

const FIELD =
  'w-full rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm text-white focus:border-neutral-500 focus:outline-none';
const LABEL =
  'block text-[11px] uppercase tracking-wider text-neutral-500 mb-1';

export default function FaqsAdmin() {
  const { rows, loading, error, refetch } = useFaqs();
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const list = Array.isArray(rows) ? rows : [];

  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  const resetForm = () => {
    setForm(EMPTY);
    setEditingId(null);
    setFormError(null);
  };

  const startEdit = (row) => {
    setEditingId(row.id);
    setForm({
      question_es: row.question_es ?? '',
      question_en: row.question_en ?? '',
      answer_es: row.answer_es ?? '',
      answer_en: row.answer_en ?? '',
      position: String(row.position ?? ''),
      visible: row.visible !== false,
    });
    setFormError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFormError(null);

    const payload = {
      question_es: form.question_es.trim(),
      question_en: form.question_en.trim(),
      answer_es: form.answer_es.trim(),
      answer_en: form.answer_en.trim(),
      position: form.position === '' ? 0 : Number(form.position),
      visible: form.visible,
    };

    try {
      if (editingId) await updateFaq(editingId, payload);
      else await addFaq(payload);

      resetForm();
      refetch();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Borrar esta pregunta?')) return;
    try {
      await deleteFaq(id);
      refetch();
    } catch (err) {
      setFormError(err.message);
    }
  };

  const toggleVisible = async (row) => {
    try {
      await updateFaq(row.id, {
        question_es: row.question_es,
        question_en: row.question_en,
        answer_es: row.answer_es,
        answer_en: row.answer_en,
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
          Preguntas frecuentes
        </h3>
        <p className="mt-2 text-sm text-neutral-500">
          Se editan en los dos idiomas. La home las muestra en orden de
          posición y solo si están visibles.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
          No pudimos leer la tabla <code>faqs</code>. Corré{' '}
          <code>supabase/faqs.sql</code> en el SQL Editor de Supabase y volvé a
          cargar esta pantalla.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="faq-question-es">
              Pregunta · Español
            </label>
            <input
              id="faq-question-es"
              className={FIELD}
              value={form.question_es}
              onChange={update('question_es')}
              required
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="faq-question-en">
              Pregunta · English
            </label>
            <input
              id="faq-question-en"
              className={FIELD}
              value={form.question_en}
              onChange={update('question_en')}
              required
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="faq-answer-es">
              Respuesta · Español
            </label>
            <textarea
              id="faq-answer-es"
              className={FIELD}
              rows={3}
              value={form.answer_es}
              onChange={update('answer_es')}
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="faq-answer-en">
              Respuesta · English
            </label>
            <textarea
              id="faq-answer-en"
              className={FIELD}
              rows={3}
              value={form.answer_en}
              onChange={update('answer_en')}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-6">
          <div className="w-32">
            <label className={LABEL} htmlFor="faq-position">
              Posición
            </label>
            <input
              id="faq-position"
              type="number"
              className={FIELD}
              value={form.position}
              onChange={update('position')}
            />
          </div>

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
          {loading ? 'Cargando…' : `${list.length} preguntas`}
        </p>

        <ul className="space-y-3">
          {list.map((row) => (
            <li
              key={row.id}
              className="rounded-lg border border-neutral-800 p-4 md:flex md:items-start md:justify-between md:gap-6"
            >
              <div className="min-w-0">
                <p className="text-sm text-white">
                  <span className="mr-2 font-mono text-xs text-neutral-500">
                    {row.position}
                  </span>
                  {row.question_es}
                </p>
                <p className="mt-1 truncate text-xs text-neutral-500">
                  {row.question_en}
                </p>
                {row.visible === false && (
                  <p className="mt-2 text-[11px] uppercase tracking-wider text-amber-500">
                    Oculta
                  </p>
                )}
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
