const CACHE_NAME = "offline-ai-chat-v2"; // Updated cache name to ensure a fresh install

const ASSETS_TO_CACHE = ["/", "index.html", "style.css", "script.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache and caching assets.");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// The updated fetch event listener
self.addEventListener("fetch", (event) => {
  // Only apply caching for requests on your own domain
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // If the resource is in the cache, serve it. Otherwise, fetch it.
        return response || fetch(event.request);
      })
    );
  }
  // For all other requests (like to the AI model's CDN), do nothing and let the browser handle it normally.
});
