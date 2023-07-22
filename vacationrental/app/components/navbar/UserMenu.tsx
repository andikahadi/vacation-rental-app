"use client ";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import { CiMenuFries } from "react-icons/ci";
import Avatar from "./Avatar";

const UserMenu = () => {
  const registerModal = useRegisterModal();
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <div className="py-2 px-4 rounded-full hover:bg-neutral-100 transition">
        Become a host
      </div>
      <div
        onClick={() => registerModal.onOpen()}
        className="
          flex 
          flex-row 
          items-center 
          rounded-full 
          border
          py-1
          px-2
          gap-2 
          hover:shadow-md
          transition"
      >
        <CiMenuFries size={30} />
        <Avatar />
      </div>
    </div>
  );
};

export default UserMenu;
