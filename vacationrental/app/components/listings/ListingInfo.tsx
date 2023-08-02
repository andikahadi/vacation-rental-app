"use client";

import useCities from "@/app/hooks/useCities";
import { User } from "@prisma/client";
import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import Avatar from "../navbar/Avatar";
import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  description: string;
  host: User | null;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;

  locationValue: string;
}

// Add on : Amenities, VIP Services, Bedroom arrangement

const ListingInfo: React.FC<ListingInfoProps> = ({
  description,
  host,
  category,
  locationValue,
}) => {
  const { getByName } = useCities();
  const location = getByName(locationValue);
  return (
    <div className="flex flex-col gap-6">
      <div>{description}</div>
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold">About this stay</div>
        <hr />
        {category && (
          <div className="pt-2">
            <ListingCategory
              icon={category.icon}
              label={category.label}
              description={category.description}
            />
          </div>
        )}
      </div>
      <hr />
      <div className="flex flex-row gap-2 item-center">
        Hosted by {host?.name}
        <Avatar src={host?.image} />
      </div>

      <Map center={location?.latlng} />
    </div>
  );
};

export default ListingInfo;
