import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { MdArrowBack, MdPersonAddAlt1, MdPersonRemove } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import Loader from "../components/Loader";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { ApiContext } from "../ContextAPI";
function Approved() {
  const {approvedData,setRefetch}=useContext(ApiContext)
  const navigate = useNavigate();
  // const [approvedData, setApprovedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seemore, setSeeMore] = useState(null);
  const [seeDelete, setSeeDelete] = useState(null);

  const token = localStorage.getItem("token");
  approvedData && console.log(approvedData)


  const disapproveForm = async (formId) => {
    setLoading(true)
    try {
      await axios.put(
        `https://forumserver-f93h.onrender.com/api/auth/delete/${formId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await setRefetch(prev=>!prev);

            toast.warn("form deleted successfully")
            setLoading(false)
    } catch (error) {
      console.error("Error disapproving form:", error);
      alert("Failed to disapprove form: " + error.message);
    }
  };

if(loading) return <Loader></Loader>
// if(approvedData.length==0) return <div className="flex items-center text-black  justify-center">no data approved</div>

  return (
    <div className="bg-white w-[100%] relative pb-[15vh]   md:pt-[34vh] pt-[25vh] px-[2%] min-h-[110vh] h-fit flex flex-wrap gap-[1%] justify-center py-4">
       <Link
        onClick={() => navigate(-1)}
        className="bg-gray-900 fixed z-50 top-[24vh] left-10  md:flex hidden items-center justify-center rounded-sm md:text-2xl font-normal gap-2 py-1 hover:bg-black hover:scale-[101%] shadow-md shadow-gray-600 text-white w-fit px-2 pr-4 h-fit"
      >
        <MdArrowBack />
        back
      </Link>
      <Link
        onClick={() => navigate(-1)}
        className="w-fit px-4 pl-2 flex md:hidden absolute  top-[15vh] left-[5vw] justify-center items-center font-semibold tracking-wide text-center rounded-sm py-1 text-white h-fit bg-gray-900"
      >
        <IoIosArrowRoundBack size={25} />
        Back
      </Link>
      {seeDelete && (
        <div className="md:w-[25vw] w-[90%] h-[25vh] flex items-center flex-col justify-center gap-6 rounded-sm shadow-2xl shadow-slate-900 md:bg-slate-100 bg-slate-300 fixed md:top-[20vh]  top-[30vh] z-[100] ">
          <h1 className="font-semibold">Want to delete ? </h1>{" "}
          <div>
            <Link
              onClick={() => setSeeDelete(null)}
              className="px-2 bg-blue-500  rounded-sm font-semibold py-1 text-xl"
            >
              Cancel
            </Link>{" "}
            <Link
              onClick={() => {
                disapproveForm(seeDelete._id);
                setSeeDelete(null);
              }}
              className="px-2 bg-[#f60100] rounded-sm font-semibold py-1 text-xl"
            >
              Delete{" "}
            </Link>
          </div>
        </div>
      )}

      {seemore && (
        <div className="w-[100vw] fixed z-50 overflow-scroll top-0 right-0 min-h-[100vh] bg-blue-100/50 backdrop-blur-sm">
          <div className="bg-slate-200 fixed z-50  top-[5vh] md:left-[17vw] left-[5vw]  px-2 py-2 md:w-[70vw] max-w-[90vw] md:min-h-[95vh] h-fit rounded-md">
            <Link
              onClick={() => {
                setSeeMore(null);
              }}
              className="flex items- justify-end gap-1 font-semibold  shadow-lg shadow-gray-200  px-1 rounded-sm text-gray-700 hover:text-gray-900 mb-4"
            >
              <RxCross2 className="text-lg" size={30} />
            </Link>
            <div className=" flex w-full md:flex-row flex-col  md:h-[30vh] h-fit ">

              <div className="md:w-[15%] md:mx-4 md:h-[100%] mx-auto h-[150px] w-[150px]  ">
                <img
                  src={seemore.img}
                  className="w-full md:rounded-md rounded-full object-cover h-full"
                />
              </div>
             
              <div className="md:px-4 md:w-[40%] md:max-w-[50%] px-2   rounded-sm">
                <h1 className="text-2xl text-center font-bold">{seemore.name}</h1>
                <div className="w-fit  flex md:hidden mx-auto  mb-4 relative items-center justify-start px-2 gap-2">
                <Link
                  onClick={() => {
                    disapproveForm(seemore._id);
                    setSeeMore("");
                    setSeeDelete(seemore);
                  }}
                  className="bg-[#f60100] text-black text-xl hover:scale-110 transition-all duration-200 px-2 shadow-2xl shadow-slate-900 font-semibold h-fit py-1 w-fit mt-2 flex gap-1 justify-center items-center rounded-sm"
                >
                  Delete <MdPersonRemove className="mt-1" />
                </Link>
              </div>
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
              <div className="w-fit h-[90%] md:flex hidden relative items-center justify-start px-2 gap-2">
                <Link
                  onClick={() => {
                    disapproveForm(seemore._id);
                    setSeeMore("");
                    setSeeDelete(seemore);
                  }}
                  className="bg-[#f60100] text-black text-xl hover:scale-110 transition-all duration-200 px-2 shadow-2xl shadow-slate-900 font-semibold h-fit py-1 w-fit mt-2 flex gap-1 justify-center items-center rounded-sm"
                >
                  Delete <MdPersonRemove className="mt-1" />
                </Link>
              </div>
            </div>
            <div className="bg-slate-100 w-full flex flex-wrap gap-4 my-4 h-fit px-4 py-2">
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
              <div className="bg-slate-100 w-full flex flex-col gap-4 my-4 h-fit px-4 py-2">
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
              <div className="bg-slate-100 w-full flex flex-col gap-4 my-4 h-fit px-4 py-2">
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
              <div className="bg-slate-100 w-full flex flex-col gap-4 my-4 h-fit px-4 py-2">
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
              <div className="bg-slate-100 w-full flex flex-col gap-4 my-4 h-fit px-4 py-2">
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
            className="md:w-[32%] w-[90%] tb:w-[47%] mx-auto md:mx-0 mb-[2%] flex md:h-[40vh] h-fit py-2 md:py-0 hover:scale-[101%] transition-all tb:min-h-[250px] duration-150 rounded-sm shadow-2xl shadow-slate-900 bg-gray-900 "
          >
            <div className="w-[42%] h-full flex flex-col gap-4 items-center pt-4">
              <div className="w-[80%] md:h-[80%] min-h-[60%]">
                <img src={item.img} className="w-full rounded-lg h-full" />

              </div>    <Link
                  className="bg-yellow-400 shadow-2xl shadow-slate-900 text-black px-2 font-semibold h-fit flex md:hidden gap-1 items-center py-[3px] hover:scale-110 transition-all duration-200 w-fit mt-2 rounded-sm"
                  onClick={() => {
                    setSeeMore(null);
                    setSeeMore(item);
                  }}
                >
                  See more <FaArrowTrendUp />
                </Link>

            </div>
            <div className="w-[56%]  overflow-hidden pt-6 h-full bg-slate-900 flex flex-col">
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
                  className="bg-yellow-400 shadow-2xl shadow-slate-900 text-black px-2 font-semibold h-fit md:flex hidden gap-1 items-center py-[3px] hover:scale-110 transition-all duration-200 w-fit mt-2 rounded-sm"
                  onClick={() => {
                    setSeeMore(null);
                    setSeeMore(item);
                  }}
                >
                  See more <FaArrowTrendUp />
                </Link>
                <Link
                  onClick={() => {
                    setSeeDelete(null);
                    setSeeDelete(item);
                    //  console.log(seeDelete)
                  }}
                  className="bg-[#f60100] text-black px-4 hover:scale-110 transition-all duration-200 md:px-2 shadow-2xl shadow-slate-900 font-semibold h-fit py-1 w-fit mt-2 flex gap-1 justify-center items-center rounded-sm"
                >
                  Delete <MdPersonRemove className="mt-1" />
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-black flex items-center justify-center  ">No approved data available.<span className="opacity-0" >s</span>  <Link to={"/unapproved"} className="text-blue-900 font-semibold underline"> click here to approve</Link> </p>
      )}
    </div>
  );
}

export default Approved;
