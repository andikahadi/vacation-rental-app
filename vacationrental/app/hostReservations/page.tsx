import EmptyMessage from "../components/EmptyMessage";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

const HostReservationPage = () => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <EmptyMessage title="Unauthorized" subtitle="Please login" />;
  }

  return (
    <div>
      <div></div>
    </div>
  );
};

export default HostReservationPage;
