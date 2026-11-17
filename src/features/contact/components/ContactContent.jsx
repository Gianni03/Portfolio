import { useState } from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { useCopy } from '../../../i18n/context';

const WHATSAPP_NUMBER = String(
  import.meta.env.VITE_WHATSAPP_NUMBER ?? '',
).replace(/\D/g, '');

const FIELD_CLASS =
  'mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-neutral-400 transition-colors focus:border-[#FF9FFC] focus:outline-none';

const CHANNEL_CLASS =
  'inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-2 text-xs text-white transition-colors hover:border-[#7a43c1] hover:text-[#FF9FFC] sm:gap-2 sm:px-4 sm:text-sm';

/**
 * Contact content rendered over the expanded showreel, right after the
 * curved section title that lives outside the image.
 */
export default function ContactContent() {
  const copy = useCopy();
  const [status, setStatus] = useState('idle');

  const whatsappHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        copy.contact.whatsappMessage,
      )}`
    : null;

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
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
        {copy.contact.heading}
      </h2>

      <p className="mt-3 text-sm text-neutral-200">{copy.contact.intro}</p>

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
            className="block text-[11px] uppercase tracking-wider text-neutral-300"
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
            className="block text-[11px] uppercase tracking-wider text-neutral-300"
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
            className="block text-[11px] uppercase tracking-wider text-neutral-300"
          >
            {copy.contact.form.message}
          </label>
          <textarea
            id="contacto-mensaje"
            name="mensaje"
            required
            rows={3}
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
            className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-[#7a43c1]"
          >
            {copy.contact.form.reset}
          </button>
        </div>

        <p role="status" aria-live="polite" className="text-sm">
          {status === 'success' && (
            <span className="text-[#FF9FFC]">{copy.contact.form.success}</span>
          )}
          {status === 'error' && (
            <span className="text-red-300">{copy.contact.form.error}</span>
          )}
        </p>
      </form>

      <div className="mt-8 border-t border-white/15 pt-6">
        <p className="text-[11px] uppercase tracking-wider text-neutral-300">
          {copy.contact.alsoReach}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
          <a
            href="mailto:giannipasquinelli@gmail.com"
            className={CHANNEL_CLASS}
          >
            <Mail size={14} aria-hidden="true" className="sm:hidden" />
            <Mail size={16} aria-hidden="true" className="hidden sm:block" />
            {copy.contact.emailLabel}
          </a>

          <a
            href="https://www.linkedin.com/in/gianni-pasquinelli/"
            target="_blank"
            rel="noopener noreferrer"
            className={CHANNEL_CLASS}
          >
            <Linkedin size={14} aria-hidden="true" className="sm:hidden" />
            <Linkedin size={16} aria-hidden="true" className="hidden sm:block" />
            {copy.contact.linkedin}
          </a>

          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={CHANNEL_CLASS}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 fill-current"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.897a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              {copy.contact.whatsappLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
