"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../components/Button";

interface SeedsClientSideProps {
  currentUser: User | null;
}

const SeedsClientSide: React.FC<SeedsClientSideProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const dataArr = [
    {
      title: "A Tropical Paradise",
      description:
        "This charming three-bedroom villa is situated in the popular holiday destination of Seminyak, Bali. Ideal for families or groups of friends seeking a relaxing vacation, each bedroom features a private bathroom for maximum privacy. A beautiful private pool surrounded by lush gardens offers stunning views of the surrounding landscape. The interior is comfortable and air-conditioned, with Wi-Fi available throughout the property. High-quality bedding ensures a restful sleep, and the kitchen is fully equipped for those who wish to cook together during their stay. Please note that parties and loud music are strictly prohibited to avoid disturbing neighbors and residents. While small animals such as lizards, geckos, ants, and mosquitoes may be present due to Bali's biodiversity, the villa is regularly cleaned and treated to control mosquitoes. Mosquito spray and electric repellents are provided for guests' convenience.",
      imageSrc1:
        "https://res.cloudinary.com/dyoiohdev/image/upload/v1691309099/ptteldn5ej3kb1fp1azg.avif",
      imageSrc2:
        "https://res.cloudinary.com/dyoiohdev/image/upload/v1691309109/gvx0wb0sxco14ysmeh32.avif",
      category: "Beach",
      roomCount: 3,
      bathroomCount: 3,
      guestCount: 7,
      location: {
        label: "Kuta",
        region: "South Bali",
        latlng: [-8.739184, 115.171127],
      },
      price: "254",
      address: [-8.6831, 115.1734],
    },
    {
      title: "Floating in the Lotus",
      description:
        "The stylish traditional Mediterranean architecture of this tropical villa is perfect for a luxurious and peaceful getaway in Bali. Located in Umalas, one of the most desired neighborhoods, this villa is surrounded by trendy restaurants, shops, and nightlife. The villa features spacious open-air spaces with air conditioning and fans for utmost relaxation. Guests are sure to enjoy the cozy couches while reading a book or visiting with friends and family. The open-air living and dining room overlooks a beautiful pool and rice field view. Modern kitchen amenities are provided for those who choose to dine in. A friendly and professional staff is available to take care of guests' needs during their stay. Optional services include a chef, babysitter, in-villa massage, yoga sessions, tours and activities, and scooter rental. Berawa Beach and the famous Beach Club Finns are only eight minutes away from the villa. Please note that pets are not allowed on the premises without approval from management board, and date alteration is not allowed.",
      imageSrc1:
        "https://res.cloudinary.com/dyoiohdev/image/upload/v1691392053/abrgfw1o8n0mghh3fkkh.avif",
      imageSrc2:
        "https://res.cloudinary.com/dyoiohdev/image/upload/v1691392062/ipfmuzncpt33ugtdp2n8.avif",
      category: "Village",
      roomCount: 4,
      bathroomCount: 4,
      guestCount: 10,
      location: {
        label: "Canggu",
        region: "South Bali",
        latlng: [-8.6478, 115.1385],
      },
      price: "758",
      address: [-8.64743998211, 115.150090034655],
    },
  ];

  const onSubmit = () => {
    setIsLoading(true);

    dataArr.forEach((data) => {
      axios
        .post("api/listings", data)
        .then(() => {
          toast.success("Listing Created!");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  return (
    <div className="pt-20 px-6 flex flex-col items-center justify-center">
      <Button label={"Generate data"} onClick={onSubmit} />
    </div>
  );
};

export default SeedsClientSide;
