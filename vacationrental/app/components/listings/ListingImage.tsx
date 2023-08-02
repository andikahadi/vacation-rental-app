"use client";

import Image from "next/image";

interface ListingImageProps {
  imageSrc: string;
}

const ListingImage: React.FC<ListingImageProps> = ({ imageSrc }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <Image
        alt="Image"
        src={imageSrc}
        width={500}
        height={500}
        className="object-cover w-full"
      />
    </div>
  );
};

export default ListingImage;
