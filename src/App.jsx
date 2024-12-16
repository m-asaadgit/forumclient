import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Routers from "./Routers";
import NavBar from "../src/components/Navbar";
import ScrollToTop from "./utlis/ScrollToTop";
import Footer from "./components/Footer";
import logo from "../src/assets/logo.jpg";
import { gsap } from "gsap";
function App() {
  // const {addSliderImage}=useContext(ContextAPI)
  const [lander, setLander] = useState(false);

  const location = useLocation();
  let path = location.pathname.startsWith("/")
    ? location.pathname.slice(1)
    : location.pathname;

  if (path === "") {
    path = "home";
  }
  // useEffect(() => {
  //   const tl = gsap.timeline({
  //     onComplete: () => {
  //       // setTimeout(() => {
  //       setLander(false);
  //       // }, 500);
  //     },
  //   });
  //   tl.to(".rotating-img", {
  //     rotationY: 720, // Horizontal rotation (X-axis)
  //     opacity: 1, // Fade out
  //     duration: 2, // 2 seconds duration
  //     ease: "power2.inOut", // Smooth easing
  //   });
  //   tl.from(".animate-text", {
  //     y: 100, // Start 100px below
  //     opacity: 0, // Fully transparent
  //     duration: 1, // Animation duration
  //     ease: "power2.out", // Smooth easing
  //   });
  //   tl.to(".scale-div", {
  //     scale: 2, // Start 100px below
  //     opacity: 0, // Fully transparent
  //     duration: 1, // Animation duration
  //     ease: "power2.out", // Smooth easing
  //   });
  // }, []);

  if (lander)
    return (
      <div className="h-[100vh] w-full bg-slate-200">
        <div className="h-full  scale-100 bg-slate-200  optional-1 scale-div md:w-full w-[85%] mx-auto flex flex-col items-center justify-center">
          <img
            className="rotating-img md:w-[300px] opacity-0 mix-blend-darken bg-blend-lighten md:h-[200px] w-[250px] h-[150px] "
            src={logo}
            alt="Rotating"
          />
          <div className="md:text-3xl my-2 overflow-hidden font-bold">
            <h1 className="animate-text relative tracking-wide">
              Nakhuda Student Forum
            </h1>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-[100vh] relative pb-[20vh] w-[100%]">
      <ScrollToTop />

      <NavBar />
      <Routers></Routers>
      <div className="absolute bottom-0 w-full">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
