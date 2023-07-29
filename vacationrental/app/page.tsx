import Image from "next/image";
import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";

import Container from "./components/Container";
import EmptyMessage from "./components/EmptyMessage";
import ListingCard from "./components/listings/ListingCard";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();
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
            {listings.map((listing: any) => {
              return (
                <div>
                  <ListingCard data={listing} currentUser={currentUser} />
                </div>
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
        Reserved for map
      </div>
    </div>
  );
}
