
import React, { useState } from 'react';
import { MdArrowBack, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [Loading,setLoader]=useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    try {
      const response = await axios.post('http://localhost:5000/api/auth/createAdmin', {
        email,
        password,
      });
setLoader(false)
      setMessage(response.data.message);

      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token); // Save JWT in localStorage

        navigate('/admin'); // Redirect to admin panel
        console.log("success");
      }
      console.log(response);
      console.log(response.data.message);

      // Clear email and password input fields after submission
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data.message : error.message);
      setMessage(error.response ? error.response.data.message : 'An error occurred');
    }
  };
  if (Loading) return <Loader></Loader>;


  return (
    <div className="flex pt-[25vh] flex-col fixed w-[100%] z-50 gap-4 items-center justify-center h-[80vh] bg-white">
      <div className="md:w-[40%] w-[90%] md:h-[7vh] h-[7vh] tb-h-[5vh] ">
        <button onClick={() => navigate(-1)} className="bg-gray-900 flex items-center justify-center rounded-sm md:text-2xl tb:text-xl tb:px-10 md:px-3 font-normal gap-2 py-1 hover:bg-black hover:scale-[101%] shadow-md shadow-gray-600 text-white w-fit px-2 pr-4 h-[90%]">
          <MdArrowBack />
          back
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col tb:text-xl md:text-lg  gap-2.5 bg-white h-fit md:h-fit shadow-xl shadow-gray-300 md:p-7 md:w-[40%] p-2 w-[90%] rounded-sm font-sans">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-900 font-bold">Email</label>
          <div className="border-b-[2px] h-12 tb:h-[80px] md:h-12  flex items-center transition-all ">
            <input
              autoComplete="current-password"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="rounded-md border-none w-full h-full px-4 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-900 font-bold">Password</label>
          <div className="border-b-[2px]   h-12 tb:h-[80px] md:h-12 flex items-center transition-all  relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="rounded-md border-none w-full h-full px-4 focus:outline-none"
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
