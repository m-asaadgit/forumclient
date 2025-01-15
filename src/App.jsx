// import  { useEffect, useState } from "react";
// import Routers from "./Routers";
// import NavBar from "../src/components/Navbar";
// import ScrollToTop from "./utlis/ScrollToTop";
// import Footer from "./components/Footer";
// import logo from "../src/assets/logo.png";
// import gsap from "gsap";
// // import { gsap } from "gsap";
// function App() {
//   // const {addSliderImage}=useContext(ContextAPI)
//   const [lander, setLander] = useState(true);

//   // const location = useLocation();
//   // let path = location.pathname.startsWith("/")
//   //   ? location.pathname.slice(1)
//   //   : location.pathname;

//   // if (path === "") {
//   //   path = "home";
//   // }
//   useEffect(() => {
//     const tl = gsap.timeline({
//       onComplete: () => {
//         // setTimeout(() => {
//         setLander(false);
//         // }, 500);
//       },
//     });
//     tl.to(".rotating-img", {
//       rotationY: 720, // Horizontal rotation (X-axis)
//       opacity: 1, // Fade out
//       duration: 2, // 2 seconds duration
//       ease: "power2.inOut", // Smooth easing
//     });
//     tl.from(".animate-text", {
//       y: 100, // Start 100px below
//       opacity: 0, // Fully transparent
//       duration: 1, // Animation duration
//       ease: "power2.out", // Smooth easing
//     });
//     tl.to(".scale-div", {
//       scale: 2, // Start 100px below
//       opacity: 0, // Fully transparent
//       duration: 1, // Animation duration
//       ease: "power2.out", // Smooth easing
//     });
//   }, []);

 

//   if (lander)
//     return (
//       <div className="h-[100vh] w-full bg-slate-200">
//         <div className="h-full  scale-100 bg-slate-200 pr-[3vw] optional-1 scale-div md:w-full w-[85%] mx-auto flex flex-col items-center justify-center">
//           <img
//             className="rotating-img md:w-[300px] opacity-0 mix-blend-darken bg-blend-lighten md:h-[200px] w-[250px] h-[200px] "
//             src={logo}
//             alt="Rotating"
//           />
//           {/* <div className="md:text-3xl my-2 overflow-hidden font-bold">
//             <h1 className="animate-text relative tracking-wide">
//               Nakhuda Student Forum
//             </h1>
//           </div> */}
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-[100vh] relative md:pb-[20vh] tb:pb-[13vh] pb-[18vh] w-[100%]">
//       <ScrollToTop />

//       <NavBar />
//       <Routers></Routers>
//       <div className="absolute bottom-0 w-full">
//         <Footer></Footer>
//       </div>
//     </div>
//   );
// }

// // export default App;import { useEffect, useState } from "react";import Routers from "./Routers";
import NavBar from "../src/components/Navbar";
import ScrollToTop from "./utlis/ScrollToTop";
import Routers from "./Routers";

import Footer from "./components/Footer";
import logo from "../src/assets/logo.png";
import gsap from "gsap";
import { useEffect, useState } from "react";

function App() {
  const [lander, setLander] = useState(true);
  const [countdown, setCountdown] = useState(11);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (countdown > 0 && startAnimation) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0) {
      // Trigger the animation when countdown ends
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setLander(false), 500); // Wait for a brief moment after animation
        },
      });
      tl.to(".rotating-img", {
        rotationY: 720, // Horizontal rotation
        opacity: 1, // Fade in
        duration: 2, // Duration of the animation
        ease: "power2.inOut", // Smooth easing
      });
      tl.from(".animate-text", {
        y: 100, // Start 100px below
        opacity: 0, // Fully transparent
        duration: 1, // Animation duration
        ease: "power2.out", // Smooth easing
      });
      tl.to(".scale-div", {
        scale: 2, // Scale animation
        opacity: 0, // Fade out
        duration: 1, // Animation duration
        ease: "power2.out", // Smooth easing
      });
    }
  }, [countdown, startAnimation]);

  // Adding countdown scale animation for each countdown change
  useEffect(() => {
    if (countdown > 0) {
      gsap.fromTo(
        `.countdown-number`,
        { scale: 1, 
          opacity:1,
        },
        {
          scale: .3,
          opacity: 0,
          duration: 1,
          ease: "power2.in",
          // repeat: 1,
          yoyo: true, // Makes the animation reverse back after reaching its peak scale
        }
      );
    }
  }, [countdown]);

  if (lander)
    return (
      <div className="h-[100vh] w-full bg-slate-200 flex flex-col items-center justify-center">
        {!startAnimation ? (
          <button
            onClick={() => setStartAnimation(true)}
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
          >
            Start Countdown
          </button>
        ) : (
          <div className="text-center">
            {countdown > 0 &&countdown!=11 ? (
              <h1 className="countdown-number font-adam  text-[300px] text-b font-bold mb-4">
                {countdown === 1 ? "ONE" : countdown}
              </h1>
            ) : (
              <div className="h-full scale-100 bg-slate-200 optional-1 scale-div md:w-full w-[85%] mx-auto flex flex-col items-center justify-center">
                <img
                  className="rotating-img md:w-[300px] opacity-0 mix-blend-darken bg-blend-lighten md:h-[200px] w-[250px] h-[200px]"
                  src={logo}
                  alt="Rotating"
                />
             
              </div>
            )}
          </div>
        )}
      </div>
    );

  return (
    <div className="min-h-[100vh] relative md:pb-[20vh] tb:pb-[13vh] pb-[18vh] w-[100%]">
      <ScrollToTop />
      <NavBar />
        <Routers></Routers>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}

export default App;
