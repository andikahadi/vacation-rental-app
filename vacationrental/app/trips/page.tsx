import EmptyMessage from "../components/EmptyMessage";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

import TripsClientSide from "./TripsClientSide";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyMessage title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length == 0) {
    return (
      <EmptyMessage
        title="No trips found"
        subtitle="Looks like you haven't reserved any trips"
      />
    );
  }

  return (
    <>
      <TripsClientSide reservations={reservations} currentUser={currentUser} />
    </>
  );
};

export default TripsPage;
