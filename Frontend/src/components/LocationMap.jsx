import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import './marker.css'

const api_key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

function LocationMap() {
  const [center, setCenter] = useState({ lat: 13.7244416, lng: 98.962 });
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsAllowed(true);
        },
        () => setIsAllowed(false)
      );
    } else {
      setIsAllowed(false);
    }
  }, []);

  const handleRefresh = () => window.location.reload();

  const Marker = props => <div className="pin"></div>

  return (
    <div style={{justifyContent:center}}>
      {!isAllowed && <p>Allow the permission to get current location</p>}
      <div style={{ height: "85vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: api_key }}
          center={center}
          defaultZoom={15}
        >
            <Marker lat={center.lat} lng={center.lng} />
        </GoogleMapReact>

        <button onClick={handleRefresh}>Refresh</button>
      </div>
    </div>
  );
}

export default LocationMap;
