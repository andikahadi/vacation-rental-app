"use client";

import useCities from "@/app/hooks/useCities";
import { PiUsers } from "react-icons/pi";
import { LiaBedSolid, LiaShowerSolid } from "react-icons/lia";
import { GiBathtub } from "react-icons/gi";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  guestCount: number;
  bedroomCount: number;
  bathroomCount: number;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  guestCount,
  bedroomCount,
  bathroomCount,
}) => {
  const { getByName } = useCities();
  const location = getByName(locationValue);
  return (
    <div>
      <div className="text-3xl">{title}</div>
      <div className="text-md text-neutral-500">
        {location?.label}, {location?.region}
      </div>
      <div className="flex flex-row gap-6">
        <div className="flex flex-row items-center gap-2">
          <PiUsers />
          <div>{guestCount} guests</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <LiaBedSolid />
          {bedroomCount} bedrooms
        </div>
        <div className="flex flex-row items-center gap-2">
          <LiaShowerSolid />
          {bathroomCount} bathrooms
        </div>
      </div>
    </div>
  );
};

export default ListingHead;
