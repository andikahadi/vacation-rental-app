import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";

import HomeClientSide from "./HomeClientSide";
import useCities from "./hooks/useCities";

interface HomeProps {
  searchParams: IListingParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  const { locationValue } = searchParams;

  return (
    <HomeClientSide
      currentUser={currentUser}
      listings={listings}
      locationValue={locationValue}
    />
  );
}
