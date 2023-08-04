"use client";

import { Listing, User } from "@prisma/client";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavoritesClientSideProps {
  currentUser: User | null;
  favoriteListings: Listing[];
}

const FavoritesClientSide: React.FC<FavoritesClientSideProps> = ({
  currentUser,
  favoriteListings,
}) => {
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
        <div className="px-4 lg:px-8 py-4">
          <Heading
            title="Favorites"
            subtitle="Places that you have liked so far"
          />
        </div>

        <>
          {favoriteListings.map((listing: any) => {
            return (
              <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
              />
            );
          })}
        </>
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
      ></div>
    </div>
  );
};

export default FavoritesClientSide;
