import React, { useState, useEffect, useRef, useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuGoal } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
import { ApiContext } from "../ContextAPI";
import { Timeline } from "gsap/gsap-core";

const Home = () => {
  const { SliderIMG } = useContext(ApiContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null); // For swipe functionality
  // const [SliderIMG, setSliderIMG] = useState();
  const [loading, setLoading] = useState(false);
  const authorytyData = [
    {
      img: "",
      authority: "            President Nakhuda Jamatul Muslimeen Murdeshwar",
      name: " Mr.Gori Mohammed Meera",
    },
    {
      img: "",
      authority: "            secretary Nakhuda Jamatul Muslimeen Murdeshwar",
      name: "Mr. Shamshuddin Umara",
    },
    {
      img: "",
      name: "Mr.Gori Mohammed Meera",
      authority: "Murdeshwar Nakhuda Committee U.A.E",
    },
  ];
  const visionData = [
    {
      heading: "Foster Unity Within the Community",
      body: "Join us in fostering unity within our community through our community service programs. Engage with your neighbors, support local businesses, and learn about community development.",
    },
    {
      heading: "Promote Upliftment and Empowerment",

      body: "Highlight inspiring stories and achievements to motivate and uplift others in the community.",
    },
    {
      heading: "Encourage Cooperation and Collaboration",
      body: "Build a cooperative environment where members work together to solve problems and achieve collective objectives.",
    },
    {
      heading: "Facilitate Community Engagement and Inclusivity",
      body: "Engage members in meaningful discussions that strengthen relationships and broaden perspectives.",
    },
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      SliderIMG && prevIndex === 0 ? SliderIMG.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      SliderIMG && prevIndex === SliderIMG.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (isPaused) return; // Stop autoplay if paused
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  // Swipe support for mobile
  const handleTouchStart = (e) => {
    if (SliderIMG && SliderIMG.length != 0) {
      sliderRef.current.startX = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (SliderIMG && SliderIMG.length != 0) {
      const deltaX = e.changedTouches[0].clientX - sliderRef.current.startX;
      if (deltaX > 50) goToPrevious();
      if (deltaX < -50) goToNext();
    }
  };

  useEffect(() => {
    // Timeline for animations
    const tl = gsap.timeline();

    // Animation for the .slider (triggered immediately on page load)
    tl.from(".slider", {
      opacity: 0,
      scale: 0.7,
      ease: "power2.out",
      duration: 0.5, // Adjust duration as needed
    });

    // Animation for the .card items (triggered on scroll)
    tl.from(".card", {
      opacity: 0,
      y: 50, // Start from below
      stagger: 0.2, // Stagger animation for each card
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);
  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // if(loading) return <Loader></Loader>
  return (
    <div
      className="flex   flex-col md:pt-[25vh] pt-[14vh] md:gap-6 justify-center w-full fit items-center  "
      onMouseEnter={() => setIsPaused(true)} // Pause on hover
      onMouseLeave={() => setIsPaused(false)} // Resume on leave
    >
      <div
        className="relative z-10  md:w-[70%] w-[100%] md:h-[65vh] h-[260px]  tb:h-[400px] slider  md:bg-slate-900 overflow-hidden tb:rounded-lg"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex w-full h-full   transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {SliderIMG && SliderIMG.length > 0 ? (
            SliderIMG.map((item, index) => (
              <div
                key={index}
                className="w-full  relative bg-gray-900  h-full flex-shrink-0"
              >
                <div className="absolute top-2 left-0 right-0 flex justify-center space-x-2">
                  {SliderIMG &&
                    SliderIMG.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 md:w-3 md:h-3 h-2 rounded-full ${
                          index === currentIndex
                            ? "bg-yellow-400 scale-110"
                            : "bg-gray-500"
                        } transition-all duration-300`}
                      ></button>
                    ))}
                </div>
                <img
                  src={item.imgUrl}
                  alt={item.alt}
                  className="w-full h-full object-contain rounded-lg"
                />
                <div className="absolute  left-4  px-4 bottom-4 ">
                  <h1 className=" bg-b/50 mb-2 w-fit font-semibold text-gray-200">
                    {item.title}
                  </h1>
                  <h1 className=" bg-b/50 left-4  text-justify text-sm text-gray-400">
                    {" "}
                    {item.description.slice(0, 130)}...
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <h1 className="w-fit mx-auto h-fit my-auto text-white ">
              No slide Image{" "}
            </h1>
          )}
        </div>
        <button
          onClick={goToPrevious}
          className="absolute hidden md:flex top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full text-white hover:bg-gray-700"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={goToNext}
          className="absolute hidden md:flex top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full text-white hover:bg-gray-700"
        >
          <FaChevronRight size={20} />
        </button>{" "}
        <button
          onClick={goToPrevious}
          className="absolute  md:hidden top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full text-white hover:bg-gray-700"
        >
          <FaChevronLeft size={10} />
        </button>
        <button
          onClick={goToNext}
          className="absolute md:hidden top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full text-white hover:bg-gray-700"
        >
          <FaChevronRight size={10} />
        </button>
      </div>
      {/* <Link to={"/ld"} className="py-8">
        {" "}
      </Link> */}
      <div className="w-[100%] h-fit md:pt-[25vh]  flex flex-col gap-6 pt-8 px-[5%]  ">
        <header className="px-4 font-adam text-lg font-bold flex flex-col items-center justify-center text-center">
          Esteemed Authorities of Nakhuda Jamatul Muslimeen
          <svg
            className="h-2 w-28"
            viewBox="0 0 120 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="-80,0 180,0 50,50"
              className="fill-current text-black"
            />
          </svg>
        </header>
        {authorytyData.map((items, index) => (
          <div
            key={index}
            className="w-[95%] mx-auto bg-slate-100 mb2 shadow-2xl shadow-gray-400 md:h-[400px] h-fit flex flex-col md:flex-row items-center justify-center "
          >
            <div className="md:w-[50%] w-[80%] mx-8 h-[90%] flex flex-col md:gap-4 gap-2 items-center justify-center md:pb-10 pb-2 my-[5%] ">
              <h1 className="md:text-xl text-sm text-[#1d2d44] text-center capitalize font-adam font-extralight">
                {items.authority}{" "}
              </h1>
              <h1 className="md:text-3xl text-xl text-center font-ub font-extrabold">{items.name}</h1>
            </div>
          </div>
        ))}
      </div>
      <header className="mt-10  w-fit pb-4 font-semibold gap-0 items-center  text-2xl tracking-wider  font-adam ">
        <h1 className="flex items-center pb-[1px] ">
          Vision <LuGoal className="font-bold py-[1px] "></LuGoal>
        </h1>
        <svg
          className="h-2 w-28"
          viewBox="0 0 120 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="-40,0 140,0 50,50"
            className="fill-current text-black"
          />
        </svg>
      </header>
      <div className="card-container w-[100%] h-fit md:gap-[10%] px-[5%] flex flex-wrap justify-center">
        {visionData.map((item, index) => (
          <div
            key={index}
            className="card md:w-[40%] w-[95%] md:h-[250px] h-fit mb-4 flex flex-col gap-4 py-8 bg-slate-100 px-4 shadow-xl shadow-gray-400"
          >
            <h1 className="md:font-bold  font-semibold tracking-wide text-md font-adam text-center">
              {item.heading}
            </h1>
            <h1 className="font-extralight font-ub text-gray-700 text-center">
              {item.body}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
