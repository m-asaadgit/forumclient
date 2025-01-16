
import NavBar from "../src/components/Navbar";
import ScrollToTop from "./utlis/ScrollToTop";
import Routers from "./Routers";

import Footer from "./components/Footer";
import logo from "../src/assets/logo.png";
import gsap from "gsap";
import { useEffect, useState } from "react";

function App() {
  const [lander, setLander] = useState(true);
  const [countdown, setCountdown] = useState(1);
  const [startAnimation, setStartAnimation] = useState(false);
  const [showLaunchingText, setShowLaunchingText] = useState(true); // New state to show launching text

  useEffect(() => {
    if (startAnimation) {
      // Animate the launching text
      const tl = gsap.timeline({
        onComplete: () => {
          // Hide the launching text after 2 seconds
          setTimeout(() => {
            setShowLaunchingText(false);
            setCountdown(11); // Start the countdown
          }, 2000);
        },
      });

      tl.fromTo(
        ".launching-text", // Target the launching text
        {
          opacity: 0, // Start fully transparent
          scale: 0.8, // Start slightly smaller
        },
        {
          opacity: 1, // Fade in
          scale: 1.2, // Scale up
          duration: 1, // Animation duration
          ease: "power2.out", // Smooth easing
        }
      ).to(".launching-text", {
        scale: 1, // Bounce back to normal size
        duration: 0.5, // Bounce duration
        ease: "bounce.out", // Bounce easing
      });
    }
  }, [startAnimation]);

  useEffect(() => {
    if (countdown > 0 && !showLaunchingText) {
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
        scale: 1.4, // Scale up to 1.4
        opacity: 1, // Fade in
        duration: 3, // Duration for rotation, scaling, and fade-in
        ease: "power2.inOut", // Smooth easing
      })
        .to(".rotating-img", {
          duration: 2, // Hold duration (2 seconds)
          ease: "none", // No easing during hold
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
  }, [countdown, showLaunchingText]);

  useEffect(() => {
    if (countdown > 0 && !showLaunchingText) {
      gsap.fromTo(
        `.countdown-number`,
        { scale: 1, opacity: 1 },
        {
          scale: 0.3,
          opacity: 0,
          duration: 1,
          ease: "power2.in",
          yoyo: true, // Makes the animation reverse back after reaching its peak scale
        }
      );
    }
  }, [countdown, showLaunchingText]);

  if (lander)
    return (
      <div className="h-[100vh] w-full bg-slate-200 flex flex-col items-center justify-center">
        {!startAnimation ? (
          <button
            onClick={() => setStartAnimation(true)}
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
          >
            Launch
          </button>
        ) : showLaunchingText ? (
          <h1 className="launching-text text-4xl font-bold text-b font-adam mb-4">
            Launching Nakhuda Student Forum
          </h1>
        ) : (
          <div className="text-center">
            {countdown > 0 && countdown !== 11 ? (
              <h1 className="countdown-number font-adam text-[300px] text-b font-bold mb-4">
                {countdown === 1 ? "ONE" : countdown}
              </h1>
            ) : (
              <div className="h-full scale-100 bg-slate-200 optional-1 scale-div md:w-full w-[85%] mx-auto flex flex-col items-center justify-center">
                <img
                  className="rotating-img md:w-[300px] opacity-0 mix-blend-darken bg-blend-lighten md:h-[200px] w-[250px] h-[230px]"
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
