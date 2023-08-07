import { NextResponse } from "next/server";

import { prisma } from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import useCoord from "@/app/hooks/useCoord";
import Geocode from "react-geocode";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  //@ts-ignore
  Geocode.setApiKey(process.env.GEOCODING_API_KEY);
  Geocode.setLanguage("en");
  Geocode.setRegion("id");

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc1,
    imageSrc2,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
    address,
  } = body;

  let response = await Geocode.fromAddress(address);
  let addressCoord = [
    response.results[0].geometry.location.lat,
    response.results[0].geometry.location.lng,
  ];

  const listing = await prisma.listing.create({
    data: {
      title: title,
      description: description,
      imageSrc1: imageSrc1,
      imageSrc2: imageSrc2,
      category: category,
      roomCount: roomCount,
      bathroomCount: bathroomCount,
      guestCount: guestCount,
      locationValue: location.label,
      price: parseInt(price, 10),
      address: address,
      addressCoord: addressCoord,
      userId: currentUser.id,
    },
  });
  console.log(listing);

  return NextResponse.json(listing);
}
