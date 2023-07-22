"use client";

import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Input from "../inputs/Input";
import toast from "react-hot-toast";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  // Form control
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose;
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyRegister = (
    <div className="flex flex-col gap-5">
      <div className="text-lg font-light">
        We need a few more details to create your account
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-md font-semibold">Your Name</div>
        <Input
          id="firstName"
          label="First name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="lastName"
          label="Last name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-md font-semibold">Create a password</div>
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    </div>
  );

  return (
    <>
      <Modal
        title={"Register"}
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel="Create My Account"
        body={bodyRegister}
      />
    </>
  );
};

export default RegisterModal;
