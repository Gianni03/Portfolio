import { getStudies } from "../../../api/studies.supabase";
import { useEffect, useState, useCallback} from 'react'


export default function useProjects() {
  const [studies, setStudies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchStudies = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getStudies();
      setStudies(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudies();
  }, [fetchStudies])

  return {studies, loading, error, refetch: fetchStudies };
}

