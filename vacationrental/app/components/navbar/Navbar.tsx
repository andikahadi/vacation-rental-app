"use client";

import { User } from "@prisma/client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="bg-white fixed z-10 w-full">
      <div className="py-5">
        <Container>
          <div className="flex flex-row items-center justify-between">
            <Logo />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <div className="pt-5 bg-yellow-400 h-10">
        <Container>
          <div className="flex flex-row items-center">
            <Search />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
