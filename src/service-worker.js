self.__precacheManifest = [].concat(self.__precacheManifest || [])

// Needed to trigger pwa install
self.addEventListener("fetch", function (event) {
  event.respondWith(fetch(event.request));
})

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
})
