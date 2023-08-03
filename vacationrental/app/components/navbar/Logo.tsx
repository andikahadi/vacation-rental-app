"use client";

import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="text-neutral-800 text-2xl font-semibold cursor-pointer"
    >
      BALI HAVEN
    </div>
  );
};

export default Logo;
