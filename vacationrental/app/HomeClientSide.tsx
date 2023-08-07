"use client";

import { Listing, User } from "@prisma/client";
import dynamic from "next/dynamic";
import { useState } from "react";
import EmptyMessage from "./components/EmptyMessage";
import Heading from "./components/Heading";
import ListingCard from "./components/listings/ListingCard";
import useCities from "./hooks/useCities";

const Map = dynamic(() => import("./components/Map"), {
  ssr: false,
});

interface HomeClientSideProps {
  currentUser: User | null;
  listings: Listing[];
  locationValue: string;
}

const HomeClientSide: React.FC<HomeClientSideProps> = ({
  currentUser,
  listings,
  locationValue,
}) => {
  const [hoverListingId, setHoverListingId] = useState("");

  const { getByName } = useCities();
  let locationLabel = "";

  if (locationValue) {
    locationLabel = getByName(locationValue)?.label as string;
  } else {
    locationLabel = "Anywhere";
  }

  return (
    <div
      className="
      max-w-[1920px]
      w-full
      h-screen
      mx-auto
      flex
      flex-row
      items-center
      justify-content
      
    "
    >
      <div
        className="
          pt-10
          h-full
          w-full
          md:w-1/2
          lg:w-7/12
          xl:w-[681px]
          2xl:w-[762px]
          xl:flex-none
          flex
          flex-col       
        "
      >
        {listings.length == 0 ? (
          <EmptyMessage />
        ) : (
          <>
            <div className="px-4 lg:px-8 py-4">
              <Heading
                title={locationLabel}
                subtitle={
                  listings.length +
                  (listings.length == 1
                    ? " home available"
                    : " homes available")
                }
              />
            </div>
            {listings.map((listing: any) => {
              return (
                <ListingCard
                  key={listing.id}
                  data={listing}
                  currentUser={currentUser}
                  onMouseEnter={(value: string) => {
                    setHoverListingId(value as string);
                  }}
                  onMouseLeave={() => {
                    setHoverListingId("");
                  }}
                />
              );
            })}
          </>
        )}
      </div>
      <div
        className="
          h-full 
          w-0
          md:w-1/2
          lg:w-5/12
          xl:w-full
          gap-8      
          bg-blue-400"
      >
        <Map large listings={listings} hoverListingId={hoverListingId} />
      </div>
    </div>
  );
};

export default HomeClientSide;
