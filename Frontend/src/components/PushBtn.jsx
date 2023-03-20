import React from "react";

function PushBtn() {
  const handleNotificationClick = () => {
    if ("Notification" in window) {
      // Request notification permission
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted!!!");

          setTimeout(() => {
            if ("serviceWorker" in navigator && "PushManager" in window) {
              navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification("Pwa", {
                  body: "Hello, World!",
                  data: { url: "/" },
                  actions: [
                    { action: "view", title: "View" },
                    { action: "dismiss", title: "Dismiss" },
                  ],
                });
              });
            }
          }, 2000);
        } else {
          console.log("Notification permission not granted");
        }
      });
    } else {
      console.log("Notifications not supported");
    }
  };

  return (
    <button onClick={handleNotificationClick}>
      Send Push Notification in 2 seconds
    </button>
  );
}

export default PushBtn;
