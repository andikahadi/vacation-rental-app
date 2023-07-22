import "./globals.css";
import type { Metadata } from "next";
import { Inter, Nunito, Roboto } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modal/Modal";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BaliHaven",
  description: "Bali Vacation Home Rental App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Modal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
