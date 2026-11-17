import LocaleProvider from '../i18n/LocaleProvider';
import Home from './Home';

/**
 * The original portfolio, preserved at /portfolio.
 *
 * It predates the language split, so it is pinned to English and keeps its
 * own copy untouched. The shared components it uses read their labels from
 * the locale provider, which is why it is wrapped here.
 */
export default function LegacyPortfolio() {
  return (
    <LocaleProvider locale="en">
      <Home />
    </LocaleProvider>
  );
}
