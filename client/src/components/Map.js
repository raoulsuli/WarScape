import { MapContainer, TileLayer, Marker } from "react-leaflet";

export const Map = ({ position, className }) => {
  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={true}
      className={className}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={position}
        title="Click to open location in Google Maps"
        eventHandlers={{
          click: () => {
            window.open(
              `https://maps.google.com?q=${position[0]},${position[1]}`
            );
          },
        }}
      ></Marker>
    </MapContainer>
  );
};
