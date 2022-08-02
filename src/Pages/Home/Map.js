import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = () => {

  return (
    <section className="w-full">
      <h2 className="--heading">Location</h2>
      <MapContainer
        center={[23.7934, 90.4064]}
        zoom={16}
        scrollWheelZoom={false}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[23.7934, 90.4064]}>
          <Popup>Dewalt Manufacturer & Supplier</Popup>
        </Marker>
      </MapContainer>
    </section>
  );
};

export default Map;
