const CACHE_NAME = 'ot-assessment-cache-v1';
const urlsToCache = [
    '/',
    '/newindex.html',
    '/style.css',
    '/script.js',
    '/manifest.json'
    // يتم تضمين الملفات الأساسية هنا
];

// تثبيت Service Worker وتخزين الأصول (Caching)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// اعتراض طلبات الشبكة (Fetching)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // إذا كان الملف موجودًا في الذاكرة المؤقتة، قم بإرجاعه
                if (response) {
                    return response;
                }
                // وإلا، اذهب إلى الشبكة لجلبه
                return fetch(event.request);
            })
    );
});

// تفعيل Service Worker وتنظيف الذاكرة المؤقتة القديمة
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});