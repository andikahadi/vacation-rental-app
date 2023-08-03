import EmptyMessage from "../components/EmptyMessage";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import HostReservationsClient from "./HostReservationsClient";

const HostReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyMessage title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length == 0) {
    return (
      <EmptyMessage
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      />
    );
  }

  return (
    <HostReservationsClient
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default HostReservationPage;
