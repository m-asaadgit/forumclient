import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack, MdPersonRemove } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFormFromRedux,
  fetchApprovedData,
} from "../redux/Slice/approvedDataSlice";
import womenIMG from "../assets/womenLogo.png"
function Approved() {
  const [isChecked, setIsChecked] = useState(true); // State to hold the checkbox status

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked); // Update the checkbox state
  };
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const { data, loading, error } = useSelector((state) => state.approvedData);
  const [filteredData,setFilteredData]=React.useState();
  const navigate = useNavigate();
  const [seeDelete, setSeeDelete] = useState(null);

  const token = localStorage.getItem("token");

  const disapproveForm = async (formId) => {
    dispatch(deleteFormFromRedux({ formId, token }));
  };
  useEffect(() => {
    dispatch(fetchApprovedData());



  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const filtered = isChecked
        ? data.filter((item) => item.gender === "male")
        : data.filter((item) => item.gender === "female");
      setFilteredData(filtered);
    }
    console.log("hey")
  }, [isChecked, data]);
  
  if (loading) return <Loader></Loader>;

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
    
      <div className="fixed bg-gray-200 px-4 py-2 rounded-md shadow-lg z-[1000] shadow-zinc-400 flex items-center gap-3 top-[24vh] left-[15vw]">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <div className="w-10 h-6  bg-pink-400 rounded-full peer-checked:bg-blue-500 peer-checked:ring-2 peer-checked:ring-slate-300 peer-focus:ring-2 peer-focus:ring-slate-300 transition-all"></div>
          <div className="w-4 h-4 bg-white rounded-full shadow-md absolute top-[4px] left-[2px] peer-checked:translate-x-4 transition-transform"></div>
        </label>
        <span className="font-bold"> {isChecked ? "Male" : "Female"}</span>
      </div>

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

     

      {filteredData?.length > 0 ? (
        filteredData.map((item) => (
          <div
            key={item._id}
            className="md:w-[32%] w-[90%] tb:w-[47%] mx-auto md:mx-0 mb-[2%] flex md:h-[40vh] h-fit py-2 md:py-0 hover:scale-[101%] transition-all tb:min-h-[250px] duration-150 rounded-sm shadow-2xl shadow-slate-900 bg-gray-900 "
          >
            <div className="w-[42%] h-full flex flex-col gap-4 items-center pt-4">
              <div className="w-[80%] md:h-[80%] min-h-[60%]">
               {
                item.img ? <img src={item.img} className="w-full rounded-lg h-full" />: 
                 <img src={womenIMG} className="w-full mix-blend-normal bg-slate-300 bg-blend-darken rounded-lg h-full" />              }
              </div>{" "}
              <Link
                className="bg-yellow-400 shadow-2xl shadow-slate-900 text-black px-2 font-semibold h-fit flex md:hidden gap-1 items-center py-[3px] hover:scale-110 transition-all duration-200 w-fit mt-2 rounded-sm"
               to={`/approved/${item._id}`}
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
                  to={`/approved/${item._id}`}

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
        <p className="text-black flex items-center justify-center  ">
          No approved data available.<span className="opacity-0">s</span>{" "}
          <Link
            to={"/unapproved"}
            className="text-blue-900 font-semibold underline"
          >
            {" "}
            click here to approve
          </Link>{" "}
        </p>
      )}
    </div>
  );
}

export default Approved;
