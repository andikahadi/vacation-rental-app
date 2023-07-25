"use client";
import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  currentUser?: User | null;
}

const Avatar: React.FC<AvatarProps> = ({ currentUser }) => {
  return (
    <div
      className="
      h-[30px] w-[30px] border rounded-full overflow-hidden flex items-center justify-center
    "
    >
      {!currentUser?.firstName && (
        <Image
          height="30"
          width="30"
          alt="avatar"
          src="/images/placeholder.jpg"
        />
      )}
      {currentUser?.firstName && (
        <div className="font-semibold text-lg capitalize">
          {currentUser.firstName[0]}
        </div>
      )}
    </div>
  );
};

export default Avatar;
