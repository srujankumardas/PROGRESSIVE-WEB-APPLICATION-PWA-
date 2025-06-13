const CACHE_NAME = "ecom-cache-v1";

const urlsToCache = [
  "./index.html",
  "./style.css",
  "./app.js",
  "./product/logo1.png",
  "./product/logo1-144x144.png",
  "./product/desktop.png",
  "./product/mobile.png",
  "./manifest.json"
];

// INSTALL: cache static assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ACTIVATE: clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// FETCH: serve from cache, fall back to network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      // Optional: fallback page/image if request fails
    })
  );
});
