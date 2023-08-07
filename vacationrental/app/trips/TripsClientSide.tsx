"use client";

import { Reservation, User } from "@prisma/client";
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

interface TripsClientSideProps {
  reservations: Reservation[];
  currentUser: User | null;
}

const TripsClientSide: React.FC<TripsClientSideProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");
  const [hoverListingId, setHoverListingId] = useState("");

  const onCancel = (id: string) => {
    setDeleteId(id);

    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled");
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
          <Heading
            title="Trips"
            subtitle="Where youve been and where youre going"
          />
        </div>

        <>
          {reservations.map((reservation: any) => {
            return (
              <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deleteId == reservation.id}
                actionLabel="Cancel reservation"
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
        <Map
          large
          reservations={reservations}
          hoverListingId={hoverListingId}
        />
      </div>
    </div>
  );
};

export default TripsClientSide;
