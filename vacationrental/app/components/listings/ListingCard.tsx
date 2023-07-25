"use client";

import Button from "../Button";
import Image from "next/image";
import FavoriteButton from "../FavoriteButton";

interface ListingCardProps {
  data: any;
}

const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
  return (
    <div
      className="
        px-4
        lg:px-8
        py-4 
        border-[1px]
        cursor-pointer 
        hover:bg-neutral-100 
        transition
      "
    >
      <div
        className="
          flex 
          flex-col
          lg:flex-row 
          gap-4
          
          w-full"
      >
        <div
          className="
            w-full
            lg:w-1/2
            aspect-[3/2]
            relative 
            overflow-hidden 
            rounded-sm"
        >
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="
              object-cover
              h-full
              w-full
              group-hover:scale-110
              transition
            "
          />
        </div>
        <div
          className="
            px-4
            lg:px-0
            flex 
            flex-col 
            gap-1
            w-full
            lg:w-1/2
          "
        >
          <div className="flex flex-row items-center justify-between gap-1">
            <div className="font-semibold text-2xl">
              {data.title}
              <span className="block w-12 h-[1px] bg-neutral-200 my-1"></span>
            </div>
            <div className="">
              <FavoriteButton listingId={data.id} />
            </div>
          </div>

          <ul className="text-sm font-semibold text-neutral-500 list-disc list-inside inline-flex w-auto flex-row items-center justify-start">
            <li className="list-none inline-block mr-2">
              Up to {data.guestCount} guests
            </li>
            <li className="">
              <span className="relative -left-2">
                {data.roomCount} bedrooms
              </span>
            </li>
            <li>
              <span className="relative -left-2">
                {data.bathroomCount} bathrooms
              </span>
            </li>
          </ul>

          {/* <div className="text-sm font-semibold text-neutral-500 list-disc list-inside inline-flex w-auto flex-row items-center justify-start">
            <div className="list-none inline-block mr-2">
              Up to {data.guestCount} guests
            </div>
            <div className="mr-2">{data.roomCount} bedrooms</div>
            <div className="mr-2">{data.bathroomCount} bathrooms</div>
          </div> */}

          <div className="font-light text-sm">{data.locationValue}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
