import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

export const Map = ({ location, city, region, className }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    fetch(
      `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=${location},${city},${region}&f=json`
    )
      .then((response) => response.json())
      .then((response) => {
        const coordinates = response.candidates[0].location;
        setPosition([coordinates.y, coordinates.x]);
      });
  }, [location, city, region]);

  return (
    <>
      {position && (
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
      )}
    </>
  );
};
