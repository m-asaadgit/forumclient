import React, { useMemo } from "react";

const AuthorityMap = () => {

  const renderedAuthorities = useMemo(() => {
    const authorytyData = [
        {
          img: "",
          authority: "            President Nakhuda Jamatul Muslimeen Murdeshwar",
          name: "MOULANA MOHAMMED IRSHAD TAMMU NADVI",
        },
        {
          img: "",
          authority:
            "           vice-President Nakhuda Jamatul Muslimeen Murdeshwar",
          name: "UMARA MOHAMMED HUSSAIN",
        },
        {
          img: "",
          authority: "            secretary Nakhuda Jamatul Muslimeen Murdeshwar",
          name: "Fathaullha Tammu",
        },
       
      ];
    console.log("autho")
    return authorytyData.map((items, index) => (
      <div
        key={index}
        className="w-[95%] md:w-[45%] mx-auto bg-slate-100 mb2 shadow-2xl shadow-gray-400 md:h-[200px] h-fit flex flex-col md:flex-row items-center justify-center"
      >
        <div className="w-[80%] mx-8 h-[90%] flex flex-col md:gap-4 gap-2 items-center justify-center md:pb-10 pb-2 my-[5%]">
          <h1 className="md:text-xl font-adam text-sm tb:text-lg text-[#1d2d44] text-center capitalize font-extralight">
            {items.authority}
          </h1>
          <h1 className="md:text-3xl uppercase text-xl tb:text-3xl text-center font-ub font-extrabold">
            {items.name}
          </h1>
        </div>
      </div>
    ));
  }, []);

  return (
    <div className="w-[100%] h-fit flex flex-col gap-6 pt-8 md:pt-0 px-[5%]">
      <header className="px-4 font-adam text-lg tb:text-4xl md:text-2xl font-bold flex flex-col items-center justify-center text-center">
        Esteemed Authorities of Nakhuda Jamatul Muslimeen
        <svg
          className="h-3 w-28 mt-2 tb:w-32"
          viewBox="0 0 120 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="-100,0 200,0 50,50"
            className="fill-current text-black"
          />
        </svg>
      </header>
      <div className="flex flex-col md:flex-row flex-wrap gap-6">
        {renderedAuthorities}
      </div>
    </div>
  );
};

export default React.memo(AuthorityMap);
