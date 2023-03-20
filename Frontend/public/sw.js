let cacheData = "pwaV1";
this.addEventListener("install", (event) => {
  var clientId = event.source.id; // Get the ID of client
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "/manifest.json",
        "/logo192.png",
        "/index.html",
        "/",
        "/users",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  // event.waitUntil(
  //     this.registration.showNotification("hello", {
  //         body: "hello from notification"
  //     })
  //     , console.log('ff')
  // )
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        let requestUrl = event.request.clone();
        fetch(requestUrl);
      })
    );
  }
});

this.addEventListener("push", (event) => {
  const payload = event.data ? event.data.text() : "New notification";
  const options = {
    body: payload,
    data: { url: "/" },
    actions: [
      { action: "view", title: "View" },
      { action: "dismiss", title: "Dismiss" },
    ],
  };
  event.waitUntil(
    this.registration
      .showNotification("Pwa", options)
      .then(() => console.log(`Push Notification shown: ${payload}`))
  );
});

this.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "view") {
    console.log('Push notification clicked with action "view".');
    clients.openWindow(event.notification.data.url);
  } else if (event.action === "dismiss") {
    console.log('Push notification clicked with action "dismiss".');
  } else {
    console.log("Push notification clicked with no action.");
  }
});

self.addEventListener("message", (event) => {
  if (event.data.action === "get-location") {
    navigator.geolocation.getCurrentPosition((position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      self.clients.get(clientId).then(function (client) {
        client.postMessage({ location: location });
      });
    });
  }
});
