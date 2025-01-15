import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import gsap from "gsap";
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
  useEffect(() => {
    // GSAP animation for the navbar
    gsap.from(".navbar", {
      y: -100, // Start position 100px above
      opacity: 0, // Fully transparent
      duration: 1, // Animation duration
      ease: "power2.out", // Smooth easing
    });
  }, []);
  return (
<div className="flex  navbar top-0 md:h-[20vh] h-[10vh] fixed z-[1000] w-full bg-gradient-to-b from-white to-slate-300 items-center justify-between px-4 tb:px-16 md:px-0 md:shadow-slate-400 shadow-gray-500 shadow-md">


      <div className=" md:hidden flex gap-2 items-center font-bold w-[130px] h-[80px] pl-[20px] text-b">
        <img src={logo} className="w-full h-full" alt="" />
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

      <div className="md:flex   hidden  w-full px-10  gap-[5%] h-[90%]   ">
        <div className=" gap-2 items-center font-bold w-[150px] h-full  mb-[10vh]   pl-[20px] text-b">
          <img src={logo} className="w-full  h-full" alt="" />
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
      {/* <h1 className="px-5 md:flex absolute bottom-0 w-full tb:hidden hidden font-thin text-white  bg-[#101028]   tracking-wide text-xl">
        {path}
      </h1> */}
    </div>
  );
}

export default Nav;
