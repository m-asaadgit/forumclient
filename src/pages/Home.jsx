

/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDispatch, useSelector } from "react-redux";
import { fetchSliderImagesAsync } from "../redux/Slice/SliderIMGSlice";
import AuthorityMap from "../components/AuthorityMap";
import VisionMap from "../components/VisionMap";
import Slider from "../components/Slider";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {



  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.sliderIMG);
  const [isPaused, setIsPaused] = useState(false);
  const [dot, setDot] = useState(null);

  
  useEffect(() => {

    dispatch(fetchSliderImagesAsync()); // Fetch images on component mount
  }, [dispatch]);
  useEffect(() => {
    if(data){
      return
    }
    dispatch(fetchSliderImagesAsync()); // Fetch images on component mount
  },);

  
  useEffect(() => {

    const tl = gsap.timeline();

    tl.from(".slider", {
      opacity: 0,
      scale: 0.7,
      ease: "power2.out",
      duration: 0.5, // Adjust duration as needed
    });

    tl.from(".card", {
      opacity: 0,
      y: 50, // Start from below
      stagger: 0.2, // Stagger animation for each card
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);


  return (
    <div
      className="flex flex-col md:pt-[25vh] pt-[14vh] md:gap-6 justify-center w-full fit items-center"
      onMouseEnter={() => setIsPaused(true)} // Pause animations on hover
      onMouseLeave={() => setIsPaused(false)} // Resume animations on leave
    >
      <div className="relative flex flex-col md:gap-6 justify-center w-full fit items-center">
        {dot}
 {    data.length>1 ? <Slider data={data} setDot={setDot} /> : <div
          className=" relative tb:rounded-lg bg-gray-900 aminate-pulse md:w-[70%] animate-pulse w-[100%] md:h-[65vh] h-[260px] tb:h-[500px] flex items-center justify-center  flex-shrink-0"
        >
          <div  className="w-[73%] h-[99%] bg-[#1b263b]  animate-pulse object-contain "  ></div>
          
          <div className="absolute left-4 px-4 bottom-4">
            <h1 className="bg-b/50 mb-2 w-fit font-semibold text-sm text-gray-200">
              {/* {item.title} */}
            </h1>
            <h1 className="bg-b/50 md:flex hidden text-justify text-sm text-gray-400">
              {/* {item.description.slice(0, 430)}... */}
            </h1>
            <h1 className="bg-b/50 md:hidden flex text-justify text-sm text-gray-400">
              {/* {item.description.slice(0, 130)}... */}
            </h1>
          </div>
        </div>
 } 
    </div>

      <AuthorityMap />
      <VisionMap />
    </div>
  );
};

export default Home;
