import { projectsData } from './projects';
import { initialTestimonials } from './testimonials';

const PROJECTS_KEY = 'natch_projects_v1';
const TESTIMONIALS_KEY = 'natch_testimonials_v1';
const ADMIN_AUTH_KEY = 'natch_admin_session';

export function getStoredProjects() {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projectsData));
      return projectsData;
    }
    return JSON.parse(raw);
  } catch {
    return projectsData;
  }
}

export function saveStoredProjects(projects) {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event('natch_projects_changed'));
  } catch (err) {
    console.error('Gagal menyimpan proyek ke localStorage', err);
  }
}

export function resetStoredProjects() {
  saveStoredProjects(projectsData);
}

export function getStoredTestimonials() {
  try {
    const raw = localStorage.getItem(TESTIMONIALS_KEY);
    if (!raw) {
      localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(initialTestimonials));
      return initialTestimonials;
    }
    return JSON.parse(raw);
  } catch {
    return initialTestimonials;
  }
}

export function saveStoredTestimonials(testimonials) {
  try {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(testimonials));
    window.dispatchEvent(new Event('natch_testimonials_changed'));
  } catch (err) {
    console.error('Gagal menyimpan testimoni ke localStorage', err);
  }
}

export function addStoredTestimonial(newTestimonial) {
  const current = getStoredTestimonials();
  const updated = [newTestimonial, ...current];
  saveStoredTestimonials(updated);
  return updated;
}

export function deleteStoredTestimonial(id) {
  const current = getStoredTestimonials();
  const updated = current.filter((t) => t.id !== id);
  saveStoredTestimonials(updated);
  return updated;
}

export function checkAdminSession() {
  return localStorage.getItem(ADMIN_AUTH_KEY) === 'authenticated';
}

export function setAdminSession(isAuthenticated) {
  if (isAuthenticated) {
    localStorage.setItem(ADMIN_AUTH_KEY, 'authenticated');
  } else {
    localStorage.removeItem(ADMIN_AUTH_KEY);
  }
  window.dispatchEvent(new Event('natch_auth_changed'));
}
