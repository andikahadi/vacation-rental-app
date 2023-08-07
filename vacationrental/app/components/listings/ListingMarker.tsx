"use client";

import { Listing } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ListingMarkerProps {
  id: string;
  imgSrc: string;
  title: string;
  guestCount: number;
  roomCount: number;
}

const ListingMarker: React.FC<ListingMarkerProps> = ({
  id,
  imgSrc,
  title,
  guestCount,
  roomCount,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/listings/${id}`)}
      className="background-white flex flex-col items-center justify-start w-60 m-0 cursor-pointer"
    >
      <div className="w-full aspect-video overflow-hidden relative">
        <Image
          alt="image"
          src={imgSrc}
          layout="fill"
          objectFit="cover"
          className="object-cover w-full"
        />
      </div>
      <div className="w-full p-4 flex flex-col gap-2 items-start justify-start">
        <div className="text-neutral-800 font-semibold">{title}</div>
        <ul className="text-xs font-light text-neutral-700 list-disc list-inside inline-flex w-auto flex-row items-center justify-start">
          <li className="list-none inline-block mr-2">
            Up to {guestCount} guests
          </li>
          <li className="">
            <span className="relative -left-1">{roomCount} bedrooms</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ListingMarker;
