// Centralize Vite HMR -> UI re-render bridges for dev-only data updates.

export const PROJECTS_DATA_UPDATED_EVENT = "lovable:projects-data-updated";

/**
 * Ensure edits to src/data/projectsData.ts are reflected immediately in the preview.
 *
 * In dev, Vite can hot-swap the module without forcing React to re-render pages that
 * only *read* the data on render. We dispatch a window event so pages can force a
 * lightweight re-render.
 */
export function registerProjectsDataHmr() {
  if (!import.meta.hot) return;

  // When the data module updates, notify the app.
  import.meta.hot.accept("@/data/projectsData", () => {
    window.dispatchEvent(new Event(PROJECTS_DATA_UPDATED_EVENT));
  });
}
