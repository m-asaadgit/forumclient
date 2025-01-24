
import React, { useMemo, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuGoal } from "react-icons/lu";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const VisionMap = () => {
  useEffect(() => {
    // Select all vision cards and apply scroll-triggered animations
    gsap.utils.toArray(".vision-card").forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 50, // Start 50px below
        duration: 0.8,
        delay: index * 0.1, // Stagger animations
        scrollTrigger: {
          trigger: card,
          start: "top 100%", // Trigger when card is 80% from top of the viewport
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  const renderedVision = useMemo(() => {
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
    return visionData.map((items, index) => (
      <div
        key={index}
        className="vision-card md:w-[40%] w-[95%] md:h-[250px] h-fit mb-4 flex flex-col gap-4 py-8 bg-slate-100 px-4 shadow-xl shadow-gray-400"
      >
        <h1 className="md:font-bold font-semibold tracking-wide text-md tb:text-xl font-adam text-center">
          {items.heading}
        </h1>
        <h1 className="font-extralight font-ub text-md tb:text-xl text-gray-700 text-center">
          {items.body}
        </h1>
      </div>
    ));
  }, []);

  return (
    <div className="w-[100%] h-fit flex flex-col items-center gap-6 pt-8 md:pt-0 md:mb-4 ">
      <header className="mt-10 w-fit pb-4 font-semibold gap-0 items-center text-2xl tb:text-4xl tracking-wider font-adam ">
        <h1 className="flex justify-center items-center pb-[1px] tb:pb-[3px] ">
          Vision <LuGoal className="font-bold py-[1px]" />
        </h1>
        <svg
          className="h-2 w-40"
          viewBox="0 0 120 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="-120,0 220,0 50,50"
            className="fill-current text-black"
          />
        </svg>
      </header>
      <div className="w-[100%] h-fit md:gap-[10%] px-[5%] flex flex-wrap justify-center">
        {renderedVision}
      </div>
    </div>
  );
};

export default React.memo(VisionMap);
