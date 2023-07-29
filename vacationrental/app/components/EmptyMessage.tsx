"use client";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Heading from "./Heading";

interface EmptyMessageProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyMessage: React.FC<EmptyMessageProps> = ({
  title = "Unfortunately, there are no results in your destination, our homes are fully booked",
  subtitle = "If your heart is not set, can we tempt you with a different city in bali?",
  showReset = true,
}) => {
  const router = useRouter();

  return (
    <div
      className="
        flex
        flex-col
        gap-2
        justify-center
        
        border-[1px]
        shadow-lg
        mt-16
        mx-6
        p-6
      "
    >
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-lg font-light">{subtitle}</div>
      <div className="w-48 mt4 mx-auto flex flex-col items-center justify-center">
        {showReset && (
          <Button
            small
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyMessage;
