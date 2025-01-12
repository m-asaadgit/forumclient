import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import img from "../assets/womenLogo.png";
import { MdArrowBack } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";

function Indivitual() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const path = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/auth/approved/details/${path.id}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error:", error);
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
      <div className="mx-4  md:flex h-fit md:pl-[10vw]    pt-4 ">
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
        <div className="w-[180px] h-[180px]  mx-auto  ">
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
        <div className=" mt-4 mx-2   tb:w-[65%] tb:mx-auto flex flex-col gap-2  h-fit ">
          <div className="  flex h-fit capitalize">
            <h1 className="w-[35%]  md:w-[20%] h-full  flex justify-start pl-4 font-ub text-xl i text-slate-600">
              Person Name:
            </h1>
            <h1 className=" break-words   w-[55%] h-full flex justify-start pl-4 font-ub text-xl  text-black">
              {data.name}
            </h1>
          </div>
          <div className="  flex h-fit capitalize">
            <h1 className="w-[35%]  md:w-[20%] h-full  flex justify-start pl-4 font-ub text-xl i text-slate-600">
              Age:
            </h1>
            <h1 className=" break-words   w-[55%] h-full flex justify-start pl-4 font-ub text-xl  text-black">
              {data.age}
            </h1>
          </div>
          <div className="  flex h-fit capitalize">
            <h1 className="w-[35%]  md:w-[20%] h-full  flex justify-start pl-4 font-ub text-xl i text-slate-600">
              Father Name:
            </h1>
            <h1 className=" break-words   w-[55%] h-full flex justify-start pl-4 font-ub text-xl  text-black">
              {data.father}
            </h1>
          </div>
          {/* <div className="  flex h-fit capitalize">
            <h1 className="w-[45%]  h-full  flex justify-start pl-4 font-ub text-xl i text-slate-600">
              Mother Name:
            </h1>
            <h1 className=" break-words  w-[55%] h-full flex justify-start pl-4 font-ub text-xl  text-black">
              {data.mother}
            </h1>
          </div> */}
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

export default Indivitual;
