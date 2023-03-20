import { React, useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

function LocationMap() {
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator && "geolocation" in navigator) {
      navigator.serviceWorker.addEventListener(
        "message",
        handleLocationMessage
      );
      navigator.serviceWorker.ready.then(function (registration) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (permissionState) {
            if (permissionState.state === "granted") {
              setCurrentLocation({ lat: 0, lng: 0 }); // Show loading indicator

              registration.active.postMessage({ action: "get-location" });
            }
          });
      });
    }
  }, []);

  function handleLocationMessage(event) {
    if (
      event.data.location &&
      event.data.clientId === navigator.serviceWorker.controller.id
    ) {
      //Check for clientId and with the current service worker ID
      setCurrentLocation(event.data.location);
    }
  }

  function Marker() {
    return <div style={{ color: "red", fontSize: "24px" }}>📍</div>;
  }

  const defaultCenter = { lat: 37.7749, lng: -122.4194 }; //Default to San Franciso if location is not available

  return (
    <div style={{ height: "500px", width: "100%" }}>
      {currentLocation && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={defaultCenter}
          center={currentLocation}
          defaultZoom={15}
        >
          <Marker lat={currentLocation.lat} lng={currentLocation.lng} />
        </GoogleMapReact>
      )}
      <button onClick={() => window.location.reload()}>Refresh Map</button>
    </div>
  );
}

export default LocationMap();
