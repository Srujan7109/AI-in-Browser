const CACHE_NAME = "offline-ai-chat-v1";

const ASSETS_TO_CACHE = [
  "/",
  "index.html",
  "style.css",
  "script.js",
  "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache and caching assets.");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
