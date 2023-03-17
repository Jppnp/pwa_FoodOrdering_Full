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
              console.log("Service worker and push messaging supported");
              navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification("My App", {
                  body: "Hello, World!",
                });
              });
            } else {
              console.log("Service worker or push messaging not supported");
            }
          }, 1000);
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
      Send Push Notification in 5 seconds
    </button>
  );
}

export default PushBtn;