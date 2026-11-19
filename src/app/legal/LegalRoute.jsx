import { useLocation } from 'react-router-dom';
import LegalPage from '../../seo/components/LegalPage';
import { data as terminos } from '../../seo/pages/terminos.data';
import { data as privacidad } from '../../seo/pages/privacidad.data';

const PAGES = {
  '/terminos': terminos,
  '/privacidad': privacidad,
};

/**
 * Vista de las páginas legales dentro de la SPA. En producción se sirven como
 * HTML estático; la ruta existe para la navegación interna y el desarrollo.
 */
export default function LegalRoute() {
  const { pathname } = useLocation();
  const data = PAGES[pathname.replace(/\/+$/, '') || '/'];

  return <LegalPage data={data} />;
}
