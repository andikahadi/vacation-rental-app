"use client";

import useFiltersModal from "@/app/hooks/useFiltersModal";
import Modal from "./Modal";
import { TbBeach } from "react-icons/tb";
import { GiSeaCliff, GiVillage } from "react-icons/gi";
import { BsSun } from "react-icons/bs";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryBox from "../CategoryBox";
import qs from "query-string";

export const locationCategories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach",
  },
  {
    label: "Clifftop",
    icon: GiSeaCliff,
    description: "This property is located at clifftop",
  },
  {
    label: "Village",
    icon: GiVillage,
    description: "This property is nearby village",
  },
];

const FiltersModal = () => {
  const filtersModal = useFiltersModal();
  const router = useRouter();
  const params = useSearchParams();

  const [locationCategory, setLocationCategory] = useState(
    params?.get("locationCategory")
  );

  const handleSubmit = () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationCategory: locationCategory,
    };

    if (updatedQuery.locationCategory.length == 0) {
      delete updatedQuery.locationCategory;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    filtersModal.onClose();
    router.push(url);
  };

  const bodyFilters = (
    <div className="flex flex-col gap-4 w-full min-h-[400px]">
      <div className="flex flex-row gap-4 items-center ">
        <BsSun size={25} />
        <div className="text-lg">Locations</div>
      </div>
      <div className="grid grid-cols-2 gap-3 overflow-y-auto">
        {locationCategories.map((item) => (
          <div key={item.label} className="col">
            <CategoryBox
              label={item.label}
              icon={item.icon}
              selected={locationCategory == item.label}
              onClick={(value: string) => {
                if (value == locationCategory) setLocationCategory("");
                else setLocationCategory(value as string);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      title={"Filters"}
      isOpen={filtersModal.isOpen}
      onClose={filtersModal.onClose}
      onSubmit={handleSubmit}
      actionLabel="View homes"
      body={bodyFilters}
    />
  );
};

export default FiltersModal;
