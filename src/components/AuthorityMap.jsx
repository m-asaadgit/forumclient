// import React, { useMemo } from "react";

// const AuthorityMap = () => {

//   const renderedAuthorities = useMemo(() => {
//     const authorytyData = [
//         {
//           img: "",
//           authority: "            President Nakhuda Jamatul Muslimeen Murdeshwar",
//           name: "MOULANA MOHAMMED IRSHAD TAMMU NADVI",
//         },
//         {
//           img: "",
//           authority:
//             "           vice-President Nakhuda Jamatul Muslimeen Murdeshwar",
//           name: "UMARA MOHAMMED HUSSAIN",
//         },
//         {
//           img: "",
//           authority: "            secretary Nakhuda Jamatul Muslimeen Murdeshwar",
//           name: "Fathaullha Tammu",
//         },
       
//       ];
//     console.log("autho")
//     return authorytyData.map((items, index) => (
//       <div
//         key={index}
//         className="w-[95%] md:w-[45%] mx-auto bg-slate-100 mb2 shadow-2xl shadow-gray-400 md:h-[200px] h-fit flex flex-col md:flex-row items-center justify-center"
//       >
//         <div className="w-[80%] mx-8 h-[90%] flex flex-col md:gap-4 gap-2 items-center justify-center md:pb-10 pb-2 my-[5%]">
//           <h1 className="md:text-xl font-adam text-sm tb:text-lg text-[#1d2d44] text-center capitalize font-extralight">
//             {items.authority}
//           </h1>
//           <h1 className="md:text-3xl uppercase text-xl tb:text-3xl text-center font-ub font-extrabold">
//             {items.name}
//           </h1>
//         </div>
//       </div>
//     ));
//   }, []);

//   return (
//     <div className="w-[100%] h-fit flex flex-col gap-6 pt-8 md:pt-0 px-[5%]">
//       <header className="px-4 font-adam text-lg tb:text-4xl md:text-2xl font-bold flex flex-col items-center justify-center text-center">
//         Esteemed Authorities of Nakhuda Jamatul Muslimeen
//         <svg
//           className="h-3 w-28 mt-2 tb:w-32"
//           viewBox="0 0 120 50"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <polygon
//             points="-100,0 200,0 50,50"
//             className="fill-current text-black"
//           />
//         </svg>
//       </header>
//       <div className="flex flex-col md:flex-row flex-wrap gap-6">
//         {renderedAuthorities}
//       </div>
//     </div>
//   );
// };

// export default React.memo(AuthorityMap);
import React, { useMemo, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AuthorityMap = () => {
  useEffect(() => {
    // Select all cards using their class name
    gsap.utils.toArray(".authority-card").forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 50, // Start 50px below
        duration: 0.5,
        delay: index * 0.2, // Stagger animations
        scrollTrigger: {
          trigger: card,
          start: "top 100%", // Trigger animation when card enters viewport
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  const renderedAuthorities = useMemo(() => {
    const authorytyData = [
      {
        img: "",
        authority: "President Nakhuda Jamatul Muslimeen Murdeshwar",
        name: "MOULANA MOHAMMED IRSHAD TAMMU NADVI",
      },
      {
        img: "",
        authority: "Vice-President Nakhuda Jamatul Muslimeen Murdeshwar",
        name: "UMARA MOHAMMED HUSSAIN",
      },
      {
        img: "",
        authority: "Secretary Nakhuda Jamatul Muslimeen Murdeshwar",
        name: "Fathaullha Tammu",
      },
    ];
    return authorytyData.map((items, index) => (
      <div
        key={index}
        className="authority-card w-[95%] md:w-[45%] mx-auto bg-slate-100 mb-2 shadow-2xl shadow-gray-400 md:h-[200px] h-fit flex flex-col md:flex-row items-center justify-center"
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
