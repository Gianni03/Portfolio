import { useEffect, useState } from 'react';
import { getStudies } from '../../../api/studies.supabase';

export default function useStudies() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudies = async () => {
    setLoading(true);
    try {
      const data = await getStudies();
      setStudies(data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  return { studies, loading };
}
