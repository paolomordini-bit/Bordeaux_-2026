const CACHE='bordeaux-medoc-v6-2-external-links';
const ASSETS=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./bordeaux.jpg","./medoc.jpg","./dining.jpg","./cellar.jpg","./event-1.ics","./event-2.ics","./event-3.ics","./event-4.ics","./event-5.ics","./event-6.ics","./event-7.ics"];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(Promise.all([
    self.clients.claim(),
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  ]));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // IMPORTANT: do not intercept Google Maps or any external site.
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(e.request).then(cached =>
      cached || fetch(e.request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{});
        return resp;
      }).catch(() => e.request.mode === 'navigate' ? caches.match('./index.html') : Response.error())
    )
  );
});
