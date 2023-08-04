import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingsById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import EmptyMessage from "@/app/components/EmptyMessage";
import ListingClientSide from "./ListingClientSide";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  console.log(params);
  const listing = await getListingsById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyMessage />;
  }

  return (
    <>
      <ListingClientSide
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </>
  );
};

export default ListingPage;
