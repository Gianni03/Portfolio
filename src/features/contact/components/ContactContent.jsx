import { useState } from 'react';
import { useCopy } from '../../../i18n/context';

const FIELD_CLASS =
  'mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 transition-colors focus:border-[#7a43c1] focus:outline-none';

export default function ContactContent() {
  const copy = useCopy();
  const [status, setStatus] = useState('idle');

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');

    try {
      const data = new FormData(form);
      const body = new URLSearchParams({ 'form-name': 'contacto' });
      data.forEach((value, key) => body.append(key, String(value)));

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!response.ok) throw new Error(String(response.status));

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const sending = status === 'sending';

  return (
    <div className="mx-auto w-full max-w-lg text-left">
      <p className="text-sm text-neutral-400">{copy.contact.intro}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          name="bot-field"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div>
          <label
            htmlFor="contacto-nombre"
            className="block text-[11px] uppercase tracking-wider text-neutral-400"
          >
            {copy.contact.form.name}
          </label>
          <input
            id="contacto-nombre"
            name="nombre"
            type="text"
            required
            autoComplete="name"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label
            htmlFor="contacto-email"
            className="block text-[11px] uppercase tracking-wider text-neutral-400"
          >
            {copy.contact.form.email}
          </label>
          <input
            id="contacto-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label
            htmlFor="contacto-mensaje"
            className="block text-[11px] uppercase tracking-wider text-neutral-400"
          >
            {copy.contact.form.message}
          </label>
          <textarea
            id="contacto-mensaje"
            name="mensaje"
            required
            rows={4}
            className={FIELD_CLASS}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={sending}
            className="rounded-full bg-[#7a43c1] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#FF9FFC] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? copy.contact.form.sending : copy.contact.form.submit}
          </button>

          <button
            type="reset"
            onClick={() => setStatus('idle')}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-[#7a43c1]"
          >
            {copy.contact.form.reset}
          </button>
        </div>

        <p role="status" aria-live="polite" className="text-sm">
          {status === 'success' && (
            <span className="text-[#FF9FFC]">{copy.contact.form.success}</span>
          )}
          {status === 'error' && (
            <span className="text-red-400">{copy.contact.form.error}</span>
          )}
        </p>
      </form>

      <p className="mt-5 text-xs text-neutral-400">
        <a
          href="mailto:giannipasquinelli@gmail.com"
          className="transition-colors hover:text-white"
        >
          {copy.contact.email}
        </a>
        <span className="px-2 text-neutral-600">·</span>
        <a
          href="https://www.linkedin.com/in/gianni-pasquinelli/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-white"
        >
          {copy.contact.linkedin}
        </a>
      </p>
    </div>
  );
}
