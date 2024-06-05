import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Secure Guard Pro",
  description: "Admin Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-inter antialiased", inter.variable)}>
        <Navbar/>
        <div className="flex">
          <div className="hidden md:block h-[100vh] w-[350px]">
            <Sidebar/> 
          </div>
          <div className="w-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
