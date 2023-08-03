"use client";

import Image from "next/image";

interface ListingImageProps {
  imageSrc: string;
}

const ListingImage: React.FC<ListingImageProps> = ({ imageSrc }) => {
  return (
    <div className="w-full aspect-video overflow-hidden relative">
      <Image
        alt="Image"
        src={imageSrc}
        layout="fill"
        objectFit="cover"
        className="object-cover w-full"
      />
    </div>
  );
};

export default ListingImage;
