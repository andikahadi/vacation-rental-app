"use client";

import useFiltersModal from "@/app/hooks/useFiltersModal";
import { LuSettings2 } from "react-icons/lu";

const Filters = () => {
  const filtersModal = useFiltersModal();
  return (
    <div
      onClick={filtersModal.onOpen}
      className="
        flex 
        flex-row 
        items-center
        gap-1
        px-4 
        border-neutral-200
        hover:border-neutral-600
        transition
        border-[1px] 
        rounded-3xl
        bg-white
        h-[39px]
        "
    >
      <LuSettings2 />
      <div className="text-md font-light">Filters</div>
    </div>
  );
};

export default Filters;
