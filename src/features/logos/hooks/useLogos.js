import { useCallback, useEffect, useState } from 'react';
import { getLogos } from '../../../api/logos.supabase';

/**
 * Logos de empresas. Si la tabla no existe, está vacía o falla, se usa esta
 * lista mínima para que la franja siga existiendo.
 */
const FALLBACK = [
  { name: 'El Rey del Chajá', image: '/img/logos/chaja.png', href: 'https://www.elreydelchaja.com/' },
  { name: 'Plataforma 1810', image: '/img/logos/1810.png', href: 'https://www.plataforma1810.com.ar/' },
  { name: 'Kli', image: '/img/logos/kli.png', href: 'https://kli.com.ar/' },
  { name: 'Holocruxe', image: '/img/logos/holocruxe.png', href: 'https://www.holocruxe.com/' },
  { name: 'Vibado', image: '/img/logos/vibado.webp', href: null },
];

export default function useLogos() {
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getLogos();
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
    fetchLogos();
  }, [fetchLogos]);

  const fromDatabase = Array.isArray(rows) && rows.length > 0;

  const items = fromDatabase
    ? rows.filter((row) => row.visible !== false)
    : FALLBACK;

  return {
    items,
    rows,
    loading,
    error,
    refetch: fetchLogos,
    usingFallback: !fromDatabase,
  };
}
