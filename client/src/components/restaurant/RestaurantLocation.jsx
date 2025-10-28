import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export const RestaurantLocation = ({ restaurant }) => {
  const defaultPosition = [31.9558, 35.9457]; // Jordan, Amman 5th Circle
  const latitude = restaurant?.latitude ? parseFloat(restaurant.latitude) : null;
  const longitude = restaurant?.longitude ? parseFloat(restaurant.longitude) : null;
  const position = latitude && longitude ? [latitude, longitude] : defaultPosition;

  const mapsLink = latitude && longitude
    ? `https://www.google.com/maps?q=${latitude},${longitude}`
    : "https://www.google.com/maps?q=31.9558,35.9457";

  const popupMessage = latitude && longitude
    ? restaurant.name
    : "This is a placeholder location. The restaurant has not provided a location yet.";

  return (
    <section className="w-full mt-8 flex flex-col gap-4 relative z-20">
      <h2 className="text-2xl font-bold text-secondary">Location</h2>

      <div className="w-full h-64 rounded-xl overflow-hidden border border-secondary/20 shadow">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">{popupMessage}</h3>
                {restaurant?.address && <p className="text-sm text-gray-600">{restaurant.address}</p>}
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline text-sm"
                >
                  Open in Google Maps
                </a>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {restaurant?.address && (
        <p className="text-secondary/80 text-sm">
          📌 <span className="font-medium">{restaurant.address}</span>
        </p>
      )}
    </section>
  );
};
