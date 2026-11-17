import { useCallback, useEffect, useState } from 'react';
import { getCases } from '../../../api/cases.supabase';
import { useCopy } from '../../../i18n/context';

/**
 * Reads the cases from Supabase and falls back to the copy dictionary when the
 * table is empty, missing or unreachable.
 */
export default function useCases() {
  const copy = useCopy();
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCases = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCases();
      setRows(data);
      setError(null);
    } catch (err) {
      setError(err);
      setRows(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const english = copy.locale === 'en';
  const fromDatabase = Array.isArray(rows) && rows.length > 0;

  const items = fromDatabase
    ? rows
        .filter((row) => row.visible !== false)
        .map((row) => ({
          slug: row.slug,
          rubro: english ? row.rubro_en : row.rubro_es,
          title: row.title,
          problem: english ? row.problem_en : row.problem_es,
          built: english ? row.built_en : row.built_es,
          result: english ? row.result_en : row.result_es,
          link: row.link,
          image: row.image,
        }))
    : copy.cases.items;

  return {
    items,
    rows,
    loading,
    error,
    refetch: fetchCases,
    usingFallback: !fromDatabase,
  };
}
