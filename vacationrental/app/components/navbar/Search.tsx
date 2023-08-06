"use client";
import useCities from "@/app/hooks/useCities";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { differenceInDays } from "date-fns";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByName } = useCities();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");
  let locationLabel, durationLabel, guestLabel;

  if (locationValue) {
    locationLabel = getByName(locationValue as string)?.label;
  } else {
    locationLabel = "Add destination";
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let diff = differenceInDays(end, start);

    if (diff == 0) {
      diff = 1;
    }
    durationLabel = `${diff} Days`;
  } else {
    durationLabel = "Add dates";
  }

  if (guestCount) {
    guestLabel = `${guestCount} Guests`;
  } else {
    guestLabel = "Add Guests";
  }

  return (
    <div
      onClick={searchModal.onOpen}
      className="
        border 
        w-[320px]
        lg:w-[720px]
        bg-white
        rounded-md
      "
    >
      <div className="flex flex-row items-center justify-between">
        <div
          className="
            text-sm
            font-light
            py-3
            px-4
            w-full

          "
        >
          {locationLabel}
        </div>
        <div
          className="
            text-sm
            font-light
            py-3
            px-4
            w-full
            border-x-[0px]
            lg:border-x-[1px]

          "
        >
          {durationLabel}
        </div>
        <div
          className="
            text-sm
            font-light
            pl-4
            pr-2
            w-full
            flex
            flex-row
            items-center
            justify-between
          "
        >
          <div>{guestLabel}</div>
          <div
            className="
              hidden
              lg:block
              p-2
              bg-yellow-400
              rounded-full
              text-black  
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
