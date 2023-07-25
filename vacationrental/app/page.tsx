import Image from "next/image";
import Container from "./components/Container";
import ListingCard from "./components/listings/ListingCard";

export default function Home() {
  const listings = [
    {
      id: "64b6b529a680719f43bde867",
      title: "Cozy Place in Central",
      description: "Modern building",
      imageSrc:
        "https://res.cloudinary.com/dyoiohdev/image/upload/v1689695499/xxlixhdu3mutyfcwiggh.jpg",
      createdAt: "2023-07-18T15:52:09.188Z",
      category: "Windmill",
      roomCount: 4,
      bathroomCount: 3,
      guestCount: 5,
      locationValue: "HR",
      userId: "64b2eec33cb648e3c4410531",
      price: 400,
      user: {
        id: "64b2eec33cb648e3c4410531",
        name: "andika",
        email: "andika@admin.com",
        emailVerified: null,
        image: null,
        hashedPassword:
          "$2b$12$QuSNlb2nw2qacr9eAFJiceWU7VY4YfMI5Yzujm.4r7FprNcOXa7HK",
        createdAt: "2023-07-15T19:08:51.762Z",
        updatedAt: "2023-07-18T16:35:31.005Z",
        favoriteIds: [],
      },
    },
    {
      id: "64b4364b7d83dcb7c15ee42c",
      title: "Villa in Ubud, Bali",
      description: "Seaside view",
      imageSrc:
        "https://res.cloudinary.com/dyoiohdev/image/upload/v1689531751/mlnvh10dvbk0kducswii.jpg",
      createdAt: "2023-07-16T18:26:19.150Z",
      category: "Beach",
      roomCount: 3,
      bathroomCount: 2,
      guestCount: 3,
      locationValue: "ID",
      userId: "64b2ef983cb648e3c4410533",
      price: 500,
      user: {
        id: "64b2ef983cb648e3c4410533",
        name: "admin",
        email: "admin@admin.com",
        emailVerified: null,
        image: null,
        hashedPassword:
          "$2b$12$WxJpUkg8fa8ebZcXptNWK.DBUW8pPNCOie5Otsfbnw4ivr4j1ziM.",
        createdAt: "2023-07-15T19:12:24.373Z",
        updatedAt: "2023-07-17T19:41:26.771Z",
        favoriteIds: [
          "64b4364b7d83dcb7c15ee42c",
          "64b435797d83dcb7c15ee42b",
          "64b4354a7d83dcb7c15ee42a",
        ],
      },
    },
  ];
  return (
    <div
      className="
      max-w-[1920px]
      w-full
      h-full
      mx-auto
      flex
      flex-row
      items-center
      justify-content
      pt-[7.5rem]
    "
    >
      <div
        className="
          h-full
          w-full
          md:w-1/2
          lg:w-7/12
          xl:w-[681px]
          2xl:w-[762px]
          xl:flex-none
          flex
          flex-col       
        "
      >
        {listings.map((listing: any) => {
          return (
            <div>
              <ListingCard data={listing} />
            </div>
          );
        })}
      </div>
      <div
        className="
          h-full 
          w-0
          md:w-1/2
          lg:w-5/12
          xl:w-full

          gap-8
           
          bg-blue-400"
      >
        Reserved for map
      </div>
    </div>
  );
}
