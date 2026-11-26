import useCases from './useCases';
import useProjects from '../../projects/hooks/useProjects';

const normalize = (url) =>
  String(url ?? '').trim().replace(/\/+$/, '').toLowerCase();

/**
 * Casos listos para mostrar en cards.
 *
 * Un caso y un proyecto pueden contar la misma pieza para audiencias
 * distintas. Si el caso todavía no tiene imagen propia, se usa la del
 * proyecto que apunta al mismo sitio, igual que en el carrusel de la home.
 */
export default function useCaseCards() {
  const { items, ...cases } = useCases();
  const { projects } = useProjects();

  const imageByUrl = new Map(
    (Array.isArray(projects) ? projects : [])
      .filter((project) => project.demo_url && project.image)
      .map((project) => [normalize(project.demo_url), project.image]),
  );

  return {
    ...cases,
    items: (items ?? []).map((item) => ({
      ...item,
      image: item.image || imageByUrl.get(normalize(item.link)),
    })),
  };
}
