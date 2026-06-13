import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

function TravelMap({
  locations,
}) {
  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={4}
      style={{
        height: "280px",
        width: "100%",
      }}
    >
      <TileLayer
        url="
https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
        "
      />

      {locations.map(
        (location, index) => (
          <Marker
            key={index}
            position={[
              location.lat,
              location.lng,
            ]}
          >
            <Popup>
              {location.name}
            </Popup>
          </Marker>
        )
      )}
    </MapContainer>
  );
}

export default TravelMap;