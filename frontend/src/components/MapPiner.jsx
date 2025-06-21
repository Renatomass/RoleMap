import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";

const markerIcon = new L.Icon({
   iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function LocationMarker({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      const { lat, lng} = e.latlng;
      onLocationSelect && onLocationSelect({lat, lng});
    },
  });
  return null;
}

export default function MapPicker({ onLocationSelect, location }) {
  return (
    <MapContainer
      center={location || { lat: -3.7319, lng: -38.5267}}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "100%", borderRadius: "0.75rem" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onLocationSelect={onLocationSelect} />
      {location && <Marker position={location} icon={markerIcon} />}
    </MapContainer>
  );
}
