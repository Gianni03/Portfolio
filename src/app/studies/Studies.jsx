import useStudies from '../../features/studies/hooks/useStudies';
import StudiesGrid from '../../features/studies/components/StudiesGrid';

export default function Studies() {
  const { studies } = useStudies();
  return (
    <div>
      <h1>Estudios</h1>
      <StudiesGrid studies={studies} />
    </div>
  );
}
