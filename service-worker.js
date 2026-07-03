const CACHE_NAME = 'mission-zeltlager-v18';
const FILES_TO_CACHE = ['./README.txt', './assets/fuss.png', './assets/konfettiblau.png', './assets/konfettigelb.png', './assets/konfettipink.png', './assets/lochblau.png', './assets/lochgelb.png', './assets/lochpink.png', './assets/map.png', './assets/missionzeltlager.png', './assets/muffinblau.png', './assets/muffingelb.png', './assets/muffinpink.png', './assets/pinkblau.png', './assets/pinkgelb.png', './assets/pinklila.png', './assets/schwimmblau.png', './assets/schwimmgelb.png', './assets/schwimmpink.png', './assets/smilyblau.png', './assets/smilygelb.png', './assets/smilypink.png', './assets/trampolin.png', './icon-180.png', './icon-192.png', './icon-512.png', './index.html', './manifest.webmanifest', './missions.js', './script.js', './style.css'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
