import React, { useState, useEffect, useRef, useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// import axios from "axios";
// import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { ApiContext } from "../ContextAPI";

const Home = () => {
  const { SliderIMG } =
  useContext(ApiContext);
  SliderIMG && console.log(SliderIMG)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null); // For swipe functionality
  // const [SliderIMG, setSliderIMG] = useState();
  const [loading, setLoading] = useState(true);
  const data = [
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
  // const fetchData = async () => {
  //   try {
  //     const res = await axios.get(
  //       "http://localhost:5000/api/auth/getSliderImages"
  //     );
  //     setSliderIMG(res.data.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
    SliderIMG &&  prevIndex === 0 ? SliderIMG.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      SliderIMG &&   prevIndex === SliderIMG.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Autoplay functionality with pause on hover
  useEffect(() => {
    // fetchData();
    // SliderIMG.length == 0 && setIsPaused(false)
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

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="flex   flex-col md:pt-[25vh] pt-[14vh] md:gap-6 justify-center w-full fit items-center  "
      onMouseEnter={() => setIsPaused(true)} // Pause on hover
      onMouseLeave={() => setIsPaused(false)} // Resume on leave
    >
      <div
        className="relative z-10  md:w-[70%] w-[90%] md:h-[65vh] h-[250px] tb:h-[400px]  md:bg-slate-900 overflow-hidden rounded-lg"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex w-full h-full  transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {SliderIMG && SliderIMG.length > 0 ? (
            SliderIMG.map((item, index) => (
              <div
                key={index}
                className="w-full  relative bg-gray-900  h-full flex-shrink-0"
              >
                <h1 className="absolute text-white text-lg bottom-[30%] font-semibold left-[10%]" 
                
                >
                  {item.title}
                </h1>    <h1 className="absolute text-white text-lg font-thin bottom-[20%] left-[10%]" 
                
                >
                  {item.description}
                </h1>
                <img
                  src={item.imgUrl}
                  alt={item.alt}
                  className="w-full h-full object-contain rounded-lg"
                />
                <h1>{}</h1>
                <h1></h1>
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
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {SliderIMG &&
            SliderIMG.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex
                    ? "bg-yellow-400 scale-110"
                    : "bg-gray-500"
                } transition-all duration-300`}
              ></button>
            ))}
        </div>
      </div>
<Link to={"/ld"} className="py-8"> </Link>
      <div className="w-[100%] h-fit md:gap-[10%] px-[5%] flex py-10 flex-wrap justify-center ">
        {data.map((data, index) => (
          <div className="md:w-[40%] w-[95%] md:h-[250px] h-fit mb-12 flex  flex-col gap-4 py-8  bg-slate-200 px-4 shadow-2xl shadow-[#1a1a36] ">
            <h1 className="md:font-bold font-semibold tracking-wide text-lg text-center ">
              {data.heading}
            </h1>
            <h1 className="font-thin  tracking-wide text-center  ">
              {data.body}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
