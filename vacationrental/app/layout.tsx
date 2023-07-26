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
        <UserSidebar />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
