
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSliderImageAsync,
  fetchSliderImagesAsync,
} from "../redux/Slice/SliderIMGSlice";
import Loader from "../components/Loader";

const apiUrl = import.meta.env.VITE_API_BASE_URL;



const LandingPage = () => {
  const { data, loading, error } = useSelector((state) => state.sliderIMG);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [toDeleteData, setToDeleteData] = useState(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchSliderImagesAsync()).catch((err) => console.error(err));
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("sliderImage", image);

    try {
      setUploading(true);
      const response = await axios.post(`${apiUrl}/api/auth/setSliderImages`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(fetchSliderImagesAsync());
      setShowForm(false);
      toast.success(response.data.message);

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

  const deleteIMG = (formId) => {
    dispatch(deleteSliderImageAsync( formId, token )).catch(() =>
      toast.error("Error while deleting image")
    );
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message || "Failed to load data"}</p>;

  return (
    <div className="w-[100%] md:pt-[25vh] pt-[15vh] md:pb-[10vh] md:h-fit tb:h-[95vh] h-fit relative pb-20 bg-white">
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-0">
        <Link
          onClick={() => navigate(-1)}
          className="bg-gray-900 ml-10 flex items-center justify-center rounded-sm md:text-2xl font-normal gap-2 py-1 hover:bg-black hover:scale-[101%] shadow-md shadow-gray-600 text-white w-fit px-2 pr-4 h-fit"
        >
          <MdArrowBack />
          back
        </Link>
        <button
          onClick={() => setShowForm(true)}
          className="md:mx-[30vw] md:w-fit w-[90%] mx-auto bg-[#e5e5e5] shadow-md shadow-[#f2e9e4] px-4 py-2 font-semibold rounded-sm"
        >
          Click to add new Slider Images
        </button>
      </div>

      {showForm && (
        <div className="absolute shadow-sm shadow-[#e0e1dd] z-40 bg-[#dadae2] top-[35vh] md:left-[35vw] left-[10vw] mx-auto md:mx-0 md:w-[30vw] w-[80vw]">
          <form className="py-4 w-full h-full px-2 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div onClick={() => setShowForm((prev) => !prev)} className="absolute right-2 top-2">
              <RxCross2 size={20} />
            </div>
            <div>
              <input
                type="text"
                placeholder="name"
                className="bg-slate-100 px-2 w-[80%] mx-4 focus:outline-none"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                id="description"
                placeholder="description"
                className="bg-slate-100 px-2 w-[80%] mx-4 focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex px-2 mx-4 w-full">
              <input
                ref={fileInputRef}
                className="w-[60%]"
                type="file"
                placeholder="image"
                id="image"
                onChange={handleImageChange}
                required
              />
               {previewImage && ( // Conditionally render preview image
                <div className="w-[80px] relative flex gap-2">
                  <img
                    src={previewImage}
                    className="w-[890px] h-[60px]"
                    alt="Preview"
                  />
                  <RxCross2
                    onClick={() => {
                      setImage(null);
                      setPreviewImage(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = ""; // Reset the file input
                      }
                    }}
                    className="absolute text-white bg-black right-0 top-0"
                  ></RxCross2>
                </div>
              )}
            </div>
            <button type="submit" className="bg-yellow-500 w-fit mx-auto rounded-sm font-semibold px-2" disabled={uploading}>
              {uploading ? "Uploading..." : "Submit"}
            </button>
          </form>
        </div>
      )}

      <div className="bg-[#e0e3e7] flex gap-10 py-8 justify-center mx-auto flex-wrap my-5 w-[95%] h-fit">
        {data?.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="md:min-w-[28%] md:max-w-[28%] tb:w-[70%] relative w-[90%] bg-zinc-100/80 h-[200px]">
              <button
                onClick={() => {
                  setToDeleteData(item);
                }}
                className="bg-[#d90429] font-semibold absolute top-2 right-4 px-2 py-1 rounded"
              >
                delete
              </button>
              {item?.imgUrl && <img src={item.imgUrl} className="w-full h-full" />}
            </div>
          ))
        ) : (
          <h1 className="font-semibold">
            No slider data added{" "}
            <Link onClick={() => setShowForm(true)} className="text-blue-700 font-normal">
              Click here to add new data
            </Link>
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
            <div className="w-[130%] h-[120px] ">
              <img src={toDeleteData.imgUrl} className="w-full h-full" alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
