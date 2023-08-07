"use client";

import { Listing, Reservation, User } from "@prisma/client";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

interface PropertiesClientSideProps {
  listings: Listing[];
  currentUser: User | null;
}

const PropertiesClientSide: React.FC<PropertiesClientSideProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");
  const [hoverListingId, setHoverListingId] = useState("");
  console.log("hoverlisting id:" + hoverListingId);

  const onCancel = (id: string) => {
    setDeleteId(id);

    axios
      .delete(`/api/listings/${id}`)
      .then(() => {
        toast.success("Properties deleted");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setDeleteId("");
      });
  };

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
          <Heading title="Properties" subtitle="List of your properties" />
        </div>

        <>
          {listings.map((listing: any) => {
            return (
              <ListingCard
                key={listing.id}
                data={listing}
                actionId={listing.id}
                onAction={onCancel}
                disabled={deleteId == listing.id}
                actionLabel="Delete property"
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

export default PropertiesClientSide;
