/* eslint-disable react/prop-types */

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Slider({ data, setDot }) {
  // eslint-disable-next-line no-unused-vars
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      data && prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  }, [data]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      data && prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  }, [data]);

  // Autoplay effect

  // Swipe support for mobile
  const handleTouchStart = (e) => {
    if (data && data.length !== 0) {
      sliderRef.current.startX = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (data && data.length !== 0) {
      const deltaX = e.changedTouches[0].clientX - sliderRef.current.startX;
      if (deltaX > 50) goToPrevious();
      if (deltaX < -50) goToNext();
    }
  };

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    },
    [goToPrevious, goToNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const dots = useMemo(() => {
    return (
      <div className="absolute top-2 z-[200] left-0 right-0 flex justify-center space-x-2">
        {data &&
          data.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 md:w-3 md:h-3 h-2  rounded-full ${
                index === currentIndex
                  ? "bg-yellow-400 scale-110"
                  : "bg-gray-500"
              } transition-all duration-300`}
            ></button>
          ))}
      </div>
    );
  }, [data, currentIndex]);
  useEffect(() => {
    if (setDot) {
      setDot(dots); // Update the parent state only after rendering
    }
  }, [dots, setDot]); // Run this effect whenever 'dots' or 'setDot' changes
  
  const slides = useMemo(() => {
    return data && data.length > 0 ? (
      data.map((item, index) => (
        <div
          key={index}
          className="w-full relative bg-gray-900 h-full flex-shrink-0"
        >
          <img
            src={item.imgUrl}
            alt={item.alt}
            className="w-full h-full object-contain rounded-lg"
          />
          <div className="absolute left-4 px-4 bottom-4">
            <h1 className="bg-b/50 mb-2 w-fit font-semibold text-gray-200">
              {item.title}
            </h1>
            <h1 className="bg-b/50 text-justify text-sm text-gray-400">
              {item.description.slice(0, 130)}...
            </h1>
          </div>
        </div>
      ))
    ) : (
      <h1 className="w-fit mx-auto h-fit my-auto text-white">No slide Image</h1>
    );
  }, [data, dots]);

  return (
    <div
      className="relative z-10 md:w-[70%] w-[100%] md:h-[65vh] h-[260px] tb:h-[500px] slider md:bg-slate-900 overflow-hidden tb:rounded-lg"
      ref={sliderRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides}
      </div>
      {(currentIndex != 0 )  && (
        <button
          onClick={goToPrevious}
          className="absolute flex  top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full text-white hover:bg-gray-700"
        >
          <FaChevronLeft size={20} className=" hidden tb:flex" />
          <FaChevronLeft size={10} className="flex tb:hidden" />
        </button>
      )}{" "}
      {(currentIndex >= 0 && currentIndex != data.length - 1 ) && (
      <button
      onClick={goToNext}
      className="absolute flex top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full text-white hover:bg-gray-700"
    >
      <FaChevronRight size={20} className="hidden tb:flex" />
      <FaChevronRight size={10} className="flex tb:hidden" />
    </button>
      )}
     
    </div>
  );
}

export default React.memo(Slider);
