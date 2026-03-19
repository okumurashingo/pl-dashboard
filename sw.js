// 古いキャッシュを全削除して自己無効化するService Worker
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(names => Promise.all(names.map(n => caches.delete(n))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll()).then(clients => {
        clients.forEach(c => c.navigate(c.url));
      })
  );
});
self.addEventListener('fetch', e => e.respondWith(fetch(e.request)));
