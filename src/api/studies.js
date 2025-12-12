import { studies } from "../data/studies";

export async function getStudies() {
  return new Promise(resolve => {
    setTimeout(() => resolve(studies), 300);
  });
}
