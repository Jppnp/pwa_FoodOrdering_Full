let cacheVersion = "pwaV1"; // Initial cache version
let cacheData = `pwa-${cacheVersion}`; // Cache name with version

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      return cache.addAll([
        "/static/js/bundle.js",
        "/manifest.json",
        "/logo.png",
        "/index.html",
        "/",
        "/client",
      ]);
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CACHE_UPDATE") {
    self.registration.update();
    self.registration.showNotification("Update!!", {
      body: "กรุณาเริ่มต้นหน้าต่างใหม่",
    });
  } else if (event.data && event.data.type === "STORE_DATA") {
    const { url, data } = event.data;
    if (url && data) {
      caches.open(cacheData).then((cache) => {
        const response = new Response(JSON.stringify(data));
        cache.put(url, response);
      });
    }
  } else {
    const notificationData = event.data;
    if (notificationData) {
      const title = notificationData.title;
      const message = notificationData.message;
      const path = notificationData.path;

      if (Notification.permission === "granted") {
        self.registration.showNotification(title, {
          body: message,
          data: { path },
        });
      } else {
        console.log("ไม่ได้รับอนุญาตให้แสดงการแจ้งเตือน");
      }
    }
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const path = event.notification.data.path;

  if (path) {
    event.waitUntil(clients.openWindow(path));
  } else {
    console.log("Push notification clicked with no action.");
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.startsWith("pwa-") && cacheName !== cacheData) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin === "http://localhost:8000") {
    console.log(`Getting  Path: ${requestUrl}`)
    event.respondWith(
      caches.open(cacheData).then(async (cache) => {
        const response = await cache.match(event.request);
        if (response) {
          return response; // คืนข้อมูลจากแคชหากมีอยู่
        }
        const networkResponse = await fetch(event.request);
        if (networkResponse.ok) {
          // ข้อมูลสำเร็จ ทำการบันทึกลงแคชเพื่อใช้ในการออฟไลน์ในอนาคต
          const clonedResponse = networkResponse.clone();
          cache.put(event.request, clonedResponse);
        }
        return networkResponse;
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
