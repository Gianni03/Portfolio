import { useEffect } from 'react';
import { LocaleContext, DICTIONARIES } from './context';
import { es } from '../content/es';

export default function LocaleProvider({ locale = 'es', children }) {
  const value = DICTIONARIES[locale] ?? es;

  // Keep the document language in sync with the active locale, so /en does
  // not get announced or indexed as Spanish.
  useEffect(() => {
    document.documentElement.lang = value.locale;
  }, [value]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
