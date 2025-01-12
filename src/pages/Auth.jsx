import { useState } from "react";
import {  MdVisibility, MdVisibilityOff } from "react-icons/md";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
const apiUrl = import.meta.env.VITE_API_BASE_URL;


function Auth() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Loading, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/createAdmin`,
        {
          email,
          password,
        }
      );
      setLoader(false);
      setMessage(response.data.message);

      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token); // Save JWT in localStorage

        navigate("/admin"); // Redirect to admin panel
      }
   

      // Clear email and password input fields after submission
      setEmail("");
      setPassword("");
    } catch (error) {
      setLoader(false);

      console.error(
        "Login failed:",
        error.response ? error.response.data.message : error.message
      );
      setMessage(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };
  if (Loading) return <Loader></Loader>;

  return (
    <div className="flex md:pt-[5vh] flex-col  fixed w-[100%]  gap-4 items-center justify-center h-[80vh] ">
      <div className="md:w-[40%] w-[90%] md:h-[7vh] h-[7vh] tb-h-[5vh] ">
      
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2.5 bg-white shadow-xl shadow-gray-300 md:p-7 md:w-[40%] p-2 w-[90%] rounded-sm font-sans"
      >
      <div className="flex flex-col">
       
       <div className=" border-b-[2px] h-12 flex bg-white items-center transition-all ">
         <input
           autoComplete="current-password"
           type="email"
           id="email"
           required={true}
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           placeholder="You name"
           className="rounded-md border-none bg-white  w-full h-full px-4 outline-none
 focus:outline-none"
         />
       </div>
     </div>

        <div className="flex flex-col">
   
          <div className="border-b-[2px]  h-12 flex items-center transition-all  relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              required={true}

              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="rounded-md outline-none
 border-b-[1px] w-full h-full px-4 focus:outline-none"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 bg-gray-900 shadow-sm shadow-gray-600 text-white font-medium text-base rounded-lg h-12 w-full cursor-pointer hover:bg-black hover:scale-[101%]"
        >
          Submit
        </button>
        <h1>{message}</h1>
      </form>
      

    </div>
  );
}

export default Auth;
