import useCases from '../hooks/useCases';
import useProjects from '../../projects/hooks/useProjects';
import CaseCard from './CaseCard';
import Carousel from '../../../ui/Carousel';
import { useCopy } from '../../../i18n/context';

const normalize = (url) =>
  String(url ?? '').trim().replace(/\/+$/, '').toLowerCase();

/**
 * Carrusel de casos para la home: el material que le habla a un cliente.
 * Los proyectos viven aparte, en /projects, y son otra audiencia.
 */
export default function CasesCarousel() {
  const copy = useCopy();
  const { items } = useCases();
  const { projects } = useProjects();

  const imageByUrl = new Map(
    (Array.isArray(projects) ? projects : [])
      .filter((project) => project.demo_url && project.image)
      .map((project) => [normalize(project.demo_url), project.image]),
  );

  const items2 = (items ?? []).map((item) => ({
    ...item,
    image: item.image || imageByUrl.get(normalize(item.link)),
  }));

  return (
    <Carousel
      items={items2}
      renderItem={(item) => <CaseCard item={item} />}
      previousLabel={copy.cases.previous}
      nextLabel={copy.cases.next}
      dotLabel={copy.cases.gotoCases}
    />
  );
}
