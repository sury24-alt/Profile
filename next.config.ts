// Polyfill for Node.js v25+ where localStorage exists but getItem is broken
// when --localstorage-file is not properly configured.
if (typeof globalThis.localStorage !== 'undefined' && typeof globalThis.localStorage.getItem !== 'function') {
  const memoryStore = new Map<string, string>();
  (globalThis as any).localStorage = {
    getItem(key: string) { return memoryStore.get(key) ?? null; },
    setItem(key: string, value: string) { memoryStore.set(key, String(value)); },
    removeItem(key: string) { memoryStore.delete(key); },
    clear() { memoryStore.clear(); },
    get length() { return memoryStore.size; },
    key(index: number) { const keys = Array.from(memoryStore.keys()); return keys[index] ?? null; },
  };
}

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ['firebase'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
