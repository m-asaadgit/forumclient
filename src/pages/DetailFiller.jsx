import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdPerson } from "react-icons/md";
import { MdPerson2 } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

import Loader from "../components/Loader";
import { MdArrowBack } from "react-icons/md";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

function DetailFiller() {
  // const navigate = useNavigate();
  const [otpFiller, setOtpFiller] = useState(Array(6).fill("")); // Initialize OTP with 6 empty fields
  const [gotOtp, setGotOtp] = useState(true);
  const [laoding, setloading] = useState(false);
  const [isChecked, setIsChecked] = useState(true); // State to hold the checkbox status

  const [genderSetter, setGenderSetter] = useState("male");
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked); // Update the checkbox state
  };

  const [formData, setFormData] = useState({
    name: "",
    father: "",
    age: "",
    mother: "",
    gender: "",
    email: "",
    contact: "",
    permanent: "",
    temporary: "",
    otp: "",

    hadTenth: false,
    tenthInstitute: "",
    tenthYear: "",
    // tenthImg: "",
    tenthPercent: "",

    hadTwelfth: false,
    twelfthInstitute: "",
    twelfthYear: "",
    // twelfthImg: "",
    twelfthPercent: "",

    hadBachelor: false,
    bachelorInstitute: "",
    bachelorYear: "",
    // bachelorImg: "",
    bachelorPercent: "",

    hadMaster: false,
    masterInstitute: "",
    masterYear: "",
    // masterImg: "",
    masterPercent: "",

    employed: false,

    workingAs: "",
    dropReason: "",

    workingAt: "",
    img: "",
  });

  const handleReset = () => {
    setOtpFiller(Array(6).fill(""))
    setFormData({
      name: "",
      father: "",
      mother: "",
      age: "",
      email: "",
      contact: "",
      permanent: "",
      temporary: "",
      gender: "",
      hadTenth: false,
      tenthInstitute: "",
      tenthYear: "",
      tenthPercent: "",
      otp:"",
      hadTwelfth: false,
      twelfthInstitute: "",
      twelfthYear: "",
      twelfthPercent: "",
      hadBachelor: false,
      bachelorInstitute: "",
      bachelorYear: "",
      bachelorPercent: "",
      hadMaster: false,
      masterInstitute: "",
      masterYear: "",
      masterPercent: "",
      employed: false,
      workingAs: "",
      dropReason: "",
      workingAt: "",
      img: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "file" && files
          ? files[0]
          : type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    setloading(true);
    toast.info(`Sending OTP to ${formData.email}`);

    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/verify-mail`,
        {
          email: formData.email,
        }
      );
      setGotOtp(true);

      // Provide more user-friendly feedback
      if (response.data.success) {
        toast.success(response.data.message); // Assuming message is returned in success case
      } else {
        toast.error(response.data.message);
      }

      setloading(false);
    } catch (err) {
      // Corrected the typo 'messege' to 'message'
      toast.error(err.response?.data.message || "An error occurred");
      setloading(false);
      return;
    }
  };
  
  const handleOTPChange = (e, index) => {
    if( e.nativeEvent.data==null || formData.otp.length <6 ){
    
      const value = e.target.value;
      if (/[^0-9]/.test(value)) return; // Allow only numbers
  
  
      
      // Update otpFiller array
      const newOtp = [...otpFiller];
      newOtp[index] = value;
      setOtpFiller(newOtp);
  
      // Update formData.otp as a string
      let otpValue = "";
      otpValue= newOtp.join(""); // Combine array values into a single string
      setFormData((prevFormData) => ({
        ...prevFormData,
        otp: otpValue, // Assign the joined OTP string to formData.otp
      }));
  
      // Automatically focus on the next field if the current one is filled
      if (value && index < 5) {
        document.getElementById(`otp-field-${index + 1}`).focus();
      }
        }


  };

  const handleOTPKeyDown = (e, index) => {
    // Allow backspace to move focus to the previous field
    if (e.key === "Backspace" && !otpFiller[index] && index > 0) {
      document.getElementById(`otp-field-${index - 1}`).focus();
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.gender = genderSetter;
  
    // Check file format
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
    const file = formData.img;
  
    if (file && !allowedFormats.includes(file.type)) {
      toast.error(
        "Incorrect file format. Please upload a valid image file (JPG, JPEG, PNG)."
      );
      return;
    }
  
    setloading(true); // Start loading
    const data = new FormData();
  
    // Append key-value pairs, skipping empty fields
    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
        
      }
    }


    try {
      // Make API request
      const response = await axios.post(`${apiUrl}/api/auth/createDetail`, data,  {    headers: {       "Content-Type": "multipart/form-data",
      }}
      );
  setGotOtp(false)
      toast.success("Form successfully sent to get approved");
      handleReset()
      if (response.data.success) {
        setloading(false); // Stop loading
      }
    } catch (error) {
      setloading(false);
      toast.error(
        error.response?.data.message || "Error submitting form, please try again."
      );
    }
  };
  
 
  useEffect(() => {
    isChecked ? setGenderSetter("male") : setGenderSetter("female");
    handleReset();
  }, [isChecked]);

  return (
    <div className="flex w-full relative md:py-[15vh] tb:pt-[18vh] pb-[0vh] pt-[20vh]  md:z-[2000] items-center justify-center min-h-screen bg-slate-100">
      {gotOtp && (
        <div className="fixed top-0  bg-black/40 left-0 w-full h-full flex items-center justify-center z-[2001]">
          <div className=" relative flex flex-col items-center pb-5 pt-10 bg-b md:w-[40%] tb:w-[70%] w-[90%] rounded-sm h-fit  md:rounded-xl md:z-[2001] ">
            <RxCross1
              onClick={() => setGotOtp(false)}
              className="text-zinc-200 absolute top-2 right-2 text-2xl  "
            ></RxCross1>

            <h1 className="text-zinc-300 font-ub text-2xl mb-4 capitalize">
              Enter your OTP
            </h1>
            <div className="flex w-[80%]  justify-center space-x-2">
              {otpFiller.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-field-${index}`}
                  type="number"
                  value={digit}
                  onChange={(e) => handleOTPChange(e, index)}
                  onKeyDown={(e) => handleOTPKeyDown(e, index)}
                  // placeholder="0"
                  maxLength="1"
                  className="w-12 h-12 text-center bg-transparent  border-b-2 text-zinc-400 border-black/90 shadow-md shadow-black text-2xl  rounded-sm focus:outline-none focus:none outline-none transition"
                />
              ))}
            </div>
            <div
              className=" py-4 md:w-[70%] tb:w-[40%] w-[80%] pt-10 md:pt-8 flex  justify-between md:px-10"
            >
              <button
              onClick={(e) => handleSubmit(e)}
              
              className="bg-green-600 px-2 py-1 rounded-sm font-semibold capitalize  ">
                submit OTP
              </button>
              <button
                onClick={(e) => handleEmailSubmit(e)}
                className="bg-blue-600 px-2 py-1 rounded-sm font-semibold capitalize  "
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      )}




      <Link
        to={"/"}
        className="bg-gray-900 fixed top-5 left-10 z-50  md:flex hidden items-center justify-center rounded-sm md:text-2xl font-normal gap-2 py-1 hover:bg-black hover:scale-[101%] shadow-md shadow-gray-600 text-white w-fit px-2 pr-4 h-fit"
      >
        <MdArrowBack />
        back
      </Link>




      <div className="absolute  bg-gray-200 px-4 py-2 rounded-md shadow-lg z-[500] shadow-zinc-400 flex items-center gap-3 md:top-5 top-[12vh] md:left-[15vw] left-[5vw]">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <div className="w-10 h-6  bg-pink-400 rounded-full peer-checked:bg-blue-500 peer-checked:ring-2 peer-checked:ring-gray-100 peer-focus:ring-2 peer-focus:ring-gray-300 transition-all"></div>
          <div className="w-4 h-4 bg-white rounded-full shadow-md absolute top-[4px] left-[2px] peer-checked:translate-x-4 transition-transform"></div>
        </label>
        <span className="font-bold"> {!isChecked ? "Female" : "Male"}</span>
      </div>


      {isChecked ? (
        <form
          className="bg-white  md:p-10 relative rounded-lg shadow-xl w-[95%] mx-auto md:max-w-[70%] space-y-2 md:space-y-6"
          onSubmit={handleEmailSubmit}
        >
          <h2 className=" tracking-wide  flex  justify-center md-pl-0 items-center  gap-1 text-gray-900 md:pr-10  md:text-4xl text-2xl font-bold ctext-lg capitalize md:font-extrabold md:mb-6 mb-1 pt-4 md:pt-0 text-center">
            Fill your profile <MdPerson className="mt-1"></MdPerson>
          </h2>
          {/* Basic Information Section */}
          <div className="flex  md:px-0 px-4 min-w-[100%] flex-wrap gap-[1%]">
            <div className=" md:w-[39%] w-[75%]  flex flex-col md:my-0 my-2 ">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                placeholder="Your Name"
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-300 shadow-lg  shadow-gray-200 text-black font-semibold focus:outline-none"
                required
              />
            </div>
            <div className=" flex md:hidden  w-[24%] my-2  flex-col ">
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                required
              />
            </div>
            <div className=" md:w-[29%] w-[48%] mr-[1%] flex md:flex-col  ">
              <input
                type="text"
                id="father"
                name="father"
                placeholder="father name"
                value={formData.father}
                onChange={handleChange}
                className="w-full p-2 rounded-sm bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                required
              />
            </div>
            <div className=" md:w-[29%] w-[50%] flex flex-col ">
              <input
                type="text"
                id="mother"
                name="mother"
                placeholder="mother name"
                value={formData.mother}
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="flex  md:px-0 px-4  min-w-[100%] flex-wrap gap-[1%]">
            <div className=" hidden md:flex md:w-[17%] w-[20%]  flex-col ">
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                required
              />
            </div>
            <div className=" md:w-[40%] w-[48%] mr-[1%] flex md:flex-col  ">
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="Your contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                required
              />
            </div>
            <div className="  md:w-[40%] w-[50%] flex flex-col ">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                required
              />
            </div>
          </div>
          {/* Contact Information

  {/* Address Information */}
          <div className="flex  tb:gap-4  md:px-0 px-4">
            <div className="md:w-[49%] w-[48%] mr-1.5">
              <textarea
                type="text"
                id="permanent"
                name="permanent"
                placeholder=" Permanent Address"
                value={formData.permanent}
                onChange={handleChange}
                className="w-full p-2 resize-none rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none0"
                required
              />
            </div>
            <div className="md:w-[49%] w-[50%]">
              <textarea
                type="text"
                id="temporary"
                name="temporary"
                placeholder="Temporary Address"
                value={formData.temporary}
                onChange={handleChange}
                className="w-full p-2 resize-none rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none0"
                required
              />
            </div>
          </div>
          {/* Academic Information */}
          {/* Employment Information */}
          <div className=" flex flex-wrap px-4 py-4 md:py-0  md:px-0 gap-8 md:gap-4 ">
            <div className="md:w-[49%] tb:w-[47%]  md:mb-6 w-full flex  h-fit flex-col  md:px-0  md:gap-4 gap-2 md:justify-center ">
              <div className="  flex md:gap-4 gap-2 items-center">
                <label className="md:block md:px-0 px-4 text-gray-900 font-bold md:text-lg text-sm md:mb-0 ">
                  10th
                </label>
                <input
                  type="checkbox"
                  name="hadTenth"
                  checked={formData.hadTenth}
                  onChange={handleChange}
                  className="w-4 h-4 text-black"
                />
                <label
                  htmlFor="employed"
                  className="ml-2 font-semibold md:text-md text-sm text-gray-900"
                >
                  {" "}
                  {!formData.hadTenth && <p>Check if attempted 10th</p>}
                </label>
              </div>
              <div className=" h-fit">
                {formData.hadTenth && (
                  <div className="">
                    <div className="w-full flex flex-row md:my-2 gap-[3%]   md:h-[7vh] ">
                      <input
                        type="text"
                        id="tenthInstitute"
                        name="tenthInstitute"
                        placeholder="Institute Name"
                        value={formData.tenthInstitute}
                        onChange={handleChange}
                        className="w-[100%] p-2  rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadTenth}
                      />
                    </div>
                    <div className="w-full flex items-center   h-[10vh]">
                      {/* <label
              className="block px-2 w-[20vw]     text-gray-900 font-bold text-lg mb-2"
              htmlFor="tenthYear"
            >
              Year of passing
            </label> */}
                      <input
                        type="text"
                        id="tenthYear"
                        name="tenthYear"
                        placeholder="Year of passing"
                        value={formData.tenthYear}
                        onChange={handleChange}
                        className="md:w-[40%] w-[60%] mr-2  p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadTenth}
                      />{" "}
                      <input
                        type="text"
                        id="tenthPercent"
                        placeholder="% or cgpa"
                        name="tenthPercent"
                        value={formData.tenthPercent}
                        onChange={handleChange}
                        className="w-[37%]  p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadTenth}
                      />{" "}
                      {/* <label
              className="block px-2 w-[15vw] text-right  text-gray-900 font-bold text-lg mb-2"
              htmlFor="tenthPercent"
            >
              Percentage
            </label> */}
                    </div>
                  </div>
                )}
              </div>
            </div>{" "}
            <div className="md:w-[49%] tb:w-[47%]  md:mb-6 w-full flex  h-fit flex-col  md:px-0  md:gap-4 gap-2 md:justify-center ">
              <div className="  flex md:gap-4 gap-2 items-center">
                <label className="md:block md:px-0 px-4 text-gray-900 font-bold md:text-lg text-sm md:mb-0 ">
                  12th
                </label>
                <input
                  type="checkbox"
                  name="hadTwelfth"
                  checked={formData.hadTwelfth}
                  onChange={handleChange}
                  className="w-4 h-4 text-black"
                />
                <label
                  htmlFor="hadTwelfth"
                  className="ml-2 font-semibold md:text-md text-sm text-gray-900"
                >
                  {" "}
                  {!formData.hadTwelfth && <p> Check if attempted 12th</p>}
                </label>
              </div>
              <div className=" h-fit">
                {formData.hadTwelfth && (
                  <div className="">
                    <div className="w-full flex flex-row md:my-2 gap-[3%]   md:h-[7vh] ">
                      <input
                        type="text"
                        id="twelfthInstitute"
                        name="twelfthInstitute"
                        value={formData.twelfthInstitute}
                        placeholder="Institute Name"
                        onChange={handleChange}
                        className="w-[100%] p-2  rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadTwelfth}
                      />
                    </div>
                    <div className="w-full flex items-center   h-[10vh]">
                      {/* <label
              className="block px-2 w-[20vw]     text-gray-900 font-bold text-lg mb-2"
              htmlFor="tenthYear"
            >
              Year of passing
            </label> */}
                      <input
                        type="text"
                        id="twelfthYear"
                        name="twelfthYear"
                        value={formData.twelfthYear}
                        onChange={handleChange}
                        placeholder="Year of passing"
                        className="md:w-[40%] w-[60%] mr-2  p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadTwelfth}
                      />{" "}
                      <input
                        type="text"
                        id="twelfthPercent"
                        name="twelfthPercent"
                        value={formData.twelfthPercent}
                        onChange={handleChange}
                        placeholder="% or cgpa"
                        className="w-[37%]  p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadTwelfth}
                      />{" "}
                      {/* <label
              className="block px-2 w-[15vw] text-right  text-gray-900 font-bold text-lg mb-2"
              htmlFor="tenthPercent"
            >
              Percentage
            </label> */}
                    </div>
                  </div>
                )}
              </div>
            </div>{" "}
            <div className="md:w-[49%] tb:w-[47%] md:mb-6  w-full flex   h-fit flex-col     md:gap-4 gap-2 md:justify-center ">
              <div className=" flex gap-2 items-center">
                <label className="md:block md:px-0 px-4 md:w-[150px] w-fit   text-gray-900 font-bold  text-sm md:text-md md:mb-0 ">
                  Bachelor&#39;s Degree
                </label>
                <input
                  type="checkbox"
                  name="hadBachelor"
                  checked={formData.hadBachelor}
                  onChange={handleChange}
                  className="w-4 h-4 text-black"
                />
                <label
                  htmlFor="hadBachelor"
                  className="ml-2 font-semibold md:text-md text-sm text-gray-900"
                >
                  {" "}
                  {!formData.hadBachelor && (
                    <p>Check if attempted Bachelor&#39;s Degree</p> //+
                  )}
                </label>
              </div>
              <div className=" h-fit">
                {formData.hadBachelor && (
                  <div className=" ">
                    <div className="w-full flex my-2 gap-[2%]  md:h-[7vh] ">
                      <input
                        type="text"
                        id="bachelorInstitute"
                        name="bachelorInstitute"
                        value={formData.bachelorInstitute}
                        onChange={handleChange}
                        placeholder="Institute Name"
                        className="w-[100%] p-2  rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadBachelor}
                      />
                    </div>{" "}
                    <div className="w-full flex items-center   h-[10vh]">
                      {/* <label
              className="block px-2 w-[20vw]     text-gray-900 font-bold text-lg mb-2"
              htmlFor="tenthYear"
            >
              Year of passing
            </label> */}
                      <input
                        type="text"
                        id="bachelorYear"
                        name="bachelorYear"
                        value={formData.bachelorYear}
                        onChange={handleChange}
                        placeholder="Year of passing"
                        className="md:w-[39%] w-[60%] mr-2 p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadBachelor}
                      />
                      <input
                        type="text"
                        id="bachelorPercent"
                        name="bachelorPercent"
                        value={formData.bachelorPercent}
                        onChange={handleChange}
                        placeholder="% or cgpa"
                        className="w-[38%]  p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadBachelor}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>{" "}
            <div className="md:w-[49%] tb:w-[47%] md:mb-6  w-full flex  items-center h-fit flex-col     md:gap-4 gap-2 md:justify-center ">
              <div className=" flex md:gap-4 gap-2 items-center">
                <label className="md:block md:px-0 px-4 md:w-[150px]  text-gray-900 font-bold md:text-md text-sm md:mb-0 ">
                  Master Degree
                </label>
                <input
                  type="checkbox"
                  name="hadMaster"
                  checked={formData.hadMaster}
                  onChange={handleChange}
                  className="w-4 h-4 text-black"
                />
                <label
                  htmlFor="masters"
                  className="ml-2 font-semibold md:text-md text-sm text-gray-900"
                >
                  {" "}
                  {!formData.hadMaster && (
                    <p> Check if attempted Master Degree</p>
                  )}
                </label>
              </div>
              <div className=" h-fit">
                {formData.hadMaster && (
                  <div className=" ">
                    <div className="w-full flex my-2 gap-[2%]  md:h-[7vh] ">
                      <input
                        type="text"
                        id="masterInstitute"
                        name="masterInstitute"
                        value={formData.masterInstitute}
                        onChange={handleChange}
                        placeholder="Institute Name"
                        className="w-[100%] p-2  rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadMaster}
                      />
                    </div>{" "}
                    <div className="w-full flex items-center   h-[10vh]">
                      {/* <label
              className="block px-2 w-[20vw]     text-gray-900 font-bold text-lg mb-2"
              htmlFor="tenthYear"
            >
              Year of passing
            </label> */}
                      <input
                        type="text"
                        id="masterYear"
                        name="masterYear"
                        value={formData.masterYear}
                        onChange={handleChange}
                        placeholder="Year of passing"
                        className="md:w-[40%] w-[60%] mr-2 p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadMaster}
                      />
                      <input
                        type="text"
                        id="masterPercent"
                        name="masterPercent"
                        value={formData.masterPercent}
                        onChange={handleChange}
                        placeholder="% or cgpa"
                        className="w-[38%] p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadMaster}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>{" "}
          </div>
          {(!formData.hadBachelor ||
            !formData.hadTenth ||
            !formData.hadTwelfth) && (
            <div className="w-full md:px-0 px-4 items-center flex flex-col h-[20vh]">
              <label
                className="block w-full text-gray-900 font-bold md:text-lg text-sm mb-2"
                htmlFor="dropReason"
              >
                What was the reason you decided to discontinue your studies?
              </label>
              <textarea
                id="dropReason"
                name="dropReason"
                value={formData.dropReason}
                onChange={handleChange}
                className="w-[100%] h-[12vh] p-2 resize-none rounded-sm bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                required={!!formData.dropReason}
              />
            </div>
          )}
          <div className="w-full flex md:min-h-[13vh] h-fit px-4 md:px-0 md:pt-0    gap-4">
            <div>
              <label className="block text-gray-900 font-bold md:text-lg text-sm  mb-4 ">
                Employed
              </label>
              <input
                type="checkbox"
                name="employed"
                checked={formData.employed}
                onChange={handleChange}
                className="w-4 h-4 text-black"
              />
              <label
                htmlFor="employed"
                className="ml-2 font-semibold text-gray-900"
              >
                {!formData.employed && <p> Check if employed</p>}
              </label>
            </div>
            {formData.employed && (
              <div className="flex  flex-col tb:flex-row md:gap-10 gap-2">
                <div>
                  <label
                    className="block text-gray-900 font-bold md:text-lg text-sm mb-2"
                    htmlFor="workingAt"
                  >
                    Working At
                  </label>
                  <input
                    type="text"
                    id="workingAt"
                    name="workingAt"
                    value={formData.workingAt}
                    onChange={handleChange}
                    className="w- p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                    required={formData.employed}
                  />{" "}
                </div>{" "}
                <div>
                  <label
                    className="block text-gray-900 font-bold  text-sm md:text-lg mb-2"
                    htmlFor="workingAt"
                  >
                    Working As
                  </label>
                  <input
                    type="text"
                    id="workingAs"
                    name="workingAs"
                    value={formData.workingAs}
                    onChange={handleChange}
                    className="w- p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                    required={formData.employed}
                  />{" "}
                </div>
              </div>
            )}
          </div>{" "}
          {/* Image Upload */}
          <div className="mb-6 px-4 md:px-0">
            <label
              className="block text-gray-900 font-bold md:text-lg text-sm mb-2"
              htmlFor="img"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={handleChange}
              key={formData.img || "img-key"} // Reset key to trigger re-render on formData.img reset
              className="w-full p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
              required
            />
          </div>
          {/* Buttons */}
          <div className="flex flex-col md:flex-row px-4 md:px-0 py-6 md:py-0  gap-4">
            <button
              type="submit"
              className="w-full md:w-1/2 p-2 text-white bg-gray-900 rounded font-bold hover:bg-black"
            >
              Request
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full md:w-1/2 p-2 bg-red-500 rounded text-white font-bold hover:bg-red-600"
            >
              Reset
            </button>
          </div>
          {laoding && (
            /* From Uiverse.io by SchawnnahJ */
            <Loader></Loader>
          )}
        </form>
      ) : (
        <form
          className="bg-white  md:p-10 relative rounded-lg shadow-xl w-[95%] mx-auto md:max-w-[70%] space-y-2 md:space-y-6"
          onSubmit={handleEmailSubmit}
        >
          <h2 className=" tracking-wide  flex  justify-center md-pl-0 items-center  gap-1 text-gray-900 md:pr-10  md:text-4xl text-2xl font-bold ctext-lg capitalize md:font-extrabold md:mb-6 mb-1 pt-4 md:pt-0 text-center">
            Fill your profile <MdPerson2 className="mt-1"></MdPerson2>
          </h2>
          {/* Basic Information Section */}
          <div className="flex  md:px-0  px-4 min-w-[100%] flex-wrap  gap-[1%]">
            <div className=" md:w-[50%] mb-4 w-[75%]  flex flex-col md:my-0 my-2 ">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                placeholder="Your Name"
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-300 shadow-lg  shadow-gray-200 text-black font-semibold focus:outline-none"
                required
              />
            </div>
            <div className=" flex md:hidden  w-[24%] my-2   flex-col ">
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                required
              />
            </div>
            <div className=" md:w-[48%] mb-4 w-[48%]  mr-[1%] flex md:flex-col  ">
              <input
                type="text"
                id="father"
                name="father"
                placeholder="father name"
                value={formData.father}
                onChange={handleChange}
                className="w-full p-2 rounded-sm bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                required
              />
            </div>
            <div className="   w-[50%] flex flex-col ">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                required
              />
            </div>
            <div className=" hidden md:flex md:w-[48%] w-[20%]  flex-col ">
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                required
              />
            </div>
          </div>
          {/* Contact Information

  {/* Address Information */}
          <div className="flex  md:px-0  px-[3.5%] tb:px-4 min-w-[100%] flex-wrap  gap-[1%]">
            <div className="md:w-[50%] w-[48%] mr-1.5">
              <textarea
                type="text"
                id="permanent"
                name="permanent"
                placeholder=" Permanent Address"
                value={formData.permanent}
                onChange={handleChange}
                className="w-full p-2 resize-none rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none0"
                required
              />
            </div>
            <div className="md:w-[48%] w-[49%]">
              <textarea
                type="text"
                id="temporary"
                name="temporary"
                placeholder="Temporary Address"
                value={formData.temporary}
                onChange={handleChange}
                className="w-full p-2 resize-none rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none0"
                required
              />
            </div>
          </div>
          {/* Academic Information */}
          {/* Employment Information */}
          <div className=" flex flex-wrap px-4 py-4 md:py-0  md:px-0 gap-8 md:gap-4 ">
            <div className="md:w-[49%] tb:w-[47%]  md:mb-6 w-full flex  h-fit flex-col  md:px-0  md:gap-4 gap-2 md:justify-center ">
              <div className="  flex md:gap-4 gap-2 items-center">
                <label className="md:block md:px-0 px-4 text-gray-900 font-bold md:text-lg text-sm md:mb-0 ">
                  10th
                </label>
                <input
                  type="checkbox"
                  name="hadTenth"
                  checked={formData.hadTenth}
                  onChange={handleChange}
                  className="w-4 h-4 text-black"
                />
                <label
                  htmlFor="employed"
                  className="ml-2 font-semibold md:text-md text-sm text-gray-900"
                >
                  {" "}
                  {!formData.hadTenth && <p>Check if attempted 10th</p>}
                </label>
              </div>
              <div className=" h-fit">
                {formData.hadTenth && (
                  <div className="">
                    <div className="w-full flex flex-row md:my-2 gap-[3%]   md:h-[7vh] ">
                      <input
                        type="text"
                        id="tenthInstitute"
                        name="tenthInstitute"
                        placeholder="Institute Name"
                        value={formData.tenthInstitute}
                        onChange={handleChange}
                        className="w-[100%] p-2  rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadTenth}
                      />
                    </div>
                    <div className="w-full flex items-center   h-[10vh]">
                      {/* <label
              className="block px-2 w-[20vw]     text-gray-900 font-bold text-lg mb-2"
              htmlFor="tenthYear"
            >
              Year of passing
            </label> */}
                      <input
                        type="text"
                        id="tenthYear"
                        name="tenthYear"
                        placeholder="Year of passing"
                        value={formData.tenthYear}
                        onChange={handleChange}
                        className="md:w-[40%] w-[60%] mr-2  p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadTenth}
                      />{" "}
                      <input
                        type="text"
                        id="tenthPercent"
                        placeholder="% or cgpa"
                        name="tenthPercent"
                        value={formData.tenthPercent}
                        onChange={handleChange}
                        className="w-[37%]  p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadTenth}
                      />{" "}
                      {/* <label
              className="block px-2 w-[15vw] text-right  text-gray-900 font-bold text-lg mb-2"
              htmlFor="tenthPercent"
            >
              Percentage
            </label> */}
                    </div>
                  </div>
                )}
              </div>
            </div>{" "}
            <div className="md:w-[49%] tb:w-[47%]  md:mb-6 w-full flex  h-fit flex-col  md:px-0  md:gap-4 gap-2 md:justify-center ">
              <div className="  flex md:gap-4 gap-2 items-center">
                <label className="md:block md:px-0 px-4 text-gray-900 font-bold md:text-lg text-sm md:mb-0 ">
                  12th
                </label>
                <input
                  type="checkbox"
                  name="hadTwelfth"
                  checked={formData.hadTwelfth}
                  onChange={handleChange}
                  className="w-4 h-4 text-black"
                />
                <label
                  htmlFor="hadTwelfth"
                  className="ml-2 font-semibold md:text-md text-sm text-gray-900"
                >
                  {" "}
                  {!formData.hadTwelfth && <p> Check if attempted 12th</p>}
                </label>
              </div>
              <div className=" h-fit">
                {formData.hadTwelfth && (
                  <div className="">
                    <div className="w-full flex flex-row md:my-2 gap-[3%]   md:h-[7vh] ">
                      <input
                        type="text"
                        id="twelfthInstitute"
                        name="twelfthInstitute"
                        value={formData.twelfthInstitute}
                        placeholder="Institute Name"
                        onChange={handleChange}
                        className="w-[100%] p-2  rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadTwelfth}
                      />
                    </div>
                    <div className="w-full flex items-center   h-[10vh]">
                      {/* <label
              className="block px-2 w-[20vw]     text-gray-900 font-bold text-lg mb-2"
              htmlFor="tenthYear"
            >
              Year of passing
            </label> */}
                      <input
                        type="text"
                        id="twelfthYear"
                        name="twelfthYear"
                        value={formData.twelfthYear}
                        onChange={handleChange}
                        placeholder="Year of passing"
                        className="md:w-[40%] w-[60%] mr-2  p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadTwelfth}
                      />{" "}
                      <input
                        type="text"
                        id="twelfthPercent"
                        name="twelfthPercent"
                        value={formData.twelfthPercent}
                        onChange={handleChange}
                        placeholder="% or cgpa"
                        className="w-[37%]  p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadTwelfth}
                      />{" "}
                      {/* <label
              className="block px-2 w-[15vw] text-right  text-gray-900 font-bold text-lg mb-2"
              htmlFor="tenthPercent"
            >
              Percentage
            </label> */}
                    </div>
                  </div>
                )}
              </div>
            </div>{" "}
            <div className="md:w-[49%] tb:w-[47%] md:mb-6  w-full flex   h-fit flex-col     md:gap-4 gap-2 md:justify-center ">
              <div className=" flex gap-2 items-center">
                <label className="md:block md:px-0 px-4 md:w-[150px] w-fit   text-gray-900 font-bold  text-sm md:text-md md:mb-0 ">
                  Bachelor&#39;s Degree
                </label>
                <input
                  type="checkbox"
                  name="hadBachelor"
                  checked={formData.hadBachelor}
                  onChange={handleChange}
                  className="w-4 h-4 text-black"
                />
                <label
                  htmlFor="hadBachelor"
                  className="ml-2 font-semibold md:text-md text-sm text-gray-900"
                >
                  {" "}
                  {!formData.hadBachelor && (
                    <p>Check if attempted Bachelor&#39;s Degree</p> //+
                  )}
                </label>
              </div>
              <div className=" h-fit">
                {formData.hadBachelor && (
                  <div className=" ">
                    <div className="w-full flex my-2 gap-[2%]  md:h-[7vh] ">
                      <input
                        type="text"
                        id="bachelorInstitute"
                        name="bachelorInstitute"
                        value={formData.bachelorInstitute}
                        onChange={handleChange}
                        placeholder="Institute Name"
                        className="w-[100%] p-2  rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadBachelor}
                      />
                    </div>{" "}
                    <div className="w-full flex items-center   h-[10vh]">
                      {/* <label
              className="block px-2 w-[20vw]     text-gray-900 font-bold text-lg mb-2"
              htmlFor="tenthYear"
            >
              Year of passing
            </label> */}
                      <input
                        type="text"
                        id="bachelorYear"
                        name="bachelorYear"
                        value={formData.bachelorYear}
                        onChange={handleChange}
                        placeholder="Year of passing"
                        className="md:w-[39%] w-[60%] mr-2 p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadBachelor}
                      />
                      <input
                        type="text"
                        id="bachelorPercent"
                        name="bachelorPercent"
                        value={formData.bachelorPercent}
                        onChange={handleChange}
                        placeholder="% or cgpa"
                        className="w-[38%]  p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadBachelor}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>{" "}
            <div className="md:w-[49%] tb:w-[47%] md:mb-6  w-full flex  items-center h-fit flex-col     md:gap-4 gap-2 md:justify-center ">
              <div className=" flex md:gap-4 gap-2 items-center">
                <label className="md:block md:px-0 px-4 md:w-[150px]  text-gray-900 font-bold md:text-md text-sm md:mb-0 ">
                  Master Degree
                </label>
                <input
                  type="checkbox"
                  name="hadMaster"
                  checked={formData.hadMaster}
                  onChange={handleChange}
                  className="w-4 h-4 text-black"
                />
                <label
                  htmlFor="masters"
                  className="ml-2 font-semibold md:text-md text-sm text-gray-900"
                >
                  {" "}
                  {!formData.hadMaster && (
                    <p> Check if attempted Master Degree</p>
                  )}
                </label>
              </div>
              <div className=" h-fit">
                {formData.hadMaster && (
                  <div className=" ">
                    <div className="w-full flex my-2 gap-[2%]  md:h-[7vh] ">
                      <input
                        type="text"
                        id="masterInstitute"
                        name="masterInstitute"
                        value={formData.masterInstitute}
                        onChange={handleChange}
                        placeholder="Institute Name"
                        className="w-[100%] p-2  rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadMaster}
                      />
                    </div>{" "}
                    <div className="w-full flex items-center   h-[10vh]">
                      {/* <label
              className="block px-2 w-[20vw]     text-gray-900 font-bold text-lg mb-2"
              htmlFor="tenthYear"
            >
              Year of passing
            </label> */}
                      <input
                        type="text"
                        id="masterYear"
                        name="masterYear"
                        value={formData.masterYear}
                        onChange={handleChange}
                        placeholder="Year of passing"
                        className="md:w-[40%] w-[60%] mr-2 p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadMaster}
                      />
                      <input
                        type="text"
                        id="masterPercent"
                        name="masterPercent"
                        value={formData.masterPercent}
                        onChange={handleChange}
                        placeholder="% or cgpa"
                        className="w-[38%] p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                        required={formData.hadMaster}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>{" "}
          </div>
          {(!formData.hadBachelor ||
            !formData.hadTenth ||
            !formData.hadTwelfth) && (
            <div className="w-full md:px-0 px-4 items-center  flex flex-col h-[20vh] md:h-[20vh] tb:h-[15vh] ">
              <label
                className="block w-full text-gray-900 font-bold md:text-lg text-sm mb-2"
                htmlFor="dropReason"
              >
                What was the reason you decided to discontinue your studies?
              </label>
              <textarea
                id="dropReason"
                name="dropReason"
                value={formData.dropReason}
                onChange={handleChange}
                className="w-[100%] h-[12vh] p-2 resize-none rounded-sm bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                required={!!formData.dropReason}
              />
            </div>
          )}
          <div className="w-full flex md:min-h-[13vh] h-fit px-4 md:px-0 md:pt-0    gap-4">
            <div>
              <label className="block text-gray-900 font-bold md:text-lg text-sm  mb-4 ">
                Employed
              </label>
              <input
                type="checkbox"
                name="employed"
                checked={formData.employed}
                onChange={handleChange}
                className="w-4 h-4 text-black"
              />
              <label
                htmlFor="employed"
                className="ml-2 font-semibold text-gray-900"
              >
                {!formData.employed && <p> Check if employed</p>}
              </label>
            </div>
            {formData.employed && (
              <div className="flex  flex-col tb:flex-row md:gap-10 gap-2">
                <div>
                  <label
                    className="block text-gray-900 font-bold md:text-lg text-sm mb-2"
                    htmlFor="workingAt"
                  >
                    Working At
                  </label>
                  <input
                    type="text"
                    id="workingAt"
                    name="workingAt"
                    value={formData.workingAt}
                    onChange={handleChange}
                    className="w- p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                    required={formData.employed}
                  />{" "}
                </div>{" "}
                <div>
                  <label
                    className="block text-gray-900 font-bold  text-sm md:text-lg mb-2"
                    htmlFor="workingAt"
                  >
                    Working As
                  </label>
                  <input
                    type="text"
                    id="workingAs"
                    name="workingAs"
                    value={formData.workingAs}
                    onChange={handleChange}
                    className="w- p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
                    required={formData.employed}
                  />{" "}
                </div>
              </div>
            )}
          </div>{" "}
          {/* Image Upload */}
          {/* <div className="mb-6 px-4 md:px-0">
            <label
              className="block text-gray-900 font-bold md:text-lg text-sm mb-2"
              htmlFor="img"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={handleChange}
              key={formData.img || "img-key"} // Reset key to trigger re-render on formData.img reset
              className="w-full p-2 rounded bg-slate-300 shadow-lg shadow-gray-200 text-black font-semibold focus:outline-none"
              required
            />
          </div> */}
          {/* Buttons */}
          <div className="flex flex-col md:flex-row px-4 md:px-0 py-6 md:py-0  gap-4">
            <button
              type="submit"
              className="w-full md:w-1/2 p-2 text-white bg-gray-900 rounded font-bold hover:bg-black"
            >
              Request
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full md:w-1/2 p-2 bg-red-500 rounded text-white font-bold hover:bg-red-600"
            >
              Reset
            </button>
          </div>
         
        </form>
      )}
       {laoding && (
            /* From Uiverse.io by SchawnnahJ */
            <Loader></Loader>
          )}
    </div>
  );
}

export default DetailFiller;
