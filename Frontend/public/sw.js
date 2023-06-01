let cacheData = "pwaV1";
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      return cache.addAll([
        "/static/js/bundle.js",
        "/manifest.json",
        "/logo192.png",
        "/index.html",
        "/",
        "/users",
        "/static/",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // Check if the request is for the desired paths
  if (/^\/client(\/(menus\/\w+)?(\/\w+)?)?$/.test(requestUrl.pathname)) {
    if (!navigator.onLine) {
      event.respondWith(
        caches.match(event.request).then((response) => {
          return (
            response ||
            new Response(null, { status: 503, statusText: "Offline" })
          );
        })
      );
    } else {
      event.respondWith(
        fetch(event.request)
          .then((response) => {
            return caches.open(cacheData).then((cache) => {
              cache.put(event.request, response.clone());
              return response;
            });
          })
          .catch(() => {
            return caches.match(event.request);
          })
      );
    }
  } else {
    // Default fetch behavior for other requests
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
  }
});

self.addEventListener("message", (event) => {
  const notificationData = event.data;
  if (notificationData) {
    const title = notificationData.title
    const message = notificationData.message;
    const path = notificationData.path;

    // Check if the Notification API permission is granted
    if (Notification.permission === "granted") {
      // Trigger push notification
      self.registration.showNotification(title, {
        body: message,
        data: { path }, // Include the path in the notification data
      });
    } else {
      // Permission is not granted, handle it accordingly (e.g., show a fallback message)
      console.log("Notification permission not granted.");
    }
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const path = event.notification.data.path; // Retrieve the path from the notification data

  if (path) {
    event.waitUntil(clients.openWindow(path));
  } else {
    // Handle the click event without any specific action
    console.log("Push notification clicked with no action.");
    // Perform any desired action here
  }
});
