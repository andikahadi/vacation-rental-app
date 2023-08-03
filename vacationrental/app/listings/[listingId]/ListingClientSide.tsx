"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import { Range } from "react-date-range";

import { locationCategories } from "@/app/components/modal/FiltersModal";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingImage from "@/app/components/listings/ListingImage";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";

import useLoginModal from "@/app/hooks/useLoginModal";
import { Listing, Reservation, User } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientSideProps {
  reservations?: Reservation[];
  currentUser?: User | null;
  listing: Listing & {
    user: User;
  };
}

const ListingClientSide: React.FC<ListingClientSideProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onNewReservation = () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post(`/api/reservations`, {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return locationCategories.find((item) => item.label == listing.category);
  }, [listing.category]);

  return (
    <div className="w-screen">
      <div className="flex flex-col gap-6 w-full ">
        <div
          className="
            px-0
            xl:px-8
            grid 
            grid-cols-1 
            xl:grid-cols-2 
            grid-flow-row 
            gap-2
            w-full 
            "
        >
          <div className="col-span-1">
            <ListingImage imageSrc={listing.imageSrc} />
          </div>
          <div className="hidden xl:block col-span-1">
            <ListingImage imageSrc={listing.imageSrc} />
          </div>
        </div>
        <div className="px-6 md:px-20 flex flex-row gap-14 ">
          <div className="flex flex-col gap-6 w-full lg:w-3/5">
            <ListingHead
              title={listing.title}
              locationValue={listing.locationValue}
              guestCount={listing.guestCount}
              bedroomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
            />
            <div className="block lg:hidden w-full">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onNewReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
                id={listing.id}
                currentUser={currentUser}
              />
            </div>
            <ListingInfo
              description={listing.description}
              host={listing.user}
              category={category}
              locationValue={listing.locationValue}
            />
          </div>
          <div className="hidden lg:block w-2/5">
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onNewReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
              id={listing.id}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingClientSide;
