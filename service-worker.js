var CACHE_NAME = 'intranet-v1';
var urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/dist/build.js'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});