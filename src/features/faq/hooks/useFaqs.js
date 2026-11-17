import { useCallback, useEffect, useState } from 'react';
import { getFaqs } from '../../../api/faqs.supabase';
import { useCopy } from '../../../i18n/context';

/**
 * Reads the FAQs from Supabase and falls back to the copy dictionary when the
 * table is empty, missing or unreachable. The home must never render without
 * content just because the database did not answer.
 */
export default function useFaqs() {
  const copy = useCopy();
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFaqs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFaqs();
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
    fetchFaqs();
  }, [fetchFaqs]);

  const english = copy.locale === 'en';
  const fromDatabase = Array.isArray(rows) && rows.length > 0;

  const items = fromDatabase
    ? rows
        .filter((row) => row.visible !== false)
        .map((row) => ({
          question: english ? row.question_en : row.question_es,
          answer: english ? row.answer_en : row.answer_es,
        }))
    : copy.faq.items;

  return {
    items,
    rows,
    loading,
    error,
    refetch: fetchFaqs,
    usingFallback: !fromDatabase,
  };
}
