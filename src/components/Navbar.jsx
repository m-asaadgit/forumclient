import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxDropdownMenu } from "react-icons/rx";
import { MdOutlineCastForEducation } from "react-icons/md";

function Nav() {
  const [openMenu, setOpenMenu] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  let path = location.pathname.startsWith("/")
    ? location.pathname.slice(1)
    : location.pathname;

  // If the path is empty, assign 'home' to it
  if (path === "") {
    path = "home";
  }
  return (
    <div className="flex  top-0  md:h-[20vh] h-[10vh] fixed z-50 bg-[#dadae2]/70 w-full  flex-col items-stretch  md:shadow-black shadow-gray-500 shadow-md ">
      <div className="absolute md:hidden flex gap-2 items-center top-4 left-6 font-bold text-2xl text-b">
        N S F <MdOutlineCastForEducation></MdOutlineCastForEducation>
      </div>
      {/* <div className="md:hidden absolute top-4 right-8 ">
        {
          openMenu ? <RxDropdownMenu size={30}></RxDropdownMenu> : <RxDropupMenu size={30}></RxDropupMenu>
        }
      </div> */}
      <div
        className="menu-icon md:hidden flex absolute top-4 right-8 cursor-pointer  flex-col gap-1.5"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span
          className={`block w-8 h-1 bg-b transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-3" : ""
          }`}
        ></span>
        <span
          className={`block w-8 h-1 bg-b transition-opacity duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-8 h-1 bg-b transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </div>
      {isOpen && (
        <div className=" md:hidden  flex items-center absolute top-[10vh] w-full h-fit py-2 bg-white/90 flex-col gap-2 ">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About Us" },
            { to: "/fill-form", label: "Fill Your Profile" },
            { to: "/member-info", label: "Member Info" },
            { to: "/login", label: "Administrator Sign In" },
            { to: "/contact", label: "Contact Us" },
          ].map((link, index) => (
            <Link
              key={index}
              to={link.to}
              onClick={() => setIsOpen((prev) => !prev)}

              className="border-b-[1px]  text-sm border-gray-700"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}









      <div className="md:flex  hidden  w-full px-10  gap-[5%] h-[90%] bg-gradient-to-r bg-[#dadae2]  ">
        <div className="w-[25%] font-extrabold text-7xl tracking-wider flex items-center justify-center text-gray-900   h-[90%]  my-auto">
          N S F  <MdOutlineCastForEducation></MdOutlineCastForEducation>
        </div>
        <ul className="w-[80%] flex h-[90%] my-auto justify-end items-center gap-[3%]">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About Us" },
            { to: "/fill-form", label: "Fill Your Profile" },
            { to: "/member-info", label: "Member Info" },
            { to: "/login", label: "Administrator Sign In" },
            { to: "/contact", label: "Contact Us" },
          ].map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="bg-[#101028] text-white hover:bg-white hover:text-[#101028] font-thin text-xl h-fit px-2 py-1 rounded-sm hover:scale-105 transition-all hover:shadow-2xl hover:shadow-[#101028]"
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </div>
      <h1 className="px-5 md:flex tb:hidden hidden  text-white  bg-[#101028]  font-light tracking-wide text-xl">
        {path}
      </h1>
    </div>
  );
}

export default Nav;
