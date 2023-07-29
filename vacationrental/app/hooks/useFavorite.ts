import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import useLoginModal from "./useLoginModal";

interface UseFavoriteInput {
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: UseFavoriteInput) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  // check if listingId is inside user favoriteIds
  const list = currentUser?.favoriteIds || [];
  const hasFavorited = list.includes(listingId);

  // toggle
  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      if (hasFavorited) {
        await axios.delete(`/api/favorites/${listingId}`);
      } else {
        await axios.post(`/api/favorites/${listingId}`);
      }

      router.refresh();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
