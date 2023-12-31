"use client";

import { signIn } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { AiFillGithub } from "react-icons/ai";

const LoginModal = () => {
  const router = useRouter();
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
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast.success("You're now logged in");
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error("Something went wrong");
      }
    });
  };

  const bodyLogin = (
    <div className="flex flex-col gap-5 w-full">
      <div className="text-lg font-light">Welcome back</div>
      <div className="flex flex-col gap-2">
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

  const footerLogin = (
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
          <div>New to Bali Haven?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={() => {
              loginModal.onClose();
              registerModal.onOpen();
            }}
          >
            Create an account
          </div>
        </div>
      </div>
    </>
  );

  return (
    <Modal
      title={"Sign In"}
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Sign in"
      body={bodyLogin}
      footer={footerLogin}
    />
  );
};

export default LoginModal;
