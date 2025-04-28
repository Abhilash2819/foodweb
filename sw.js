
const CACHE_NAME = 'food-oasis-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/menu.html',
  '/restaurants.html',
  '/restaurants.css',
  '/offers.html',
  '/contact.html',
  '/cart.html',
  '/login.html',
  '/style.css',
  '/script.js',
  '/auth.css',
  '/auth.js',
  '/barn.webp',
   '/cart.css',
  '/contact.css',
  '/main.js',
  '/offers.css'
  
  








 
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() =>
        new Response('You are offline and this content is not available.')
      );
    })
  );
});
