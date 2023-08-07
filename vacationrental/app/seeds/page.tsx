import getCurrentUser from "../actions/getCurrentUser";
import EmptyMessage from "../components/EmptyMessage";
import SeedsClientSide from "./SeedsClientSide";

const SeedsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyMessage title="Unauthorized" subtitle="Please login" />;
  }

  return <SeedsClientSide currentUser={currentUser} />;
};

export default SeedsPage;
