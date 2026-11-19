/**
 * Eventos de conversión.
 *
 * `generate_lead` es el nombre recomendado por GA4 para un contacto entrante.
 * Se dispara solo si gtag está disponible: en desarrollo no hay script de
 * Analytics y no queremos errores en consola.
 */
export function trackLead(method) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', 'generate_lead', { method });
}
