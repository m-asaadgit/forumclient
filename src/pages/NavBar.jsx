import React from "react";
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation();
  let path = location.pathname.startsWith("/")
    ? location.pathname.slice(1)
    : location.pathname;

  // If the path is empty, assign 'home' to it
  if (path === "") {
    path = "home";
  }
  return (
    <div className="flex fixed z-50  min-h-[20vh]   w-full  flex-col py-14 my-10 shadow-black shadow-sm bg-slate-300">
      {/* <div className="w-full px-10  flex gap-[5%] h-[90%] bg-slate-200  ">
        <div className="w-[25%] font-extrabold text-7xl tracking-widest flex items-center justify-center text-slate-900   h-[90%]  my-auto">
          NFM
        </div>
        <ul className=" w-[70%] flex h-[90%] my-auto justify-end items-center gap-[3%]">
          <Link
            to={"/"}
            className="bg-slate-900 text-white hover:bg-white hover:text-slate-900 font-thin text-xl h-fit px-2 py-1 rounded-sm hover:scale-105 transition-all duration-200  "
          >
            {" "}
            Home
          </Link>
          <Link className="bg-slate-900 text-white hover:bg-white hover:text-slate-900 font-thin text-xl h-fit px-2 py-1 rounded-sm hover:scale-105 transition-all duration-200  ">
            About Us
          </Link>
          <Link className="bg-slate-900 text-white hover:bg-white hover:text-slate-900 font-thin text-xl h-fit px-2 py-1 rounded-sm hover:scale-105 transition-all duration-200 ">
            Activities
          </Link>
          <Link
            to={"/member-info"}
            className="bg-slate-900 text-white hover:bg-white hover:text-slate-900 font-thin text-xl h-fit px-2 py-1 rounded-sm hover:scale-105 transition-all duration-200 "
          >
            Member info
          </Link>
          <Link
            to="/login"
            className="bg-slate-900 text-white hover:bg-white hover:text-slate-900 font-thin text-xl h-fit px-2 py-1 rounded-sm hover:scale-105 transition-all duration-200 "
          >
            Administrator Sign In
          </Link>
          <Link className="bg-slate-900 text-white hover:bg-white hover:text-slate-900 font-thin text-xl h-fit px-2 py-1 rounded-sm hover:scale-105 transition-all duration-200 ">
            Contact Us
          </Link>
        </ul>
      </div>
      <h1 className="px-5 text-white bg-slate-900  font-light tracking-wide text-xl">
        {path}
      </h1> */}
    </div>
  );
}

export default Nav;
