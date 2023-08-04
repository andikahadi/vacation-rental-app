import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import EmptyMessage from "../components/EmptyMessage";
import FavoritesClientSide from "./FavoritesClientSide";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyMessage title="Unauthorized" subtitle="Please login" />;
  }

  const favoriteListings = await getFavorites();

  if (favoriteListings.length == 0) {
    return (
      <EmptyMessage
        title="No favorites found"
        subtitle="Looks like you haven't bookmark any listings"
      />
    );
  }

  return (
    <>
      <FavoritesClientSide
        currentUser={currentUser}
        favoriteListings={favoriteListings}
      />
    </>
  );
};

export default FavoritesPage;
