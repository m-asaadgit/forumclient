import  { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const ImagePage = () => {
  const [name, setName] = useState("");
  const [authority, setAuthority] = useState("");
  const [uploading, setUploading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showDelete, setShowDelete] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [CMpersonData, setCMpersonData] = useState();
  const [toDeleteData, setToDeleteData] = useState(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create a preview URL for the image
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl); // Use a separate state to manage preview URL
    }
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("authority", authority);
    formData.append("authorityImage", image);

    try {
      setUploading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/setimagePage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include token in the headers
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error uploading the image:", error);
    } finally {
      setUploading(false);
    }
  };

  const getSliderImages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/getImagesPage"
      );
      setCMpersonData(response.data.data);
    } catch (error) {
      toast.error("Error getting slider images:", error);
    }
  };
  const deleteIMG = async (formId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/auth/deleteImagePage/${formId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure `token` is defined
          },
        }
      );

      toast.warning(response.data.message || "Image deleted  successfully!");
    } catch (error) {
      toast.error("Error disapproving form:", error);
    }
  };

  useEffect(() => {
    getSliderImages();
  });

  return (
    <div className="w-[100%] h-[100vh] relative mb-20 bg-white">
      <button
        onClick={() => setShowForm(true)}
        className="mx-28 bg-[#e5e5e5] shadow-md shadow-[#f2e9e4] px-4 py-2 font-semibold rounded-sm mt-12"
      >
        {" "}
        Click to add new authority data Images{" "}
      </button>
      {showForm && (
        <div className="absolute shadow-sm  shadow-[#e0e1dd] z-40 bg-[#dadae2] top-[10vh] left-[35vw] w-[30vw]  ">
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
            <div >
        
              <input
                type="text"
                placeholder="name"
                className="bg-slate-100 px-2 w-[80%] mx-4 focus:outline-none "
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
       
              <input
                type="text"
                id="authority"
                placeholder="About"
                className="bg-slate-100 px-2  w-[80%] mx-4 focus:outline-none"
                value={authority}
                onChange={(e) => setAuthority(e.target.value)}
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
      <div className="bg-[#8d99ae] flex gap-10 py-8 justify-center mx-auto flex-wrap  my-5 w-[95%] h-fit ">
        {CMpersonData && CMpersonData.length > 0? 
          CMpersonData.map((item, index) => (
            <div key={index} className="min-w-[28%] max-w-[28%] relative  bg-zinc-200/90 h-[200px]">
              <button
                onClick={() => {
                  setShowDelete((prev) => !prev);
                  setToDeleteData(item);
                }}
                className="bg-[#d90429] font-semibold absolute top-2 right-4 px-2 py-1  rounded"
              >
                delete
              </button>

              <img src={item.imgUrl} alt="" className="w-full h-full " />
            </div>
          )) : <h1 className="font-semibold">No authority data added <Link  onClick={()=>setShowForm(true)} className="text-blue-700 font-normal">Click here to add new data</Link> </h1>  }
        {toDeleteData && (
          <div className=" fixed px-20 py-10 flex flex-col items-center justify-center z-30 top-[30vh] left-[35vw] bg-[#edf2f4]/90 rounded-sm shadow-sm gap-4 shadow-[#e0e1dd]">
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
            <div className="w-[100%] h-[120px] bg-green-900" >
              <img src={toDeleteData.imgUrl} className="w-full h-full" alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePage;



ImagePage
