/* mUYA service worker.
   HOW TO USE: when you host the mUYA HTML file on https (for example
   GitHub Pages or Netlify), upload this file next to it and RENAME it
   to sw.js. The app detects it and registers it automatically.
   It caches the app so pages you already visited keep working offline.
   It does NOT work when the file is opened from Downloads (file://) -
   that is a browser rule, not a bug. As a single file, the app already
   opens offline from Downloads anyway. */
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(clients.claim()); });
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.open('muya-v1').then(function (c) {
      return c.match(e.request).then(function (r) {
        return (
          r ||
          fetch(e.request).then(function (res) {
            if (e.request.method === 'GET') {
              c.put(e.request, res.clone());
            }
            return res;
          })
        );
      });
    })
  );
});
