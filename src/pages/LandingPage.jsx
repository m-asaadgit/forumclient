import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { ApiContext } from "../ContextAPI";

const LandingPage = () => {
  const { SliderIMG, approvedData } =
    useContext(ApiContext);
console.log(approvedData)
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [toDeleteData, setToDeleteData] = useState(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl); // Use a separate state to manage preview URL
    }
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("sliderImage", image);

    try {
      setUploading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/setSliderImages",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      

      const newSliderImage = response.data.newImage; // Ensure your API response contains the 
      setTitle("");
      setDescription("");
      setImage(null);
      setPreviewImage(null);
    } catch (error) {
      toast.error("Failed to upload image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // const getSliderImages = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/api/auth/getSliderImages"
  //     );
  //     setSliderIMG(response.data.data);
  //     console.log(SliderIMG);
  //   } catch (error) {
  //     console.error("Error getting slider images:", error);
  //   }
  // };
  const deleteIMG = async (formId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/auth/deleteSliderImage/${formId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure `token` is defined
          },
        }
      );


      toast.warning(response.data.message || "Image deleted  successfully!");
    } catch (error) {
      console.error("Error disapproving form:", error);
      alert("Failed to disapprove form: " + error.message);
    }
  };

  useEffect(() => {
    // getSliderImages()
  }, [deleteIMG, handleSubmit]);

  return (
    <div className="w-[100%] md:pt-[25vh] pt-[15vh] md:pb-[10vh] md:h-fit  tb:h-[95vh] h-fit relative  pb-20  bg-white">
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-0  ">
        <Link
          onClick={() => navigate(-1)}
          className="bg-gray-900 ml-10   flex items-center justify-center rounded-sm md:text-2xl font-normal gap-2 py-1 hover:bg-black hover:scale-[101%] shadow-md shadow-gray-600 text-white w-fit px-2 pr-4 h-fit"
        >
          <MdArrowBack />
          back
        </Link>
        <button
          onClick={() => setShowForm(true)}
          className="md:mx-[30vw] md:w-fit w-[90%] mx-auto  bg-[#e5e5e5] shadow-md shadow-[#f2e9e4] px-4 py-2 font-semibold rounded-sm "
        >
          {" "}
          Click to add new Slider Images{" "}
        </button>
      </div>
      {showForm && (
        <div className="absolute shadow-sm  shadow-[#e0e1dd] z-40 bg-[#dadae2] top-[35vh] md:left-[35vw] left-[10vw] mx-auto md:mx-0  md:w-[30vw] w-[80vw]  ">
          {" "}
          <form
            className=" py-4 w-full h-full px-2 flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div
              onClick={() => setShowForm((prev) => !prev)}
              className="absolute right-2 top-2"
            >
              <RxCross2 size={20}></RxCross2>{" "}
            </div>
            <div>
              <input
                type="text"
                placeholder="name"
                className="bg-slate-100 px-2 w-[80%] mx-4 focus:outline-none "
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="description"
                placeholder="description"
                className="bg-slate-100 px-2  w-[80%] mx-4 focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="flex  px-2   mx-4 w-full">
              <input
                className=" w-[60%]"
                type="file"
                placeholder="image"
                id="image"
                onChange={handleImageChange} // Removed `value`
                required
              />
              {previewImage && ( // Conditionally render preview image
                <img
                  src={previewImage}
                  className="w-[60px] h-[60px]"
                  alt="Preview"
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-yellow-500 w-fit mx-auto rounded-sm font-semibold px-2 "
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Submit"}
            </button>
          </form>
        </div>
      )}
      <div className="bg-[#e0e3e7] flex  gap-10 py-8 justify-center mx-auto flex-wrap  my-5 w-[95%] h-fit ">
        {SliderIMG && SliderIMG.length > 0 ? (
          SliderIMG.map((item, index) => (
            <div className="md:min-w-[28%] md:max-w-[28%] tb:w-[70%] relative w-[90%] bg-zinc-100/80 h-[200px]">
              <button
                onClick={() => {
                  setShowDelete((prev) => !prev);
                  setToDeleteData(item);
                }}
                className="bg-[#d90429] font-semibold absolute top-2 right-4 px-2 py-1  rounded"
              >
                delete
              </button>

              {item?.imgUrl && (
                <img src={item.imgUrl} className="w-full h-full" />
              )}
            </div>
          ))
        ) : (
          <h1 className="font-semibold">
            No slider data added{" "}
            <Link
              onClick={() => setShowForm(true)}
              className="text-blue-700 font-normal"
            >
              Click here to add new data
            </Link>{" "}
          </h1>
        )}
        {toDeleteData && (
          <div className=" fixed px-20 py-10 flex flex-col items-center justify-center z-30 top-[30vh] md:left-[35vw] left-5vw md:bg-[#edf2f4]/90 bg-slate-300 w-[90%] md:w-fit mx-auto rounded-sm shadow-sm gap-4 shadow-[#e0e1dd]">
            <div className="flex gap-4">
              {" "}
              <button
                onClick={() => {
                  setToDeleteData(null);
                }}
                className="px-1 py-1 bg-green-500 semibold rounded-sm "
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteIMG(toDeleteData._id);

                  setToDeleteData(null);
                }}
                className="px-1 py-1 bg-[#d90429] semibold rounded-sm "
              >
                Delete
              </button>
            </div>
            <div className="w-[130%] h-[120px] bg-green-900">
              <img src={toDeleteData.imgUrl} className="w-full h-full" alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;

// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { RxCross2 } from "react-icons/rx";
// import { Link, useNavigate } from "react-router-dom";
// import { MdArrowBack } from "react-icons/md";
// import { ApiContext } from "../ContextAPI";

// const LandingPage = () => {
//   const { SliderIMG, deleteSliderImage, addSliderImage } = useContext(ApiContext);
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [showDelete, setShowDelete] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [toDeleteData, setToDeleteData] = useState(null);
//   const [image, setImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   const token = localStorage.getItem("token");

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       setPreviewImage(previewUrl);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("sliderImage", image);

//     try {
//       setUploading(true);
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/setSliderImages",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success(response.data.message);

//       // Add the new slider image to the local context
//       const newSliderImage = response.data.newImage; // Ensure your API response contains the added image
//       addSliderImage(newSliderImage);

//       // Reset form fields
//       setTitle("");
//       setDescription("");
//       setImage(null);
//       setPreviewImage(null);
//     } catch (error) {
//       toast.error("Failed to upload image: " + error.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const deleteIMG = async (formId) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:5000/api/auth/deleteSliderImage/${formId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       deleteSliderImage(formId); // Remove image from context
//       toast.warning(response.data.message || "Image deleted successfully!");
//     } catch (error) {
//       toast.error("Failed to delete image: " + error.message);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (previewImage) {
//         URL.revokeObjectURL(previewImage);
//       }
//     };
//   }, [previewImage]);

//   return (
//     <div className="w-[100%] md:pt-[25vh] pt-[15vh] md:h-[90vh] pb-20 bg-white">
//       <div className="w-full flex flex-col md:flex-row gap-4">
//         <Link
//           onClick={() => navigate(-1)}
//           className="bg-gray-900 ml-10 flex items-center justify-center rounded-sm font-normal gap-2 py-1 hover:bg-black hover:scale-[101%] shadow-md text-white px-2 pr-4"
//         >
//           <MdArrowBack />
//           Back
//         </Link>
//         <button
//           onClick={() => setShowForm(true)}
//           className="md:mx-[30vw] md:w-fit w-[90%] mx-auto bg-[#e5e5e5] shadow-md px-4 py-2 font-semibold rounded-sm"
//         >
//           Add New Slider Images
//         </button>
//       </div>
//       {showForm && (
//         <div className="absolute shadow-sm z-40 bg-[#dadae2] top-[35vh] md:left-[35vw] left-[10vw] mx-auto md:w-[30vw] w-[80vw]">
//           <form
//             className="py-4 w-full h-full px-2 flex flex-col gap-4"
//             onSubmit={handleSubmit}
//           >
//             <div
//               onClick={() => setShowForm(false)}
//               className="absolute top-2 right-2 text-xl cursor-pointer"
//             >
//               <RxCross2 />
//             </div>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Title"
//               className="px-2 py-1 border rounded-sm"
//               required
//             />
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Description"
//               className="px-2 py-1 border rounded-sm resize-none"
//               rows="3"
//               required
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="px-2 py-1 border rounded-sm"
//               required
//             />
//             {previewImage && (
//               <img
//                 src={previewImage}
//                 alt="Preview"
//                 className="w-full h-auto rounded-md"
//               />
//             )}
//             <button
//               type="submit"
//               className="bg-gray-900 text-white py-2 rounded-sm hover:bg-black"
//               disabled={uploading}
//             >
//               {uploading ? "Uploading..." : "Submit"}
//             </button>
//           </form>
//         </div>
//       )}
//       <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
//         {SliderIMG?.map((image) => (
//           <div key={image._id} className="relative shadow-md">
//             <img src={image.url} alt={image.title} className="w-full h-auto" />
//             <button
//               onClick={() => deleteIMG(image._id)}
//               className="absolute top-2 right-2 text-red-600 hover:text-red-800"
//             >
//               <RxCross2 />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
