"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <CldUploadWidget
      onUpload={onUpload}
      uploadPreset="ftijcdwn"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              relative
              flex
              flex-col
              items-center
              gap-2
              justify-center
              cursor-pointer
              p-20
              border-dashed
              border-2
              text-neutral 600
              hover:text-neutral-400
              transition
            "
          >
            <TbPhotoPlus size={40} />
            <div className="font-light">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
