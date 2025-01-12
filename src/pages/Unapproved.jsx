/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import  { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdPersonAddAlt1, MdPersonRemove } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdArrowBack } from "react-icons/md";
import womenProfile from "../assets/womenLogo.png"

import { RxCross2 } from "react-icons/rx";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { fetchApprovableData,approveFormFromRedux, disapproveFormFromRedux } from "../redux/Slice/approvableDataSlice";

function Unapproved() {
  const dispatch=useDispatch()
    const [isChecked, setIsChecked] = useState(true); // State to hold the checkbox status
    const handleCheckboxChange = (event) => {
      const isChecked = event.target.checked;
      setIsChecked(isChecked); // Update the checkbox state
    };

  const { data,loading,error } = useSelector((state) => state.approvableData);
    const [filteredData,setFilteredData]=useState();
  
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [selectedItem, setSelectedItem] = useState(null);
  const [seeDelete, setSeeDelete] = useState(null);
  const [seeApprove, setSeeApprove] = useState(null);


  const token = localStorage.getItem("token");
  const approveForm = (formId) => {
    dispatch(approveFormFromRedux({ formId, token }));

  };
  
  const disapproveForm = (formId) => {
    dispatch(disapproveFormFromRedux({ formId, token }));

  };
  
  useEffect(() => {
    dispatch(fetchApprovableData());
    
  }, [dispatch]);
  
  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) =>
        isChecked ? item.gender === "male" : item.gender === "female"
      );
      setFilteredData(filtered);
    }
  }, [isChecked, data]);
  
  

if(loading) return <Loader></Loader>
 
  return (
    <div className="bg-white w-[100%] md:pt-[34vh]  pb-[15vh] md:pb-[15vh] pt-[25vh] relative   px-[2%] min-h-[110vh] h-fit flex flex-wrap gap-[1%] justify-center py-4">

         
      
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











   

      {filteredData?.length > 0 ? (
        filteredData.map((item) => (
          <div
            key={item._id}
            className="md:w-[32%] w-[90%] tb:w-[47%] mx-auto md:mx-0 mb-[2%] flex md:h-[40vh] h-fit py-2 md:py-0 hover:scale-[101%] transition-all duration-150 rounded-sm shadow-2xl shadow-slate-900 bg-gray-900"
          >
            <div className="w-[42%] h-[200px] flex flex-col b md:gap-0 gap-2 items-center pt-4">
              <div className="w-[80%] md:h-[70%] h-[60%] 0">
                {
                item.img ?

                <img src={item.img} className="w-full rounded-lg h-full" />:
                <img src={womenProfile} className="w-full mix-blend-normal bg-slate-300 bg-blend-darken rounded-lg h-full" />

                }
              </div>
              <Link
                className="bg-yellow-400 shadow-2xl shadow-slate-900 text-black px-2 font-semibold h-fit flex gap-1 items-center py-[3px] hover:scale-110 transition-all duration-200 w-fit mt-2 rounded-sm" 
                // to={"/details"}
                // onClick={() => {
                //   setSelectedItem(null);
                //   setSelectedItem(item);
                // }}
                to={`/unapproved/${item._id}`}
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
                    setSeeApprove(item._id);
                  }}
                  className="bg-green-500 text-black hover:scale-110 transition-all duration-200 px-2 font-semibold h-fit py-1 w-fit mt-2 flex gap-1 justify-center shadow-2xl shadow-slate-900 items-center rounded-sm"
                >
                  Approve <MdPersonAddAlt1 className="mt-1" />
                </Link>
                <Link
                  onClick={() => {
                    // disapproveForm(item._id)
                    setSeeDelete(item._id);
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
     <p className="text-black flex items-center justify-center  font-extralight ">No data available of {isChecked?"male":"female"}<span className="opacity-0" >s</span>  </p>
      )}
    </div>
  );
}

export default Unapproved;
