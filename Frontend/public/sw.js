let cacheData = "pwaV1";
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "/manifest.json",
        "/logo192.png",
        "/index.html",
        "/",
        "/users",
        "/static/"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
    );
  } else {
    event.respondWith(
      fetch(event.request).then((response) => {
        return caches.open(cacheData).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(() => {
        return caches.match(event.request);
      })
    );
  }
});

self.addEventListener('message', (event) => {
  const notificationData = event.data;
  const message = notificationData.message;
  const path = notificationData.path;

  // Check if the Notification API permission is granted
  if (Notification.permission === 'granted') {
    // Trigger push notification
    self.registration.showNotification('ออร์เดอร์มาแล้ว!!', {
      body: message,
      data: { path }, // Include the path in the notification data
    });
  } else {
    // Permission is not granted, handle it accordingly (e.g., show a fallback message)
    console.log('Notification permission not granted.');
  }
});


self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const path = event.notification.data.path; // Retrieve the path from the notification data

  if (event.action === 'view') {
    event.waitUntil(clients.openWindow(path));
  } else if (event.action === 'dismiss') {
    console.log('Push notification clicked with action "dismiss".');
  } else {
    console.log('Push notification clicked with no action.');
  }
});