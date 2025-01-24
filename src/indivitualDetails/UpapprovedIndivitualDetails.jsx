/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import img from "../assets/womenLogo.png";
import { MdArrowBack, MdPersonAddAlt1, MdPersonRemove } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  approveFormFromRedux,
  disapproveFormFromRedux,
} from "../redux/Slice/approvableDataSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function UpapprovedIndivitualDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const approveForm = (formId) => {
    dispatch(approveFormFromRedux({ formId, token }));
    toast.success("form approved successfully");

    navigate(-1);
  };

  const disapproveForm = (formId) => {
    dispatch(disapproveFormFromRedux({ formId, token }));
    toast.success("form disapproved successfully");
    // Toast.success("form disapproved successfully")
    navigate(-1);
  };

  const [data, setData] = useState(null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const path = useParams();
  const [seeDelete, setSeeDelete] = useState(null);
  const [seeApprove, setSeeApprove] = useState(null);

  const fetchData = async () => {
    try {
      // Retrieve the token from localStorage (or wherever it is stored)
      const token = localStorage.getItem("token");

      // Send the request with the Authorization header
      const response = await axios.get(
        `${apiUrl}/api/auth/person/details/for/admin/${path.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token as a Bearer token
          },
        }
      );

      // Set the data received from the response
      setData(response.data.data);
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  useEffect(() => {
    path && apiUrl && fetchData();

    return () => {
      setData(null);
    };
  }, []);

  

  return data ? (
    <div className=" bg-white w-[100%]  h-fit pt-[10vh] tb:pt-[12vh] md:pt-[23vh]">
      {seeDelete && !seeApprove && (
        <div className="md:w-[25vw] w-[80%] h-[25vh] flex items-center flex-col justify-center  gap-6 rounded-sm shadow-2xl shadow-slate-900 md:bg-slate-100 bg-slate-300 fixed md:top-[40vh]  md:left-[37vw] top-[30vh] z-[100] ">
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
                disapproveForm(seeDelete);
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
        <div className="md:w-[25vw] w-[80%] bg-slate-300 h-[25vh] flex items-center flex-col justify-center gap-6 rounded-sm shadow-2xl shadow-slate-900 md:bg-slate-100 fixed md:top-[40vh]  md:left-[37vw] top-[30vh] z-[100] ">
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
                approveForm(seeApprove);
                setSeeApprove(null);
              }}
              className="px-2 bg-green-500 rounded-sm font-semibold py-1 text-xl"
            >
              Approve
            </Link>
          </div>
        </div>
      )}
      <div className="mx-4  md:flex h-fit md:pl-[10vw]    pt-4 ">
        <button
          onClick={() => {
            setSeeApprove(data._id);
          }}
          className="bg-green-500 text-black absolute top-[30vh] right-[30vh] hover:scale-110 transition-all duration-200 px-2 font-semibold h-fit py-1 w-fit mt-2 flex gap-1 justify-center shadow-2xl shadow-slate-900 items-center rounded-sm"
        >
          Approve <MdPersonAddAlt1 className="mt-1" />
        </button>
        <button
          onClick={() => {
            setSeeDelete(data._id);
          }}
          className="bg-[#f60100] text-black absolute top-[30vh] right-[10vh] hover:scale-110 transition-all duration-200 px-2 shadow-2xl shadow-slate-900 font-semibold h-fit py-1 w-fit mt-2 flex gap-1 justify-center items-center rounded-sm"
        >
          Decline <MdPersonRemove className="mt-1" />
        </button>
        <Link
          onClick={() => navigate(-1)}
          className="bg-gray-900 fixed z-50 top-[24vh] left-10  md:flex hidden items-center justify-center rounded-sm md:text-2xl font-normal gap-2 py-1 hover:bg-black hover:scale-[101%] shadow-md shadow-gray-600 text-white w-fit px-2 pr-4 h-fit"
        >
          <MdArrowBack />
          back
        </Link>
        <Link
          onClick={() => navigate(-1)}
          className="w-fit px-4 pl-2 flex md:hidden fixed  top-[13vh] left-[5vw] justify-center items-center font-semibold tracking-wide text-center rounded-sm py-1 text-white h-fit bg-gray-900"
        >
          <IoIosArrowRoundBack size={25} />
          Back
        </Link>{" "}
        <div className="w-[180px]  h-[180px] md:ml-[5vw]  mx-auto md:mx-0  ">
          {data.img ? (
            <img
              src={data.img}
              className="w-full rounded-full md:rounded-md h-full"
              alt=""
            />
          ) : (
            <img src={img} className="w-full rounded-full h-full" alt="" />
          )}
        </div>
        <div className=" mt-4 md:mt-0 mx-2  tb:w-fit pr-[3vw] tb:mx-auto md:ml-[3vw] md:mx-0 flex flex-col   h-fit ">
          <div className="  flex h-fit capitalize">
            <h1 className="w-[27%]  md:w-[90px] tb:w-[35%] h-full  flex justify-start pl-4 font-ub tb:text-xl md:text-[15px] text-sm text-slate-600">
              Person :
            </h1>
            <h1 className=" break-words   w-fit  h-full flex justify-start pl-4 font-ub tb:text-xl md:text-[15px] text-lg text-black">
              {data.name}
            </h1>
          </div>
          <div className="  flex h-fit capitalize">
            <h1 className="w-[27%]  md:w-[90px] tb:w-[35%] h-full  flex justify-start pl-4 font-ub tb:text-xl md:text-[15px] text-sm text-slate-600">
              Age:
            </h1>
            <h1 className=" break-words   w-fit  h-full flex justify-start pl-4 font-ub tb:text-xl md:text-[15px] text-lg text-black">
              {data.age}
            </h1>
          </div>
          <div className="  flex h-fit capitalize">
            <h1 className="w-[27%]  md:w-[90px] tb:w-[35%] h-full  flex justify-start pl-4 font-ub tb:text-xl md:text-[15px] text-sm text-slate-600">
              Father :
            </h1>
            <h1 className=" break-words   w-fit  h-full flex justify-start pl-4 font-ub tb:text-xl md:text-[15px] text-lg text-black">
              {data.father}
            </h1>
          </div>
          {data.mother && (
            <div className="  flex h-fit capitalize">
              <h1 className="w-[27%]  md:w-[90px] tb:w-[35%] h-full  flex justify-start pl-4 font-ub tb:text-xl md:text-[15px] text-sm text-slate-600">
                Mother :
              </h1>
              <h1 className=" break-words   w-fit  h-full flex justify-start  pl-4 font-ub tb:text-xl md:text-[15px] text-lg text-black">
                {data.mother}
              </h1>
            </div>
          )}{" "}
          {data.gender && (
            <div className="   flex h-fit capitalize">
              <h1 className="w-[27%]  md:w-[90px] tb:w-[35%] h-full  flex justify-start pl-4 font-ub tb:text-xl md:text-[15px] text-sm text-slate-600">
                Gender :
              </h1>
              <h1 className=" break-words   w-fit  h-full flex justify-start  pl-4 font-ub tb:text-xl md:text-[15px] text-lg text-black">
                {data.gender}
              </h1>
            </div>
          )}{" "}
          {data.email && (
            <div className="  flex h-fit capitalize">
              <h1 className="w-[27%]  md:w-[90px] tb:w-[35%] h-full  flex justify-start pl-4 font-ub tb:text-xl md:text-[15px] text-sm text-slate-600">
                Email :
              </h1>
              <h1 className=" break-words   w-fit  h-full flex justify-start  pl-4 font-ub tb:text-xl md:text-[15px] text-lg text-black">
                {data.email}
              </h1>
            </div>
          )}{" "}
          {data.contact && (
            <div className="  flex h-fit capitalize">
              <h1 className="w-[27%]  md:w-[90px] tb:w-[35%] h-full  flex justify-start pl-4 font-ub tb:text-xl md:text-[15px] text-sm text-slate-600">
                Contact :
              </h1>
              <h1 className=" break-words   w-fit  h-full flex justify-start  pl-4 font-ub tb:text-xl md:text-[15px] text-2lg text-black">
                {data.contact}
              </h1>
            </div>
          )}
        </div>
      </div>

      <div className=" mt-2  flex flex-col gap-6   py-4 h-fit">
        {data.workingAt && data.workingAs && (
          <div className="w-[96%] font-semibold text-slate-800 bg-slate-100  rounded-md py-3  px-2  text-lg flex flex-col gap-2 mx-auto  ">
            {/* <div className=" capitalize">
                <strong>
                  attained 10<sup>th</sup> at :{" "}
                </strong>
                {data.tenthInstitute}
              </div> */}
            <div className="flex">
              <h1 className="font-bold  pr-2 ">Working At: </h1>
              <h1 className="font-semibold  ">{data.workingAt}</h1>
            </div>{" "}
            <div className="flex">
              <h1 className="font-bold   pr-2 ">Working as: </h1>
              <h1 className="font-semibold ">{data.workingAs}</h1>
            </div>
          </div>
        )}{" "}
        {data.hadTenth && (
          <div className="w-[96%] font-semibold text-slate-800 bg-slate-100  rounded-md py-3  px-2  text-lg flex flex-col gap-2 mx-auto  ">
            <div className=" capitalize">
              <strong>
                attained 10<sup>th</sup> at :{" "}
              </strong>
              {data.tenthInstitute}
            </div>
            <div className="flex">
              <h1 className="font-bold  pr-2 ">Percentage:</h1>
              <h1 className="font-semibold  ">{data.tenthPercent}%</h1>
            </div>{" "}
            <div className="flex">
              <h1 className="font-bold   pr-2 ">Passout Year:</h1>
              <h1 className="font-semibold ">{data.tenthYear}</h1>
            </div>
          </div>
        )}{" "}
        {data.hadTwelfth && (
          <div className="w-[96%] font-semibold text-slate-800 bg-slate-100  rounded-md py-3  px-2  text-lg flex flex-col gap-2 mx-auto  ">
            <div className=" capitalize">
              <strong>
                attained 12<sup>th</sup> at :{" "}
              </strong>
              {data.twelfthInstitute}
            </div>
            <div className="flex">
              <h1 className="font-bold  pr-2 ">Percentage:</h1>
              <h1 className="font-semibold  ">{data.twelfthPercent}%</h1>
            </div>{" "}
            <div className="flex">
              <h1 className="font-bold   pr-2 ">Passout Year:</h1>
              <h1 className="font-semibold ">{data.twelfthYear}</h1>
            </div>
          </div>
        )}{" "}
        {data.hadBachelor && (
          <div className="w-[96%] font-semibold text-slate-800 bg-slate-100  rounded-md py-3  px-2  text-lg flex flex-col gap-2 mx-auto  ">
            <div className=" capitalize">
              <strong>attained Bachelor's Degree at : </strong>
              {data.bachelorInstitute}
            </div>
            <div className="flex">
              <h1 className="font-bold  pr-2 ">cgpa / percentage:</h1>
              <h1 className="font-semibold  ">{data.bachelorPercent}</h1>
            </div>{" "}
            <div className="flex">
              <h1 className="font-bold   pr-2 ">Pas sout Year:</h1>
              <h1 className="font-semibold ">{data.bachelorYear}</h1>
            </div>
          </div>
        )}{" "}
        {data.hadMaster && (
          <div className="w-[96%] font-semibold text-slate-800 bg-slate-100  rounded-md py-3  px-2  text-lg flex flex-col gap-2 mx-auto  ">
            <div className=" capitalize">
              <strong>attained Master's Degree at : </strong>
              {data.masterInstitute}
            </div>
            <div className="flex">
              <h1 className="font-bold  pr-2 ">Percentage:</h1>
              <h1 className="font-semibold  ">{data.masterPercent}</h1>
            </div>{" "}
            <div className="flex">
              <h1 className="font-bold   pr-2 ">Passout Year:</h1>
              <h1 className="font-semibold ">{data.masterYear}</h1>
            </div>
          </div>
        )}{" "}
      </div>
    </div>
  ) : (
    <Loader></Loader>
  );
}

export default UpapprovedIndivitualDetails;
