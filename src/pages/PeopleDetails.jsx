

import React, {  useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

import Loader from "../components/Loader";
import { ApiContext } from "../ContextAPI";
function PeopleDetails() {
  const {approvedData}=useContext(ApiContext)

//   const [error, setError] = useState(null);
  const [seemore, setSeeMore] = useState(null);
  const [seeDelete, setSeeDelete] = useState(null);


//   if (loading) return <Loader></Loader>;
//   if (error) return <p>Error: {error}</p>;

  return (
    
    <div className="bg-white w-[100%] relative px-4  md:pt-[25vh] pt-[15vh] md:px-[2%] md:min-h-[110vh]  min-h-[95vh] flex  flex-col md:flex-row flex-wrap gap-[1%] justify-center py-4">
     

      {seemore && (
        <div className="w-[100vw] fixed z-50  overflow-scroll top-0 right-0 min-h-[100vh] bg-blue-100/50 backdrop-blur-sm">
          <div className="bg-slate-200 fixed z-50  top-[5vh] md:left-[17vw] left-[1.5%] px-2 py-2 md:w-[70vw] w-[97%] min-h-[95vh] rounded-md">
            <Link
              onClick={() => {
                setSeeMore(null);
              }}
              className="flex items- justify-end gap-1 font-semibold  shadow-lg shadow-gray-200  px-1 rounded-sm text-gray-700 hover:text-gray-900 mb-4"
            >
              <RxCross2 className="text-lg" size={30} />
            </Link>
            <div className=" flex md:flex-row flex-col   w-full   md:h-[30vh] h-fit ">
              <div className="md:w-[25%]  md:mx-4 md:h-[100%] h-[200px]  mx-auto w-[200px]  ">
                <img
                  src={seemore.img}
                  className="w-full md:rounded-md object-cover rounded-full h-full"
                />
              </div>
              <div className="md:px-4 md:w-[40%] md:max-w-[50%] w-full px-2  rounded-sm">
                <h1 className="text-2xl text-center md:text-left pb-4 md:pb-0   font-bold">
                  {seemore.name}
                </h1>
                <p>
                  <strong>Father Name:</strong>{" "}
                  <span className="  font-medium">{seemore.father}</span>
                </p>{" "}
                <p>
                  <strong>Mother Name:</strong>{" "}
                  <span className="  font-medium">{seemore.mother}</span>{" "}
                </p>{" "}
                <p>
                  <strong>Contact:</strong>{" "}
                  <span className="  font-medium">{seemore.contact}</span>
                </p>{" "}
                <p>
                  <strong>Age:</strong>{" "}
                  <span className="  font-medium">{seemore.age}</span>
                </p>{" "}
                <p>
                  <strong>Email:</strong>{" "}
                  <span className="  font-medium">{seemore.email}</span>
                </p>
              </div>
            </div>
            <div className="bg-slate-100 w-full flex flex-wrap md:gap-4 md:my-4 gap-2 my-2 h-fit px-4 py-2">
              <p className="w-[40%]">
                <strong>Permanent Address:</strong>{" "}
                <span className="  font-medium">{seemore.permanent}</span>
              </p>{" "}
              <p className="w-[40%]">
                <strong>Temporary:</strong>{" "}
                <span className="  font-medium">{seemore.temporary}</span>
              </p>{" "}
              <p className="w-[40%]">
                <strong>Working at:</strong>{" "}
                <span className="  font-medium">{seemore.workingAt}</span>
              </p>{" "}
              <p className="w-[40%]">
                <strong>Working As:</strong>{" "}
                <span className="  font-medium">{seemore.workingAs}</span>
              </p>
            </div>
            {seemore.hadTenth && (
              <div className="bg-slate-100 w-full flex flex-col md:gap-4 md:my-4 gap-2 my-2 h-fit px-4 py-2">
                <p>
                  <strong>
                    Attained 10<sup>th</sup> at :
                  </strong>{" "}
                  <span className="  font-medium">
                    {seemore.tenthInstitute}
                  </span>
                </p>{" "}
                <p>
                  <strong>In the year:</strong>{" "}
                  <span className="  font-medium">
                    {" "}
                    {seemore.tenthYear - 1}-{seemore.tenthYear}
                  </span>
                </p>
                <p>
                  <strong>Percentage :</strong>{" "}
                  <span className="  font-medium">{seemore.tenthPercent}%</span>
                </p>
              </div>
            )}{" "}
            {seemore.hadTwelfth && (
              <div className="bg-slate-100 w-full flex flex-col md:gap-4 md:my-4 gap-2 my-2 h-fit px-4 py-2">
                <p>
                  <strong>
                    Attained 12<sup>th</sup> at :
                  </strong>{" "}
                  <span className="  font-medium">
                    {seemore.twelfthInstitute}
                  </span>
                </p>{" "}
                <p>
                  <strong>In the year:</strong>{" "}
                  <span className="  font-medium">
                    {" "}
                    {seemore.twelfthYear - 1}-{seemore.twelfthYear}
                  </span>
                </p>
                <p>
                  <strong>Percentage :</strong>{" "}
                  <span className="  font-medium">
                    {seemore.twelfthPercent}%
                  </span>
                </p>
              </div>
            )}
            {seemore.hadBachelor && (
              <div className="bg-slate-100 w-full flex flex-col md:gap-4 md:my-4 gap-2 my-2 h-fit px-4 py-2">
                <p>
                  <strong>
                    Attained 10<sup>th</sup> at :
                  </strong>{" "}
                  <span className=" capitalize  font-medium">
                    {seemore.bachelorInstitute}
                  </span>
                </p>{" "}
                <p>
                  <strong>In the year:</strong>{" "}
                  <span className="  font-medium"> {seemore.bachelorYear}</span>
                </p>
                <p>
                  <strong>Percentage :</strong>{" "}
                  <span className="  font-medium">
                    {seemore.bachelorPercent}
                  </span>
                </p>
              </div>
            )}{" "}
            {seemore.hadMaster && (
              <div className="bg-slate-100 w-full flex flex-col md:gap-4 md:my-4 gap-2 my-2 h-fit px-4 py-2">
                <p>
                  <strong>
                    Attained 10<sup>th</sup> at :
                  </strong>{" "}
                  <span className="  font-medium">
                    {seemore.masterInstitute}
                  </span>
                </p>{" "}
                <p>
                  <strong>In the year:</strong>{" "}
                  <span className="  font-medium">
                    {" "}
                    {seemore.masterYear - 2}-{seemore.masterYear}
                  </span>
                </p>
                <p>
                  <strong>Percentage :</strong>{" "}
                  <span className="  font-medium">
                    {seemore.masterPercent}%
                  </span>
                </p>
              </div>
            )}{" "}
            {seemore.dropReason && (
              <div className="bg-slate-100 w-full flex flex-col gap-4 my-4 h-fit px-4 py-2">
                <p>
                  <strong>Reason Behind he dropped :</strong>{" "}
                  <span className="  font-medium">{seemore.dropReason}</span>
                </p>{" "}
                <p>
                  <strong>In the year:</strong>{" "}
                  <span className="  font-medium">
                    {" "}
                    {seemore.masterYear - 2}-{seemore.masterYear}
                  </span>
                </p>
                <p>
                  <strong>Percentage :</strong>{" "}
                  <span className="  font-medium">{seemore.masterPercent}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {approvedData.length > 0 ? (
        approvedData.map((item) => (
          <div
            key={item._id}
            className="md:w-[32%] w-full mb-[2%] flex h-[30vh] tb:w-[450px]   hover:scale-[101%] transition-all duration-150 rounded-sm shadow-2xl shadow-slate-900 bg-gray-900"
          >
            <div className="w-[42%] h-full flex flex-col items-center pt-4">
              <div className="w-[80%] h-[80%] ">
                <img src={item.img} className="w-full rounded-lg h-full" />
              </div>
            </div>
            <div className="w-[56%] overflow-hidden pt-6 md:text-md text-sm h-full bg-slate-900 flex flex-col">
              <h1 className="text-white font-semibold">{item.name}</h1>
              <p className="text-white">
                <span className="font-semibold text-slate-400">
                  Father Name:{" "}
                </span>
                {item.father}
              </p>
              <p className="text-white">
                <span className="font-semibold text-slate-400">Age: </span>
                {item.age}
              </p>
              <p className="text-white">
                <span className="font-semibold text-slate-400">Contact: </span>
                {item.contact}
              </p>
              <p className="text-white">
                <span className="font-semibold text-slate-400">Email: </span>
                {item.contact}
              </p>
              <div className="w-full h-[25%] relative flex justify-start px-2 gap-2">
                <Link
                  className="bg-yellow-400 shadow-2xl shadow-slate-900 text-black px-2 font-semibold h-fit flex gap-1 items-center py-[3px] hover:scale-110 transition-all duration-200 w-fit mt-2 rounded-sm"
                  onClick={() => {
                    setSeeMore(null);
                    setSeeMore(item);
                  }}
                >
                  See more <FaArrowTrendUp />
                </Link>
              </div>
            </div>{" "}
          </div>
        ))
      ) : (
        <p className="text-black flex items-center justify-center  ">No approved data available.<span className="opacity-0" >s</span>  <Link to={"/fill-form"} className="text-blue-900 font-semibold underline"> Click here to be the first to get enrolled</Link> </p>
      )}
    </div>
  );
}

export default PeopleDetails;













