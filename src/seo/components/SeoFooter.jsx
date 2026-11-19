/**
 * Footer de las páginas estáticas (servicios, guías, casos y landing local).
 *
 * Incluye el teléfono como texto visible a propósito: Google cruza nombre,
 * zona y teléfono entre el sitio y el Business Profile (consistencia NAP).
 */
export default function SeoFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-3xl px-6 py-8 text-xs text-neutral-500">
        <p>Gianni Pasquinelli · Desarrollo web a medida · Rosario, Argentina</p>
        <a
          href="tel:+5493413704638"
          className="mt-1 inline-block transition-colors hover:text-white"
        >
          +54 9 341 370 4638
        </a>
      </div>
    </footer>
  );
}
