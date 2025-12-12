import useStudies from '../../features/studies/hooks/useStudies';
import StudiesGrid from '../../features/studies/components/StudiesGrid';

export default function Studies() {
  const { studies } = useStudies();
  return <StudiesGrid studies={studies} />;
}
