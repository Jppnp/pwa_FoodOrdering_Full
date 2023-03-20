import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

function LocationMap() {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if ("serviceWorker" in navigator && "geolocation" in navigator) {
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
    if (event.data.location) {
      setCurrentLocation(event.data.location);
    }
  }

  const defaultCenter = { lat: 37.7749, lng: -122.4194 }; //Default to San Franciso if location is not available

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={defaultCenter}
        center={currentLocation}
        defaultZoom={15}
      >
        <Marker
          lat={currentLocation?.lat || defaultCenter.lat}
          lng={currentLocation?.lng || defaultCenter.lng}
        />
      </GoogleMapReact>
      <button onClick={() => window.location.reload()}>Refresh Map</button>
    </div>
  );
}

function Marker() {
  return <div style={{ color: "red", fontSize: "24px" }}>📍</div>;
}

export default LocationMap();
