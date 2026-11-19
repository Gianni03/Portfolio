import { Link, useParams } from 'react-router-dom';
import GuidePage from '../../seo/components/GuidePage';
import { data as costo } from '../../seo/pages/guia-costo.data';
import { data as plantilla } from '../../seo/pages/guia-plantilla.data';
import { data as actualizar } from '../../seo/pages/guia-actualizar.data';
import { data as contenido } from '../../seo/pages/guia-contenido-propio.data';

const GUIDES = {
  'cuanto-cuesta-una-pagina-web': costo,
  'web-a-medida-o-plantilla': plantilla,
  'actualizar-mi-web-sin-programador': actualizar,
  'tu-contenido-es-tuyo': contenido,
};

/**
 * Vista de guía dentro de la SPA, por la misma razón que las de servicio:
 * en producción se sirve como HTML estático, y en desarrollo hace falta una
 * ruta para no ver la página en blanco.
 */
export default function GuideRoute() {
  const { slug } = useParams();
  const data = GUIDES[slug];

  if (!data) {
    return (
      <div className="min-h-screen bg-neutral-950 px-6 py-24 text-center text-white">
        <h1 className="text-2xl font-semibold">No encontramos esa guía</h1>
        <Link
          to="/"
          className="mt-6 inline-block text-sm text-[#FF9FFC] hover:text-white"
        >
          Volver al inicio →
        </Link>
      </div>
    );
  }

  return <GuidePage data={data} />;
}
