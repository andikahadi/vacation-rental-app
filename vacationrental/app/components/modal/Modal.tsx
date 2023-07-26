"use client";

import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    if (disabled) {
      return null;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleSubmit = () => {
    if (disabled) {
      return null;
    }

    onSubmit();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        bg-neutral-800/40
        fixed
        z-50
        inset-0
        flex
        items-center
        justify-center
        overflow-y-auto
      "
    >
      <div
        className="
          w-full
          md:w-[500px]
          h-full
          md:h-auto
        "
      >
        {/*Content*/}
        <div
          className={`
            relative
            bg-white
            rounded-none
            md:rounded-3xl
            px-14
            py-11
            h-full
            translate
            duration-200
            ${showModal ? "translate-y-0" : "translate-y-1/3"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
        >
          <div
            className="
              flex 
              flex-col 
              w-full
              h-full
              gap-5    
            "
          >
            {/* Header */}
            <div className=" flex flex-row items-center justify-start">
              <div className="font-semibold text-2xl">{title}</div>
              <button
                onClick={handleClose}
                className="
                    p-1
                    border-0
                    hover:opacity-70
                    transition
                    absolute
                    right-6
                    top-6
                  "
              >
                <IoMdClose size={25} />
              </button>
            </div>
            {/* Body */}
            <div className="flex">{body}</div>
            {/* Footer */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-3">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    onClick={secondaryAction}
                    disabled={disabled}
                    label={secondaryActionLabel}
                  />
                )}
                <Button
                  onClick={handleSubmit}
                  disabled={disabled}
                  label={actionLabel}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
