import dynamic from "next/dynamic";
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
  const { getByName } = useCities();

  const { locationValue } = searchParams;
  let locationLabel = "";

  if (locationValue) {
    locationLabel = getByName(locationValue)?.label as string;
  } else {
    locationLabel = "Anywhere";
  }

  return (
    <HomeClientSide
      currentUser={currentUser}
      listings={listings}
      locationLabel={locationLabel}
    />
  );
}
