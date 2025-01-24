
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDispatch, useSelector } from "react-redux";
import { fetchSliderIMG } from "../redux/Slice/SliderIMGSlice";
import AuthorityMap from "../components/AuthorityMap";
import VisionMap from "../components/VisionMap";
import Slider from "../components/Slider";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.sliderIMG);
  const [isPaused, setIsPaused] = useState(false);
  const [dot, setDot] = useState(null);

  // Fetch images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      await dispatch(fetchSliderIMG());
    };

    fetchImages();

    // Cleanup function
   
  }, [dispatch]);

  // Log data when it changes
  

  // GSAP animations
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
        <Slider data={data} setDot={setDot} />
      </div>

      <AuthorityMap />
      <VisionMap />
    </div>
  );
};

export default Home;
