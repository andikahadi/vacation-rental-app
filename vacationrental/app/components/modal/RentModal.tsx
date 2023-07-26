"use client";

import useRentModal from "@/app/hooks/useRentModal";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import CategoryBox from "../CategoryBox";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import CitySelect from "../inputs/CitySelect";
import { locationCategories } from "./FiltersModal";
import Modal from "./Modal";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  // Initialize form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step == STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step == STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyRent = (
    <div className="flex flex-col gap-8 w-full">
      <Heading
        title="Which category suits your vacation home"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-2 gap-3 overflow-y-auto py-4">
        {locationCategories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => {
                setCustomValue("category", category);
              }}
              selected={category == item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step == STEPS.LOCATION) {
    bodyRent = (
      <div
        className="
        flex 
        flex-col 
        gap-8
        w-full
      "
      >
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CitySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step == STEPS.INFO) {
    bodyRent = (
      <div className="flex flex-col gap-8 w-full">
        <Heading title="" />
      </div>
    );
  }

  return (
    <Modal
      title="Become a host in Bali"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
      body={bodyRent}
    />
  );
};

export default RentModal;
