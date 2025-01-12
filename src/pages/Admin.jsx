import { Link } from "react-router-dom";
import { TbDatabaseExclamation } from "react-icons/tb";
import { TbDatabaseEdit } from "react-icons/tb";
import { BsChatSquareText } from "react-icons/bs";

import { TfiLayoutSlider } from "react-icons/tfi";

function Admin() {


  return (
    <div className="bg-white md:pt-[25vh] pt-[15vh] w-full md:h-[110vh] fit flex flex-col px-[3vw] gap-2 py-4">
      <div className="w-[90%]  md:my-20 py-4 justify-center mx-auto flex md:flex-row flex-col gap-10">
        <Link
          to={"/unapproved"}
          className="md:w-[18vw] w-[80%] mx-auto md:mx-0 shadow-2xl shadow-black h-[30vh] text-xl flex justify-center items-center font-semibold tracking-wide text-center rounded-sm py-1 text-white flex-col gap-5 px-2  bg-gray-900"
        >
          Unapproved Request
          <TbDatabaseExclamation size={40} />{" "}
        </Link>
        <Link
          to={"/approved"}
          className="md:w-[18vw] w-[80%] mx-auto md:mx-0 shadow-2xl shadow-black h-[30vh] text-xl flex justify-center items-center font-semibold tracking-wide text-center rounded-sm py-1 text-white flex-col gap-5 px-2  bg-gray-900"
        >
          Approved Request
          <TbDatabaseEdit size={40} />{" "}
        </Link>{" "}
        <Link
          to={"/landingPage"}
          className="md:w-[18vw] w-[80%] mx-auto md:mx-0 shadow-2xl shadow-black h-[30vh] text-xl flex justify-center items-center font-semibold tracking-wide text-center rounded-sm py-1 text-white flex-col gap-5 px-2  bg-gray-900"
        >Manage
           slider
          <TfiLayoutSlider size={40} />{" "}
        </Link>{" "}
        <Link
          to={"/query-Messege"}
          className="md:w-[18vw] w-[80%] mx-auto md:mx-0 shadow-2xl shadow-black h-[30vh] text-xl flex justify-center items-center font-semibold tracking-wide text-center rounded-sm py-1 text-white flex-col gap-5 px-2  bg-gray-900"
        >
          Manage messeges
          <BsChatSquareText size={40} />{" "}
        </Link>
        {/* <Link
          to={"/ImagePage"}
          className="w-[18vw] h-[30vh] text-xl flex justify-center items-center font-semibold tracking-wide text-center rounded-sm py-1 text-white flex-col gap-5 px-2  bg-gray-900"
        >
          Add new Committee member 
          <IoImagesSharp size={40} />{" "}
        </Link> */}
      </div>
    </div>
  );
}

export default Admin;
