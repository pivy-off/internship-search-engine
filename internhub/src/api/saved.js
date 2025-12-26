const KEY = "internhub_saved_ids";

export function getSavedIds() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function isSaved(id) {
  return getSavedIds().includes(id);
}

export function toggleSaved(id) {
  const current = getSavedIds();
  const next = current.includes(id) ? current.filter((x) => x !== id) : [id, ...current];
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
