"use client";

import L, { divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
  large?: boolean;
}

const Map: React.FC<MapProps> = ({ large, center, id = 2 }) => {
  const markers = [
    {
      markerId: 1,
      latlng: [-8.6831, 115.1734],
      desc: "This is property 1",
    },
    {
      markerId: 2,
      latlng: [-8.64743998211, 115.150090034655],
      desc: "This is property 2",
    },
    {
      markerId: 3,
      latlng: [-8.674995115, 115.156772053665],
      desc: "This is property 3",
    },
  ];

  const customIcon = divIcon({
    html: `<div class="marker-icon">$256</div>`,
  });
  const customIconSelected = divIcon({
    html: `<div class="marker-icon selected">$256</div>`,
  });

  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [-8.4095, 115.1889]}
      zoom={center ? 12 : 9}
      scrollWheelZoom={false}
      className={`
        ${large ? "rounded-none" : "rounded-lg"}
        ${large ? "h-full" : "h-[35vh]"}
       
      `}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && <Marker position={center as L.LatLngExpression} />}

      {markers.map((marker) => {
        return (
          <Marker
            key={marker.markerId}
            position={marker.latlng as L.LatLngExpression}
            icon={id == marker.markerId ? customIconSelected : customIcon}
          >
            <Popup>
              <div>{marker.desc}</div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
