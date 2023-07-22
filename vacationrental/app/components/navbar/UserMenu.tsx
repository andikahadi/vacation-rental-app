import { CiMenuFries } from "react-icons/ci";
import Avatar from "./Avatar";

const UserMenu = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <div className="py-2 px-4 rounded-full hover:bg-neutral-100 transition">
        Rent your home
      </div>
      <div
        className="
          flex 
          flex-row 
          items-center 
          rounded-full 
          border
          py-1
          px-2
          gap-2 
          hover:shadow-md
          transition"
      >
        <CiMenuFries size={30} />
        <Avatar />
      </div>
    </div>
  );
};

export default UserMenu;
