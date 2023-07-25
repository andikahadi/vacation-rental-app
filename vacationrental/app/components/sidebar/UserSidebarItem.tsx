"use client";

interface UserSidebarItemProps {
  onClick: () => void;
  label: string;
}

const UserSidebarItem: React.FC<UserSidebarItemProps> = ({
  onClick,
  label,
}) => {
  return (
    <div
      onClick={onClick}
      className="
          group
          transition
          text-lg
          cursor-pointer
          self-start
          font-light
        "
    >
      {label}
      <span className="block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-yellow-400"></span>
    </div>
  );
};

export default UserSidebarItem;
