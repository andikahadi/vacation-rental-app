"use client ";

import useLoginModal from "@/app/hooks/useLoginModal";
import useUserSidebar from "@/app/hooks/useUserSidebar";
import { User } from "@prisma/client";
import { CiMenuFries } from "react-icons/ci";
import Avatar from "./Avatar";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const userSidebar = useUserSidebar();
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <div className="py-2 px-4 rounded-full hover:bg-neutral-100 transition">
        Become a host
      </div>
      <div
        onClick={() => {
          if (!currentUser) {
            loginModal.onOpen();
          } else {
            userSidebar.onOpen();
          }
        }}
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
        <Avatar src={currentUser?.image} />
      </div>
    </div>
  );
};

export default UserMenu;
