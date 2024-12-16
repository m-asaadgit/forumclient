import React from "react";

function Footer() {
  return (
    <footer className="bg-[#101028] relative  text-sm md:text-xl text-gray-400 text-center py-4">
      <div className="h-fit w-full font-adam text-[#ffffff] flex-col text-2xl pb-2  px-6 flex items-center ">
          <h1 className="h-fit  ">N S F</h1> 
          <h1 className="text-sm font-medium  tracking-wider  h-fit">murdeshwar</h1>
      </div>
      <p>
        &copy; {new Date().getFullYear()} Nakhuda Student Forum. All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
