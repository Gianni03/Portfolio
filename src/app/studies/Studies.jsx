import useStudies from '../../features/studies/hooks/useStudies';
import StudiesGrid from '../../features/studies/components/StudiesGrid';
import { useCopy } from '../../i18n/context';

export default function Studies() {
  const { studies, loading } = useStudies();
  const copy = useCopy();

  if (loading) return <p className="opacity-50">{copy.studies.loading}</p>;
  if (!Array.isArray(studies)) return <p>{copy.studies.error}</p>;

  return <StudiesGrid studies={studies} />;
}
