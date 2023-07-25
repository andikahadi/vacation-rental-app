"use client";

import { MdOutlineBookmarkAdd } from "react-icons/md";
import { CiBookmarkCheck, CiBookmarkPlus } from "react-icons/ci";
interface FavoriteButtonProps {
  listingId: string;
  hasFavorited: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  listingId,
  hasFavorited = true,
}) => {
  return (
    <div
      onClick={() => {}}
      className={`
          h-12
          w-12
          border
          rounded-full
          flex
          items-center
          justify-center
          hover:shadow-md
          transition
          cursor-pointer
          ${hasFavorited ? "bg-yellow-400" : "bg-white"} 
        `}
    >
      <CiBookmarkPlus size={25} />
    </div>
  );
};

export default FavoriteButton;
