"use client";

import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  disabled?: boolean;
  title?: string;
  body: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onSubmit = () => {},
  disabled,
  title,
  body,
  footer,
  actionLabel,
}) => {
  const [showSidebar, setShowSidebar] = useState(isOpen);

  useEffect(() => {
    setShowSidebar(isOpen);
  }, [isOpen]);

  const handleSubmit = () => {
    if (disabled) {
      return null;
    }

    onSubmit();
  };

  const handleClose = () => {
    if (disabled) {
      return null;
    }

    setShowSidebar(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`
        flex
        flex-row
        justify-end
        gap-2
        bg-neutral-800/40
        fixed
        inset-0
        z-50
        translate
        duration-300
        ${showSidebar ? "opacity-100" : "opacity-0"}
      `}
    >
      <div
        className="
          w-[400px]
          h-full
          relative
        "
      >
        {/* Content*/}
        <div
          className={`
            translate
            duration-300
            h-full
            ${showSidebar ? "translate-x-0" : "translate-x-full"}
            `}
        >
          <div
            className="
              bg-white
              h-full
              flex
              flex-col
            "
          >
            {/* Header */}
            <div
              className="
                flex
                flex-row
                items-center
                justify-center
                px-7
                py-5
                border-b-[1px]
              "
            >
              {title}
              <button
                onClick={handleClose}
                className="
                  absolute
                  left-7
                  top-4
                  hover:opacity-70
                  transition
                "
              >
                <IoMdClose size={25} />
              </button>
            </div>
            {/* Body */}
            <div className="px-8 ">{body}</div>
            {/* Footer */}
            <div
              className="
                px-8
              "
            >
              {footer}
              {actionLabel && onSubmit && (
                <div
                  className="
                    flex
                    flex-row
                    justify-end
                    items-center
                  "
                >
                  <Button small onClick={onSubmit} label={actionLabel} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
