import { internships } from "../data/internships";

export async function listInternships() {
  return internships;
}

export async function getInternshipById(id) {
  return internships.find((i) => i.id === id) || null;
}
