import React from "react";

function About() {
  const data = [
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
  return (
    <div className="w-[100%] h-fit md:pt-[25vh] pb-[15vh] flex flex-col gap-6 pt-[15vh]  ">
      {data.map((items, index) => (
        <div className="w-[80%] mx-auto bg-slate-100 shadow-2xl shadow-gray-400 md:h-[400px] h-fit flex flex-col md:flex-row items-center justify-center ">
          <div className="md:w-[30%] md:mx-8 md:h-[90%] pt-[5%] md:py-[5%] h-[180px] tb:h-[360px] tb:w-[60%] w-[80%] mx-auto ">
            <img src="" className="w-full h-full" alt="" />
          </div>
          <div className="md:w-[50%] w-[80%] mx-8 h-[90%] flex flex-col md:gap-4 gap-2 items-center justify-center md:pb-10 pb-2 my-[5%] ">
            <h1 className="md:text-xl text-md text-center font-semibold">
{items.authority}            </h1>
            <h1 className="md:text-3xl text-lg font-bold">{items.name}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}

export default About;
// secretary
