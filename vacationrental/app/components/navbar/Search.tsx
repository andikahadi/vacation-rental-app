"use client";
import useSearchModal from "@/app/hooks/useSearchModal";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();
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
          Add destination
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
          Add dates
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
          <div> Add Guests</div>
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
