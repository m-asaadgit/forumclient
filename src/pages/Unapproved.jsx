import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { MdPersonAddAlt1, MdPersonRemove } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import Loader from "../components/Loader";
import { MdArrowBack } from "react-icons/md";

import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { ApiContext } from "../ContextAPI";

function Unapproved() {
  const {approvableData,setRefetch}=useContext(ApiContext)
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [seeDelete, setSeeDelete] = useState(null);
  const [seeApprove, setSeeApprove] = useState(null);
  const [tenthCertificate, setTenthCertificate] = useState(false);
  const [twelfthCertificate, settwelfthCertificate] = useState(null);
  const [bachelorCertificate, setBachelorCertificate] = useState(null);
  const [masterCertificate, setMasterCertificate] = useState(null);

  const token = localStorage.getItem("token");

  const approveForm = async (formId) => {
    try {
      const response = await axios.put(
        `https://forumtest.onrender.com/api/auth/approve/${formId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await setRefetch(prev=>!prev);
      toast.success(response.data.message );

      console.log(token);
    } catch (error) {
      console.error("Error approving form:", error);
      alert("Failed to approve form: " + error.message);
    }
  };

  const disapproveForm = async (formId) => {
    try {
      const response = await axios.delete(
        `https://forumtest.onrender.com/api/auth/disapprove/${formId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure `token` is defined
          },
        }
      );
      await setRefetch(prev=>!prev);

      toast.success(response.data.message || "Form disapproved successfully!");
    } catch (error) {
      console.error("Error disapproving form:", error);

      alert("Failed to disapprove form: " + error.message);
    }
  };


  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white w-[100%] md:pt-[34vh]  pb-[15vh] md:pb-[15vh] pt-[25vh] relative   px-[2%] min-h-[110vh] h-fit flex flex-wrap gap-[1%] justify-center py-4">
        {tenthCertificate && (
            <div className="fixed w-[80vw] top-0  h-[90vh] mt-[5vh] flex items-center justify-center bg-white z-[60]">
              <Link
                onClick={() => {
                  settwelfthCertificate(false);
                  setTenthCertificate(false);
                  setBachelorCertificate(false);
                  setMasterCertificate(false);
                }}
                className="flex absolute top-4  bg-white right-4  text-b"
              >
                <RxCross2 className="text-lg" size={30} />
              </Link>
              <img
                src={selectedItem.tenthImg}
                className="w-[100%] object-contain h-[100%] "
                alt=""
              />
            </div>
          )} 
           {twelfthCertificate && (
            <div className="fixed w-[80vw] top-0  h-[90vh] mt-[5vh] flex items-center justify-center bg-white z-[60]">
              <Link
                onClick={() => {
                  settwelfthCertificate(false);
                  setTenthCertificate(false);
                  setBachelorCertificate(false);
                  setMasterCertificate(false);
                }}
                className="flex absolute top-4  bg-white right-4  text-b"
              >
                <RxCross2 className="text-lg" size={30} />
              </Link>
              <img
                src={selectedItem.twelfthImg}
                className="w-[100%] object-contain  h-[100%] "
                alt=""
              />
            </div>
          )}  
          {bachelorCertificate && (
            <div className="fixed w-[80vw] top-0  h-[90vh] mt-[5vh] flex items-center justify-center bg-white z-[60]">
              <Link
                onClick={() => {
                  settwelfthCertificate(false);
                  setTenthCertificate(false);
                  setBachelorCertificate(false);
                  setMasterCertificate(false);
                }}
                className="flex absolute top-4  bg-white right-4  text-b"
              >
                <RxCross2 className="text-lg" size={30} />
              </Link>
              <img
                src={selectedItem.bachelorImg}
                className="w-[100%] object-contain h-[100%] "
                alt=""
              />
            </div>
          )} 
           {masterCertificate && (
            <div className="fixed w-[80vw] top-0  h-[90vh] mt-[5vh] flex items-center justify-center bg-white z-[60]">
              <Link
                onClick={() => {
                  settwelfthCertificate(false);
                  setTenthCertificate(false);
                  setBachelorCertificate(false);
                  setMasterCertificate(false);
                }}
                className="flex absolute top-4  bg-white right-4  text-b"
              >
                <RxCross2 className="text-lg" size={30} />
              </Link>
              <img
                src={selectedItem.masterImg}
                className="w-[100%] object-contain h-[100%] "
                alt=""
              />
            </div>
          )}
      <Link
        onClick={() => navigate(-1)}
        className="bg-gray-900 hidden fixed z-50 top-[24vh] left-10  md:flex items-center justify-center rounded-sm md:text-2xl font-normal gap-2 py-1 hover:bg-black hover:scale-[101%] shadow-md shadow-gray-600 text-white w-fit px-2 pr-4 h-fit"
      >
        <MdArrowBack />
        back
      </Link>
      <Link
        onClick={() => navigate(-1)}
        className="w-fit px-4 pl-2 flex md:hidden absolute  md:top-[5vh] top-[15vh] left-[5vw] justify-center items-center font-semibold tracking-wide text-center rounded-sm py-1 text-white h-fit bg-gray-900"
      >
        <IoIosArrowRoundBack size={25} />
        Back
      </Link>
      {seeDelete && !seeApprove && (
        <div className="md:w-[25vw] w-[80%] h-[25vh] flex items-center flex-col justify-center  gap-6 rounded-sm shadow-2xl shadow-slate-900 md:bg-slate-100 bg-slate-300 fixed md:top-[20vh] top-[30vh] z-[100] ">
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
      {seeApprove && !seeDelete && (
        <div className="md:w-[25vw] w-[80%] bg-slate-300 h-[25vh] flex items-center flex-col justify-center gap-6 rounded-sm shadow-2xl shadow-slate-900 md:bg-slate-100 fixed md:top-[20vh] top-[30vh] z-[100] ">
          <h1 className="font-semibold">Want to Approve ? </h1>{" "}
          <div>
            <Link
              onClick={() => setSeeApprove(null)}
              className="px-2 bg-blue-500  rounded-sm font-semibold py-1 text-xl"
            >
              Cancel
            </Link>{" "}
            <Link
              onClick={() => {
                // disapproveForm(seeDelete._id);
                approveForm(seeApprove._id);
                setSeeApprove(null);
              }}
              className="px-2 bg-green-500 rounded-sm font-semibold py-1 text-xl"
            >
              Approve
            </Link>
          </div>
        </div>
      )}











      {selectedItem && (
        <div className="w-[100vw] fixed z-50 overflow-scroll top-0 right-0 min-h-[100vh] bg-blue-100/50 backdrop-blur-sm">
        
          <div className="bg-slate-200 fixed z-50  top-[5vh] md:left-[17vw] left-[5vw] px-2 py-2 md:w-[70vw] w-[90vw]  min-h-[95vh] rounded-md">
            <Link
              onClick={() => setSelectedItem(null)}
              className="flex items- justify-end gap-1 font-semibold  shadow-lg shadow-gray-200  px-1 rounded-sm text-gray-700 hover:text-gray-900 mb-4"
            >
              <RxCross2 className="text-lg" size={30} />
            </Link>
            <div className=" flex md:flex-row flex-col  w-full md:text-md text-sm  md:h-[30vh] h-fit ">
              <div className="md:w-[15%] w-[150px]  md:mx-4 mx-auto   md:h-[100%] h-[150px]">
                <img
                  src={selectedItem.img}
                  className="w-full md:rounded-md rounded-full object-cover h-full"
                />
              </div>
              <div className="px-4 md:w-[40%]  md:max-w-[50%] pt-2 md:pt-0  rounded-sm">
                <h1 className="text-2xl text-center   font-bold">
                  {selectedItem.name}
                </h1>
                <p className="text-sm md:text-md">
                  <strong>Father Name:</strong>{" "}
                  <span className="  font-medium">{selectedItem.father}</span>
                </p>{" "}
                <p className="text-sm md:text-md">
                  <strong>Mother Name:</strong>{" "}
                  <span className="  font-medium">{selectedItem.mother}</span>{" "}
                </p>{" "}
                <p className="text-sm md:text-md">
                  <strong>Contact:</strong>{" "}
                  <span className="  font-medium">{selectedItem.contact}</span>
                </p>{" "}
                <p className="text-sm md:text-md">
                  <strong>Age:</strong>{" "}
                  <span className="  font-medium">{selectedItem.age}</span>
                </p>{" "}
                <p className="text-sm md:text-md">
                  <strong>Email:</strong>{" "}
                  <span className="  font-medium">{selectedItem.email}</span>
                </p>
              </div>
              <div className="md:w-fit w-full  h-[90%] flex  items-center justify-start md:px-2 px-10  gap-2">
                <Link
                  onClick={() => {
                    // approveForm(selectedItem._id);
                    // approveForm(selectedItem._id);
                    setSelectedItem("");
                    setSeeApprove(selectedItem);
                  }}
                  className="bg-green-500 text-black text-xl hover:scale-110 transition-all duration-200 px-2 font-semibold h-fit py-1 w-fit mt-2 flex gap-1 justify-center shadow-2xl shadow-slate-900 items-center rounded-sm"
                >
                  Approve <MdPersonAddAlt1 className="mt-1" />
                </Link>
                <Link
                  onClick={() => {
                    // disapproveForm(selectedItem._id);
                    setSelectedItem("");
                    setSeeDelete(selectedItem);
                  }}
                  className="bg-[#f60100] text-black text-xl hover:scale-110 transition-all duration-200 px-2 shadow-2xl shadow-slate-900 font-semibold h-fit py-1 w-fit mt-2 flex gap-1 justify-center items-center rounded-sm"
                >
                  Decline <MdPersonRemove className="mt-1" />
                </Link>
              </div>
            </div>
            <div className="bg-slate-100 w-full flex flex-wrap gap-4 my-4 h-fit px-4 py-2">
              <p className="md:w-[40%] w-full ">
                <strong>Permanent Address:</strong>{" "}
                <span className="  font-medium">{selectedItem.permanent}</span>
              </p>{" "}
              <p className="md:w-[40%] w-full ">
                <strong>Temporary:</strong>{" "}
                <span className="  font-medium">{selectedItem.temporary}</span>
              </p>{" "}
              <p className="md:w-[40%] w-full ">
                <strong>Working at:</strong>{" "}
                <span className="  font-medium">{selectedItem.workingAt}</span>
              </p>{" "}
              <p className="md:w-[40%] w-full ">
                <strong>Working As:</strong>{" "}
                <span className="  font-medium">{selectedItem.workingAs}</span>
              </p>
            </div>
            {selectedItem.hadTenth && (
              <div className="bg-slate-100 w-full flex flex-col gap-4 my-4 h-fit px-4 py-2">
                <p>
                  <strong>
                    Attained 10<sup>th</sup> at :
                  </strong>{" "}
                  <span className="  font-medium">
                    {selectedItem.tenthInstitute}
                  </span>
                </p>{" "}
                <div className="flex justify-between">
                  <div>
                    <p>
                      <strong>In the year:</strong>{" "}
                      <span className="  font-medium">
                        {" "}
                        {selectedItem.tenthYear - 1}-{selectedItem.tenthYear}
                      </span>
                    </p>
                    <p>
                      <strong>Percentage :</strong>{" "}
                      <span className="  font-medium">
                        {selectedItem.tenthPercent}%
                      </span>
                    </p>
                  </div>

                  {/*  */}
                  <button
                    onClick={() => setTenthCertificate(true)}
                      className="bg-[#03045e] text-white tb:w-fit tb:px-2 px-1 rounded-sm shadow-lg shadow-[#dad7cd] text-sm tb:text-md tb:h-[30px] h-[50px] break-words w-[80px]"
                  >
                    view certificate{" "}
                  </button>
                </div>
              </div>
            )}{" "}
            {selectedItem.hadTwelfth && (
              <div className="bg-slate-100 w-full flex flex-col gap-4 my-4 h-fit px-4 py-2">
                <p>
                  <strong>
                    Attained 12<sup>th</sup> at :
                  </strong>{" "}
                  <span className="  font-medium">
                    {selectedItem.twelfthInstitute}
                  </span>
                </p>{" "}
                <div className="flex justify-between">
                  <div>
                    <p>
                      <strong>In the year:</strong>{" "}
                      <span className="  font-medium">
                        {" "}
                        {selectedItem.twelfthYear - 1}-{selectedItem.twelfthYear}
                      </span>
                    </p>
                    <p>
                      <strong>Percentage :</strong>{" "}
                      <span className="  font-medium">
                        {selectedItem.twelfthPercent}%
                      </span>
                    </p>
                  </div>

                  {/*  */}
                  <button
                    onClick={() => settwelfthCertificate(true)}
                     className="bg-[#03045e] text-white tb:w-fit tb:px-2 px-1 rounded-sm shadow-lg shadow-[#dad7cd] text-sm tb:text-md tb:h-[30px] h-[50px] break-words w-[80px]"
                  >
                    view certificate{" "}
                  </button>
                </div>
              </div>
            )}{" "}
            {selectedItem.hadBachelor && (
              <div className="bg-slate-100 w-full flex flex-col gap-4 my-4 h-fit px-4 py-2">
                <p>
                  <strong>
                    Attained Bachelor's at :
                  </strong>{" "}
                  <span className="  font-medium">
                    {selectedItem.bachelorInstitute}
                  </span>
                </p>{" "}
                <div className="flex justify-between">
                  <div>
                    <p>
                      <strong>In the year:</strong>{" "}
                      <span className="  font-medium">
                        {" "}
                        {selectedItem.bachelorYear - 1}-{selectedItem.bachelorYear}
                      </span>
                    </p>
                    <p>
                      <strong>Percentage :</strong>{" "}
                      <span className="  font-medium">
                        {selectedItem.bachelorPercent}%
                      </span>
                    </p>
                  </div>

                  {/*  */}
                  <button
                    onClick={() => setBachelorCertificate(true)}
                    className="bg-[#03045e] text-white tb:w-fit tb:px-2 px-1 rounded-sm shadow-lg shadow-[#dad7cd] text-sm tb:text-md tb:h-[30px] h-[50px] break-words w-[80px]"
                  >
                    view certificate{" "}
                  </button>
                </div>
              </div>
            )}{" "}
            {selectedItem.hadMaster && (
              <div className="bg-slate-100 w-full flex flex-col gap-4 my-4 h-fit px-4 py-2">
                <p>
                  <strong>
                    Attained master's at :
                  </strong>{" "}
                  <span className="  font-medium">
                    {selectedItem.masterInstitute}
                  </span>
                </p>{" "}
                <div className="flex justify-between">
                  <div>
                    <p>
                      <strong>In the year:</strong>{" "}
                      <span className="  font-medium">
                        {" "}
                        {selectedItem.masterYear - 1}-{selectedItem.masterYear}
                      </span>
                    </p>
                    <p>
                      <strong>Percentage :</strong>{" "}
                      <span className="  font-medium">
                        {selectedItem.masterPercent}%
                      </span>
                    </p>
                  </div>

                  {/*  */}
                  <button
                    onClick={() => setMasterCertificate(true)}
                    className="bg-[#03045e] text-white tb:w-fit tb:px-2 px-1 rounded-sm shadow-lg shadow-[#dad7cd] text-sm tb:text-md tb:h-[30px] h-[50px] break-words w-[80px]"
                  >
                    view certificate{" "}
                  </button>
                </div>
              </div>
            )}{" "}
       
     
        
            {selectedItem.dropReason && (
              <div className="bg-slate-100 w-full flex flex-col gap-4 my-4 h-fit px-4 py-2">
                <p>
                  <strong>Reason Behind he dropped :</strong>{" "}
                  <span className="  font-medium">
                    {selectedItem.dropReason}
                  </span>
                </p>{" "}
                <p>
                  <strong>In the year:</strong>{" "}
                  <span className="  font-medium">
                    {" "}
                    {selectedItem.masterYear - 2}-{selectedItem.masterYear}
                  </span>
                </p>
                <p>
                  <strong>Percentage :</strong>{" "}
                  <span className="  font-medium">
                    {selectedItem.masterPercent}
                  </span>
                </p>
              </div>
            )}
       
          </div>
        </div>
      )}

      {approvableData?.length > 0 ? (
        approvableData.map((item) => (
          <div
            key={item._id}
            className="md:w-[32%] w-[90%] tb:w-[47%] mx-auto md:mx-0 mb-[2%] flex md:h-[40vh] h-fit py-2 md:py-0 hover:scale-[101%] transition-all duration-150 rounded-sm shadow-2xl shadow-slate-900 bg-gray-900"
          >
            <div className="w-[42%] h-[200px] flex flex-col b md:gap-0 gap-2 items-center pt-4">
              <div className="w-[80%] md:h-[70%] h-[60%] 0">
                <img src={item.img} className="w-full rounded-lg h-full" />
              </div>
              <Link
                className="bg-yellow-400 shadow-2xl shadow-slate-900 text-black px-2 font-semibold h-fit flex gap-1 items-center py-[3px] hover:scale-110 transition-all duration-200 w-fit mt-2 rounded-sm"
                onClick={() => {
                  setSelectedItem(null);
                  setSelectedItem(item);
                }}
              >
                See more <FaArrowTrendUp />
              </Link>
            </div>
            <div className="w-[56%] md:text-md text-sm overflow-hidden pt-6 h-full bg-slate-900 flex flex-col">
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
              <div className="w-full  h-[25%] flex flex-col md:flex-row items-center md:items-start justify-start px-2 gap-2">
                <Link
                  onClick={() => {
                    // approveForm(item._id)
                    setSeeApprove(item);
                  }}
                  className="bg-green-500 text-black hover:scale-110 transition-all duration-200 px-2 font-semibold h-fit py-1 w-fit mt-2 flex gap-1 justify-center shadow-2xl shadow-slate-900 items-center rounded-sm"
                >
                  Approve <MdPersonAddAlt1 className="mt-1" />
                </Link>
                <Link
                  onClick={() => {
                    // disapproveForm(item._id)
                    setSeeDelete(item);
                  }}
                  className="bg-[#f60100] text-black hover:scale-110 transition-all duration-200 px-2 shadow-2xl shadow-slate-900 font-semibold h-fit py-1 w-fit mt-2 flex gap-1 justify-center items-center rounded-sm"
                >
                  Decline <MdPersonRemove className="mt-1" />
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
     <p className="text-black flex items-center justify-center  ">No data available.<span className="opacity-0" >s</span>  </p>
      )}
    </div>
  );
}

export default Unapproved;
