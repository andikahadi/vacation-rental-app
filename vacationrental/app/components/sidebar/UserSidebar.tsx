"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useUserSidebar from "@/app/hooks/useUserSidebar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Sidebar from "./Sidebar";
import UserSidebarItem from "./UserSidebarItem";

interface UserSidebarProps {}

const UserSidebar = () => {
  const userSidebar = useUserSidebar();
  const loginModal = useLoginModal();
  const router = useRouter();

  const handleSignOut = () => {
    userSidebar.onClose();
    signOut();
    router.refresh();
  };

  const body = (
    <div className="flex flex-col gap-3 pt-12 pb-6">
      <div className="uppercase text-xs text-neutral-500 font-semibold tracking-widest">
        travelling
      </div>
      <div className="flex flex-col gap-3 ">
        <UserSidebarItem
          label={"Trips"}
          onClick={() => router.push("/trips")}
        />
        <UserSidebarItem
          label={"Host Reservation"}
          onClick={() => router.push("/hostreservations")}
        />
        <UserSidebarItem label={"Favorites"} onClick={() => {}} />
      </div>
    </div>
  );

  const footer = (
    <>
      <hr />
      <div className="flex flex-col gap-3 pt-6">
        <UserSidebarItem
          label={"Log Out"}
          onClick={() => {
            handleSignOut();
          }}
        />
      </div>
    </>
  );
  return (
    <Sidebar
      isOpen={userSidebar.isOpen}
      onClose={userSidebar.onClose}
      title="username"
      body={body}
      footer={footer}
    />
  );
};

export default UserSidebar;
