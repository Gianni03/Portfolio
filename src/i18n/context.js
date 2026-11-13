import { createContext, useContext } from 'react';
import { es } from '../content/es';
import { en } from '../content/en';

const DICTIONARIES = { es, en };

export const LocaleContext = createContext(es);

export function useCopy() {
  return useContext(LocaleContext);
}

export function isEnglish(copy) {
  return copy.locale === 'en';
}

/** Maps a path to its counterpart in the other locale. */
export function localeSwitchPath(pathname, english) {
  if (english) {
    const rest = pathname.replace(/^\/en(?=\/|$)/, '');
    return rest || '/';
  }
  return pathname === '/' ? '/en' : `/en${pathname}`;
}

export { DICTIONARIES };
