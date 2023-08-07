"use client";

import L, { divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Listing, Reservation } from "@prisma/client";

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
  listings?: Listing[];
  hoverListingId?: String;
  reservations?: Reservation[];
}

const Map: React.FC<MapProps> = ({
  large,
  center,
  hoverListingId = "",
  listings,
  reservations,
}) => {
  // const markers = [
  //   {
  //     markerId: 1,
  //     latlng: [-8.6831, 115.1734],
  //     desc: "This is property 1",
  //   },
  //   {
  //     markerId: 2,
  //     latlng: [-8.64743998211, 115.150090034655],
  //     desc: "This is property 2",
  //   },
  //   {
  //     markerId: 3,
  //     latlng: [-8.674995115, 115.156772053665],
  //     desc: "This is property 3",
  //   },
  // ];
  let markers;
  if (listings) {
    markers = listings?.map((listing) => ({
      markerId: listing.id,
      latlng: listing.address,
      imgSrc: listing.imageSrc1,
      title: listing.title,
      guestCount: listing.guestCount,
      roomCount: listing.roomCount,
      price: listing.price,
    }));
  }

  if (reservations) {
    markers = reservations?.map((reservation: any) => ({
      markerId: reservation.listingId,
      latlng: reservation.listing.address,
      imgSrc: reservation.listing.imageSrc1,
      title: reservation.listing.title,
      guestCount: reservation.listing.guestCount,
      roomCount: reservation.listing.roomCount,
      price: reservation.listing.price,
    }));
  }
  const customIcon = (price: number) => {
    return divIcon({
      html: `<div class="marker-icon">SGD ${price}</div>`,
    });
  };
  const customIconSelected = (price: number) => {
    return divIcon({
      html: `<div class="marker-icon selected">SGD ${price}</div>`,
    });
  };

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

      {markers?.map((marker) => {
        return (
          <Marker
            key={marker.markerId}
            position={marker.latlng as L.LatLngExpression}
            icon={
              hoverListingId == marker.markerId
                ? customIconSelected(marker.price)
                : customIcon(marker.price)
            }
          >
            <Popup>
              <div>{marker.title}</div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
