import { projects } from "../data/projects";

export async function getProjects() {
  return new Promise(resolve => {
    setTimeout(() => resolve(projects), 300);
  });
}