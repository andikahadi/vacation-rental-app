import "./globals.css";
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modal/RegisterModal";
import { Toaster } from "react-hot-toast";
import LoginModal from "./components/modal/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import UserSidebar from "./components/sidebar/UserSidebar";
import FiltersModal from "./components/modal/FiltersModal";
import RentModal from "./components/modal/RentModal";
import SearchModal from "./components/modal/SearchModal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BaliHaven",
  description: "Bali Vacation Home Rental App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Toaster />
        <RegisterModal />
        <LoginModal />
        <FiltersModal />
        <RentModal />
        <SearchModal />
        <UserSidebar />
        <Navbar currentUser={currentUser} />
        <div className="pt-[7.5rem]">{children}</div>
      </body>
    </html>
  );
}
