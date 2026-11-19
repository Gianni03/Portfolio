import { Link, useParams } from 'react-router-dom';
import ServicePage from '../../seo/components/ServicePage';
import { data as desarrolloWeb } from '../../seo/pages/servicio-desarrollo-web.data';
import { data as sistemas } from '../../seo/pages/servicio-sistemas.data';

const SERVICES = {
  'desarrollo-web': desarrolloWeb,
  'sistemas-a-medida': sistemas,
};

/**
 * Vista de servicio dentro de la SPA.
 *
 * En producción la ruta se sirve como HTML estático generado en build. Esta
 * ruta existe para que la navegación interna y el entorno de desarrollo
 * funcionen, igual que con las páginas de caso.
 */
export default function ServiceRoute() {
  const { slug } = useParams();
  const data = SERVICES[slug];

  if (!data) {
    return (
      <div className="min-h-screen bg-neutral-950 px-6 py-24 text-center text-white">
        <h1 className="text-2xl font-semibold">No encontramos ese servicio</h1>
        <Link
          to="/"
          className="mt-6 inline-block text-sm text-[#FF9FFC] hover:text-white"
        >
          Volver al inicio →
        </Link>
      </div>
    );
  }

  return <ServicePage data={data} />;
}
