"use client";

import { IconType } from "react-icons";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        w-full
        border-[1px]
        transition
        ${outline ? "bg-white" : "bg-yellow-400"}
        ${outline ? "border-neutral-400" : "border-none"}
        ${outline ? "hover:border-neutral-600" : "hover:bg-yellow-300"}
        ${outline ? "text-left" : "text-center"}
        ${outline ? "normal-case" : "uppercase"}
        ${small ? "py-3" : "py-4"}
        ${small ? "rounded-3xl" : "rounded-none"}
        ${small ? "w-[150px]" : "w-full"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "mx-auto" : "px-14"}
        ${small ? "font-light" : "font-semibold"}
      `}
    >
      {Icon && (
        <>
          <Icon
            size={24}
            className="
            absolute
            left-4
            top-3
          "
          />
          <LiaLongArrowAltRightSolid
            size={25}
            className="
              absolute
              right-4
              top-3
            "
          />
        </>
      )}
      {label}
    </button>
  );
};

export default Button;
