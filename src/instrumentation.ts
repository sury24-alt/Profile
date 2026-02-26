// Fix for Node.js v25+ where localStorage exists as a global but getItem
// is not a function when --localstorage-file is not properly configured.
// This runs immediately when the module is loaded.

if (
  typeof globalThis.localStorage !== "undefined" &&
  typeof globalThis.localStorage.getItem !== "function"
) {
  const memoryStore = new Map<string, string>();
  (globalThis as any).localStorage = {
    getItem(key: string) {
      return memoryStore.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      memoryStore.set(key, String(value));
    },
    removeItem(key: string) {
      memoryStore.delete(key);
    },
    clear() {
      memoryStore.clear();
    },
    get length() {
      return memoryStore.size;
    },
    key(index: number) {
      const keys = Array.from(memoryStore.keys());
      return keys[index] ?? null;
    },
  };
}

export async function register() {
  // Polyfill is applied at module load time above.
  // This function is required by Next.js instrumentation API.
}
