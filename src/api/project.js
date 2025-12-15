import { projects } from "../data/projects";

export async function getProjects() {
  return new Promise(resolve => {
    setTimeout(() => resolve(projects), 300);
  });
}

let items = [...projects]; // copia editable

export function addProject(project) {
  items.push({ id: crypto.randomUUID(), ...project });
  return Promise.resolve(items);
}

export function deleteProject(id) {
  items = items.filter(p => p.id !== id);
  return Promise.resolve(items);
}

export function updateProject(id, data) {
  items = items.map(p => p.id === id ? { ...p, ...data } : p);
  return Promise.resolve(items);
}
