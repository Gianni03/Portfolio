/**
 * Lecturas públicas de Supabase con fetch directo.
 *
 * El SDK de supabase-js pesa unos 190 KB y el home lo cargaba solo para leer
 * cuatro listas. Estas consultas van por la API REST, que es la misma que usa
 * el SDK por dentro, y dejan el SDK únicamente en el panel de administración.
 */

const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function get(path) {
  if (!URL || !KEY) {
    throw new Error('Supabase no está configurado.');
  }

  const response = await fetch(`${URL}/rest/v1/${path}`, {
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase respondió ${response.status}`);
  }

  return response.json();
}

export const getProjects = () =>
  get('projects?select=*&order=created_at.asc');

export const getCases = () => get('cases?select=*&order=position.asc');

export const getFaqs = () => get('faqs?select=*&order=position.asc');

export const getLogos = () => get('logos?select=*&order=position.asc');
