// Service Workerを完全無効化：キャッシュ削除後に自分自身を登録解除
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(names => Promise.all(names.map(n => caches.delete(n))))
      .then(() => self.registration.unregister())
  );
});
self.addEventListener('fetch', e => e.respondWith(fetch(e.request)));
