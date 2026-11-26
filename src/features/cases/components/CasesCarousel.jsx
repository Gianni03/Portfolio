import useCaseCards from '../hooks/useCaseCards';
import CaseCard from './CaseCard';
import Carousel from '../../../ui/Carousel';
import { useCopy } from '../../../i18n/context';

/**
 * Carrusel de casos para la home: el material que le habla a un cliente.
 * Los proyectos viven aparte, en /projects, y son otra audiencia.
 */
export default function CasesCarousel() {
  const copy = useCopy();
  const { items } = useCaseCards();

  return (
    <Carousel
      items={items}
      renderItem={(item) => <CaseCard item={item} />}
      previousLabel={copy.cases.previous}
      nextLabel={copy.cases.next}
      dotLabel={copy.cases.gotoCases}
    />
  );
}
