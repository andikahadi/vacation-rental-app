"use client";

import { MdOutlineBookmarkAdd } from "react-icons/md";
import { CiBookmarkCheck, CiBookmarkPlus } from "react-icons/ci";
import useFavorite from "../hooks/useFavorite";
import { User } from "@prisma/client";
interface FavoriteButtonProps {
  listingId: string;
  currentUser?: User | null;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
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
