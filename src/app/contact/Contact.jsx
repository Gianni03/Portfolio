import { useState } from 'react';
import Section from '../../ui/Section';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';
import GradientText from '@/components/GradientText';
import { useCopy } from '../../i18n/context';

// Digits only. Set VITE_WHATSAPP_NUMBER in .env to enable the WhatsApp CTA.
const WHATSAPP_NUMBER = String(
  import.meta.env.VITE_WHATSAPP_NUMBER ?? '',
).replace(/\D/g, '');

const LINK_CLASS =
  'group flex items-center gap-3 rounded-xl border border-white/10 px-6 py-4 text-white transition-all duration-300 ease-out hover:border-[#7a43c1]/50 hover:bg-linear-to-r hover:from-[#7a43c1]/10 hover:to-transparent hover:shadow-[0_0_30px_-10px_#7a43c1]';

const FIELD_CLASS =
  'mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 transition-colors focus:border-[#7a43c1] focus:outline-none';

export default function Contact() {
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
    <Section title="Contact Me" id="contact">
      <div>
        <CurvedSectionTitle
          text={copy.contact.title}
          curve={60}
          className="fill-[#fbfffe] transition-colors duration-1000 hover:fill-[#7A43C1]"
          direction="right"
        />
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-left">
        <GradientText
          colors={['#7a43c1', '#FF9FFC', '#fbfffe']}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-10"
        >
          {copy.contact.heading}
        </GradientText>

        <p className="mt-6 text-sm text-[#fbfffe]">{copy.contact.intro}</p>

        <div className="mt-10 space-y-4 text-base">
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CLASS}
            >
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                → {copy.contact.whatsapp}
              </span>
            </a>
          )}

          <a href="mailto:giannipasquinelli@gmail.com" className={LINK_CLASS}>
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
              → {copy.contact.email}
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/gianni-pasquinelli/"
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
              → {copy.contact.linkedin}
            </span>
          </a>
        </div>

        <div className="mt-12 border-t border-white/10 pt-10">
          <p className="text-xs uppercase tracking-wider text-[#fbfffe]/50">
            {copy.contact.divider}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
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
                className="block text-xs uppercase tracking-wider text-[#fbfffe]/60"
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
                className="block text-xs uppercase tracking-wider text-[#fbfffe]/60"
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
                className="block text-xs uppercase tracking-wider text-[#fbfffe]/60"
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

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={sending}
                className="rounded-full bg-[#7a43c1] px-6 py-3 text-sm font-medium text-[#fbfffe] transition-colors hover:bg-[#FF9FFC] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? copy.contact.form.sending : copy.contact.form.submit}
              </button>

              <button
                type="reset"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-[#fbfffe] transition-colors hover:border-[#7a43c1]"
                onClick={() => setStatus('idle')}
              >
                {copy.contact.form.reset}
              </button>
            </div>

            <p
              role="status"
              aria-live="polite"
              className={`text-sm ${
                status === 'success' ? 'text-[#FF9FFC]' : 'text-transparent'
              }`}
            >
              {status === 'success' ? copy.contact.form.success : '·'}
            </p>

            {status === 'error' && (
              <p role="alert" className="text-sm text-red-400">
                {copy.contact.form.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </Section>
  );
}
