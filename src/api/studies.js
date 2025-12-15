import { studies } from "../data/studies";

export async function getStudies() {
  return new Promise(resolve => {
    setTimeout(() => resolve(studies), 300);
  });
}
let items = [...studies]; // copia editable

export function addStudie(studies) {
  items.push({ id: crypto.randomUUID(), ...studies });
  return Promise.resolve(items);
}

export function deleteStudie(id) {
  items = items.filter(s => s.id !== id);
  return Promise.resolve(items);
}

export function updateStudie(id, data) {
  items = items.map(s => s.id === id ? { ...s, ...data } : s);
  return Promise.resolve(items);
}
