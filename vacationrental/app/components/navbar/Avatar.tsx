"use client";
import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <div
      className="
      h-[30px] w-[30px] border rounded-full overflow-hidden flex items-center justify-center
    "
    >
      <Image
        height="30"
        width="30"
        alt="avatar"
        src={src || "/images/placeholder.jpg"}
      />

      {/* {currentUser?.image && currentUser?.firstName && (
        <div className="font-semibold text-lg capitalize">
          <Image height="30" width="30" alt="avatar" src={currentUser.image} />
        </div>
      )} */}
    </div>
  );
};

export default Avatar;
