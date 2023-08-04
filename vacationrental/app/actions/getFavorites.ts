import { prisma } from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavorites() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  const favoriteId = currentUser?.favoriteIds;

  try {
    const favoriteListings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(favoriteId || [])],
        },
      },
    });

    return favoriteListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
