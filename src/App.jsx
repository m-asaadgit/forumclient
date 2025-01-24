
import Routers from "./Routers";
import  { useEffect, useState } from "react";
import NavBar from "../src/components/Navbar";
import ScrollToTop from "./utlis/ScrollToTop";
import Footer from "./components/Footer";
import logo from "../src/assets/logo.png";
import gsap from "gsap";
// import { gsap } from "gsap";
function App() {
  const [lander, setLander] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setLander(false);
      },
    });
    tl.to(".rotating-img", {
      rotationY: 720, // Horizontal rotation (X-axis)
      opacity: 1, // Fade out
      duration: 2, // 2 seconds duration
      ease: "power2.inOut", // Smooth easing
    });
    tl.from(".animate-text", {
      y: 100, // Start 100px below
      opacity: 0, // Fully transparent
      duration: 1, // Animation duration
      ease: "power2.out", // Smooth easing
    });
    tl.to(".scale-div", {
      scale: 2, // Start 100px below
      opacity: 0, // Fully transparent
      duration: 1, // Animation duration
      ease: "power2.out", // Smooth easing
    });
  }, []);
 
  if (lander)
    return (
      <div className="h-[100vh] w-full bg-slate-200">
        <div className="h-full  scale-100 bg-slate-200 pr-[3vw] optional-1 scale-div md:w-full w-[85%] mx-auto flex flex-col items-center justify-center">
          <img
            className="rotating-img md:w-[300px] opacity-0 mix-blend-darken bg-blend-lighten md:h-[200px] w-[250px] h-[500px] "
            src={logo}
            alt="Rotating"
          />
        
        </div>
      </div>
    );
  return (
    <div className="min-h-[100vh] relative md:pb-[20vh] tb:pb-[13vh] pb-[18vh] w-[100%]">
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