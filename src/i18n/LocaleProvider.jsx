import { LocaleContext, DICTIONARIES } from './context';
import { es } from '../content/es';

export default function LocaleProvider({ locale = 'es', children }) {
  return (
    <LocaleContext.Provider value={DICTIONARIES[locale] ?? es}>
      {children}
    </LocaleContext.Provider>
  );
}
