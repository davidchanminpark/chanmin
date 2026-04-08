// In-memory pop counter shared across the app.
// Lives for the lifetime of the JS bundle, which means it persists across
// client-side navigation but resets on a hard refresh — exactly what we want.

let count = 0;
const subscribers = new Set<(n: number) => void>();

export function getPopCount() {
  return count;
}

export function incrementPopCount() {
  count += 1;
  subscribers.forEach(cb => cb(count));
}

export function subscribePopCount(cb: (n: number) => void) {
  subscribers.add(cb);
  return () => {
    subscribers.delete(cb);
  };
}
