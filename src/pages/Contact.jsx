import  { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [feedback, setFeedback] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");
  const [Loading, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
   
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/postFeedback`,
        {
          name,
          contact,
          feedback,
        }
      );
      setName("")
      setContact("")
      setFeedback("")
      setLoader(false);
      setMessage(response.data.message);

     toast.success(response.data.message);


      // Clear email and password input fields after submission
     
    } catch (error) {
      toast.error(
      
        error.response ? error.response.data.message : error.message
      );
     
      setLoader(false)
    //   if(response.data.full){
    //     toast.success("inbox full")
    // }
    //   toast.failure("inbox full")
      setMessage(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };
  if (Loading) return <Loader></Loader>;

  return (
    <div className="flex pt-[8vh]  flex-col fixed w-[100%] z-30 gap-4 items-center justify-center min-h-[80vh] bg-white">
      <div className="md:hidden w-[90%] h-[7vh]">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-900 flex items-center justify-center rounded-sm md:text-2xl font-normal gap-2 py-1 hover:bg-black hover:scale-[101%] shadow-md shadow-gray-600 text-white w-fit px-2 pr-4 h-[90%]"
        >
          <MdArrowBack />
          back
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2.5 bg-white shadow-xl shadow-gray-300 md:p-7 md:w-[40%] p-2 w-[90%] rounded-sm font-sans"
      >
        <div className="flex flex-col">
       
          <div className=" border-b-[2px] h-12 flex items-center transition-all ">
            <input
              autoComplete="current-password"
              type="text"
              id="email"
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="You name"
              className="rounded-md border-none w-full h-full px-4 outline-none
 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col">
         
          <div className=" border-b-[2px]  h-12 flex items-center transition-all  relative">
            <input
              id="password"
              value={contact}
              required={true}

              onChange={(e) => setContact(e.target.value)}
              placeholder="contact  number"
              className="rounded-md outline-none
 border-b-[1px] w-full h-full px-4 focus:outline-none"
              autoComplete="current-password"
            />
          </div>

        </div>{" "}
        <div className="flex flex-col">
       
          <div className=" border-b-[2px]  h-12 flex items-center transition-all  relative">
            <input
              value={feedback}
              required={true}

              placeholder="send your messege"
              onChange={(e) => setFeedback(e.target.value)}
              className="rounded-md border-none w-full h-full px-4 focus:outline-none"
              autoComplete="current-password"
            />
           
          </div>
        </div>
        <button
          type="submit"
          className="mt-5 bg-gray-900 shadow-sm shadow-gray-600 text-white font-medium text-base rounded-lg h-12 w-full cursor-pointer hover:bg-black hover:scale-[101%]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
