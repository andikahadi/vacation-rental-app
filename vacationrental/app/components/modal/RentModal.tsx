"use client";

import useRentModal from "@/app/hooks/useRentModal";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CategoryBox from "../CategoryBox";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import CitySelect from "../inputs/CitySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
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
  const router = useRouter();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

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
      address: "",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc1: "",
      imageSrc2: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const address = watch("address");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc1 = watch("imageSrc1");
  const imageSrc2 = watch("imageSrc2");

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step != STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("api/listings", data)
      .then(() => {
        toast.success("Listing Created!");
        router.refresh();
        reset(); // reset react form
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
        <Input
          id="address"
          label="Address"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
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
        <Heading title="Select amenities available at the place" />
        <Counter
          title="Guests"
          subtitle="How many guests are allowed"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step == STEPS.IMAGES) {
    bodyRent = (
      <div className="flex flex-col gap-8 w-full">
        <Heading title="Upload a picture of your place" />
        <ImageUpload
          value={imageSrc1}
          onChange={(value) => setCustomValue("imageSrc1", value)}
        />
        <ImageUpload
          value={imageSrc2}
          onChange={(value) => setCustomValue("imageSrc2", value)}
        />
      </div>
    );
  }

  if (step == STEPS.DESCRIPTION) {
    bodyRent = (
      <div className="flex flex-col gap-8 w-full">
        <Heading title="How would you describe your place" />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step == STEPS.PRICE) {
    bodyRent = (
      <div className="flex flex-col gap-8 w-full">
        <Heading title="Set price per night" />
        <Input
          id="price"
          label="Price"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          priceMode
        />
      </div>
    );
  }

  return (
    <Modal
      title="Become a host in Bali"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
      body={bodyRent}
    />
  );
};

export default RentModal;
