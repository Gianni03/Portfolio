import { useCopy } from '../../../i18n/context';

export default function ClosingSection() {
  const copy = useCopy();

  return (
    <section className="border-y border-white/10 px-6 py-20 text-center">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
          {copy.closing.title}
        </h2>

        <p className="mt-6 text-base leading-relaxed text-neutral-300">
          {copy.closing.body}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-neutral-500">
          {copy.closing.footer}
        </p>
      </div>
    </section>
  );
}
