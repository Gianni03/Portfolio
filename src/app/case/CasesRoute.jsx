import CasesPage from '../../seo/pages/cases';
import useCaseCards from '../../features/cases/hooks/useCaseCards';

/**
 * Índice de casos dentro de la SPA.
 *
 * En producción la ruta se sirve como HTML estático generado en build. Esta
 * ruta existe para que la navegación interna y el entorno de desarrollo
 * funcionen igual, sin depender de un recargado completo.
 */
export default function CasesRoute() {
  const { items } = useCaseCards();

  return <CasesPage items={items} />;
}
