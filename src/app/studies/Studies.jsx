import useStudies from '../../features/studies/hooks/useStudies';
import StudiesGrid from '../../features/studies/components/StudiesGrid';

export default function Studies() {
  const { studies, loading } = useStudies();

  if (loading) return <p className="opacity-50">Loading Studies...</p>;
  if (!Array.isArray(studies)) return <p>Error loading Studies</p>;

  return <StudiesGrid studies={studies} />;
}
