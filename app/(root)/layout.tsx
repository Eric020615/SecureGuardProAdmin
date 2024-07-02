import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <main className="w-full">
      <Navbar />
      <div className="flex">
        <div className="hidden md:block h-[110vh] w-[350px]">
          <Sidebar />
        </div>
        <div className="w-full md:px-10 md:py-8 p-5 items-center justify-center">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
