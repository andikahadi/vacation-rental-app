import EmptyMessage from "../components/EmptyMessage";

import getCurrentUser from "../actions/getCurrentUser";

import PropertiesClientSide from "./PropertiesClientSide";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyMessage title="Unauthorized" subtitle="Please login" />;
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length == 0) {
    return (
      <EmptyMessage
        title="No property found"
        subtitle="Looks like you haven't list any properties"
      />
    );
  }

  return (
    <>
      <PropertiesClientSide listings={listings} currentUser={currentUser} />
    </>
  );
};

export default PropertiesPage;
