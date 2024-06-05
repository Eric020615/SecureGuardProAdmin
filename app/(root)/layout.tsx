import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full">
      <div className="md:px-10 md:py-8 p-5 items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
