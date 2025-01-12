
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import Loader from "../components/Loader";
import { MdDelete } from "react-icons/md";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedback } from "../redux/Slice/feedbackSlice";

function MessegePage() {
  const { data, loading, error } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [seeDelete, setSeeDelete] = useState(null);

  const token = localStorage.getItem("token");

  const deleteMessege = async (id) => {
    try {
      await axios.delete(
        `https://forumserver-f93h.onrender.com/api/auth/DeleteFeedback/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchFeedback());
      toast.success("Feedback deleted successfully");
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast.error("Feedback not deleted ");

    }
  };

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p >Error: {error.message}</p>;

  return (
    <div className="bg-white w-[100%] relative pb-[15vh] md:pt-[34vh] pt-[25vh] px-[2%] min-h-[110vh] h-fit flex flex-wrap gap-[1%] justify-center py-4">
      <Link
        onClick={() => navigate(-1)}
        className="bg-gray-900 fixed z-50 top-[24vh] left-10 md:flex hidden items-center justify-center rounded-sm md:text-2xl font-normal gap-2 py-1 hover:bg-black hover:scale-[101%] shadow-md shadow-gray-600 text-white w-fit px-2 pr-4 h-fit"
      >
        <MdArrowBack />
        Back
      </Link>
      <Link
        onClick={() => navigate(-1)}
        className="w-fit px-4 pl-2 flex md:hidden absolute top-[15vh] left-[5vw] justify-center items-center font-semibold tracking-wide text-center rounded-sm py-1 text-white h-fit bg-gray-900"
      >
        <IoIosArrowRoundBack size={25} />
        Back
      </Link>

      {seeDelete && (
        <div className="md:w-[25vw] w-[80%] h-[25vh] flex items-center flex-col justify-center gap-6 rounded-sm shadow-2xl shadow-slate-900 md:bg-slate-100 bg-slate-300 fixed md:top-[20vh] top-[30vh] z-[100]">
          <h1 className="font-semibold">Want to delete?</h1>
          <div>
            <Link
              onClick={() => setSeeDelete(null)}
              className="px-2 bg-blue-500 rounded-sm font-semibold py-1 text-xl"
            >
              Cancel
            </Link>{" "}
            <Link
              onClick={() => {
                deleteMessege(seeDelete._id);
                setSeeDelete(null);
              }}
              className="px-2 bg-[#f60100] rounded-sm font-semibold py-1 text-xl"
            >
              Delete
            </Link>
          </div>
        </div>
      )}

      {data?.length > 0 ? (
        data.map((item) => (
          <div
            key={item._id}
            className="md:w-[32%] w-[90%] md:p-4 p-2 tb:w-[47%] mx-auto md:mx-0 mb-[2%] flex flex-col md:h-[40vh] h-fit py-2 hover:scale-[101%] transition-all tb:min-h-[250px] duration-150 rounded-sm shadow-2xl shadow-slate-900 bg-gray-900"
          >
            <h1 className="text-white tracking-wider font-bold">
              Name: {item.name}
            </h1>
            <h1 className="text-white tracking-wider font-semibold">
              Contact Number: {item.contact}
            </h1>
            <h1 className="text-white font-thin px-2 break-words rounded-md w-[100%] tb:h-[200px] h-fit py-1 bg-gray-800 mt-2">
              Message: {item.feedback}
            </h1>
            <div className="md:w-fit w-full mb-4 flex items-center justify-start md:px-2 px-10 gap-2">
              <Link
                onClick={() => setSeeDelete(item)}
                className="bg-[#f60100] text-black text-sm hover:scale-110 transition-all duration-200 px-2 shadow-2xl shadow-slate-900 font-semibold h-fit py-1 w-fit mt-2 flex gap-1 justify-center items-center rounded-sm"
              >
                <MdDelete />
                Delete
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No messages found</p>
      )}
    </div>
  );
}

export default MessegePage;
