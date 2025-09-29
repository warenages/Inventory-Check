const CACHE_NAME = 'inv-cache-sheets-v3del';
const ASSETS = ['./','./index.html','./manifest.webmanifest','./icon-512.png','./config.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k!==CACHE_NAME?caches.delete(k):null)))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin === location.origin) e.respondWith(caches.match(e.request).then(c => c || fetch(e.request)));
});