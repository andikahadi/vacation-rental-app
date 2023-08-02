import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingsById from "@/app/actions/getListingById";
import EmptyMessage from "@/app/components/EmptyMessage";
import ListingClientSide from "./ListingClientSide";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingsById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyMessage />;
  }

  return (
    <>
      <ListingClientSide listing={listing} currentUser={currentUser} />
    </>
  );
};

export default ListingPage;
