"use client";

import { IconType } from "react-icons";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        w-full
        py-4
        px-14
        text-sm
        border-[1px]
        transition
        ${outline ? "bg-white" : "bg-yellow-400"}
        ${outline ? "border-neutral-400" : "border-none"}
        ${outline ? "hover:border-neutral-600" : "hover:bg-yellow-300"}
        ${outline ? "text-left" : "text-center"}
        ${outline ? "normal-case" : "uppercase"}
      `}
    >
      {Icon && (
        <>
          <Icon
            size={24}
            className="
            absolute
            left-4
            top-4
          "
          />
          <LiaLongArrowAltRightSolid
            size={25}
            className="
              absolute
              right-4
              top-4
            "
          />
        </>
      )}
      {label}
    </button>
  );
};

export default Button;
