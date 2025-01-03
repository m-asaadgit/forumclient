import  { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineCastForEducation } from "react-icons/md";
function Nav() {
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
    <div className="flex  top-0  md:h-[20vh] h-[10vh] fixed z-[1000] bg-[#dadae2]/70 w-full   items-center justify-between px-4 tb:px-16 md:px-0  md:shadow-black shadow-gray-500 shadow-md ">
      <div className=" md:hidden flex gap-2 items-center font-bold text-2xl tb:text-6xl  text-b">
        N S F <MdOutlineCastForEducation></MdOutlineCastForEducation>
      </div>
      {/* <div className="md:hidden absolute top-4 right-8 ">
        {
          openMenu ? <RxDropdownMenu size={30}></RxDropdownMenu> : <RxDropupMenu size={30}></RxDropupMenu>
        }
      </div> */}
      <div
        className="menu-icon md:hidden flex  tb:gap-3 tcursor-pointer  flex-col gap-1.5"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span
          className={`block w-8 h-1 tb:h-2 tb:w-12 bg-b transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-3" : ""
          }`}
        ></span>
        <span
          className={`block w-8 h-1 tb:h-2 tb:w-12 bg-b transition-opacity duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-8 h-1 tb:h-2 tb:w-12 bg-b transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </div>
      {isOpen && (
        <div className=" md:hidden  flex items-center  absolute top-[10vh] pl-4 right-0 w-[100%] text-center h-fit py-2 pb-4 bg-b flex-col gap-3 ">
          {[
            { to: "/", label: "Home" },
            { to: "/fill-form", icon: ``, label: "Fill Your Profile" },
            { to: "/member-info", icon: ``, label: "Member Info" },
            { to: "/login", icon: ``, label: "Administrator Sign In" },
            { to: "/contact", icon: ``, label: "Contact Us" },
          ].map((link, index) => (
            <Link
              key={index}
              to={link.to}
              onClick={() => setIsOpen((prev) => !prev)}
              className=" shadow-sm shadow-[#14213d] bg-b px-2 py-1 border-white w-fit text-white font-adam font-thin  text-sm "
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <div className="md:flex   hidden  w-full px-10 pb-4 gap-[5%] h-[90%] bg-gradient-to-r bg-[#dadae2]  ">
        <div className="w-[35%] font-extrabold text-5xl gap-4  tracking-wider flex items-center justify-center text-gray-900   h-[90%]  my-auto">
          N S F <MdOutlineCastForEducation className="mt-1"></MdOutlineCastForEducation>
        </div>






        <ul className="w-[80%] flex h-[90%] my-auto justify-end items-center gap-[3%]">
          {[
            { to: "/", label: "Home" },
            { to: "/fill-form", label: "Fill Your Profile" },
            { to: "/member-info", label: "Member Info" },
            { to: "/login", label: "Administrator Sign In" },
            { to: "/contact", label: "Contact Us" },
          ].map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="bg-[#101028] text-white hover:bg-white hover:text-[#101028] font-thin text-xl h-fit px-2 py-1 rounded-sm hover:scale-105 transition-all hover:shadow-2xl hover:-translate-y-1 duration-400 hover:shadow-[#101028]"
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </div>
      <h1 className="px-5 md:flex absolute bottom-0 w-full tb:hidden hidden font-thin text-white  bg-[#101028]   tracking-wide text-xl">
        {path}
      </h1>
    </div>
  );
}

export default Nav;
