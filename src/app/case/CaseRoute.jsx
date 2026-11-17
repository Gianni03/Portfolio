import { Link, useParams } from 'react-router-dom';
import CasePage from '../../seo/pages/case';
import useCases from '../../features/cases/hooks/useCases';

/**
 * Vista de caso dentro de la SPA.
 *
 * En producción la ruta se sirve como HTML estático generado en build. Esta
 * ruta existe para que la navegación interna y el entorno de desarrollo
 * funcionen igual, sin depender de un recargado completo.
 */
export default function CaseRoute() {
  const { slug } = useParams();
  const { items, loading } = useCases();

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 p-16 text-neutral-400">
        Cargando…
      </div>
    );
  }

  const item = items.find((entry) => entry.slug === slug);

  if (!item) {
    return (
      <div className="min-h-screen bg-neutral-950 px-6 py-24 text-center text-white">
        <h1 className="text-2xl font-semibold">No encontramos ese caso</h1>
        <Link
          to="/"
          className="mt-6 inline-block text-sm text-[#FF9FFC] hover:text-white"
        >
          Volver al inicio →
        </Link>
      </div>
    );
  }

  return <CasePage item={item} />;
}
