import { projects as localProjects } from "../../../data/projects";

export default function useProjects() {
  // Futuro: reemplazar localProjects por fetch a API
  return {
    projects: localProjects,
    count: localProjects.length
  };
}

