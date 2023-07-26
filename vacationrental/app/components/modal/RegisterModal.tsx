"use client";

import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
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
    <div className="flex flex-col gap-5 w-full">
      <div className="text-lg font-light">
        We need a few more details to create your account
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-md font-semibold">Your name and email</div>
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
        <Input
          id="email"
          label="Email"
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

  const footerRegister = (
    <>
      <div className="flex flex-col gap-3">
        <hr />
        <Button
          outline
          label="Continue with Google"
          onClick={() => signIn("google")}
          icon={FcGoogle}
        />
        <Button
          outline
          label="Continue with Github"
          onClick={() => signIn("github")}
          icon={AiFillGithub}
        />
        <div className="text-sm font-light text-neutral-500  pl-1 flex flex-row gap-2">
          <div>Already have an account?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={() => {
              registerModal.onClose();
              loginModal.onOpen();
            }}
          >
            Sign in
          </div>
        </div>
      </div>
    </>
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
        footer={footerRegister}
      />
    </>
  );
};

export default RegisterModal;
