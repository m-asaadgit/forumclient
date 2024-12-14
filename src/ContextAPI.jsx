// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const ApiContext = createContext();

// export const ContextAPI = ({ children }) => {
//   const [approvableData, setApprovableData] = useState([]);


//   const [approvedData, setApprovedData] = useState([]);
//   const [SliderIMG, setSliderIMG] = useState([]);
//   const [feedback, setFeedback] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token"); 
// const [refetch, setRefetch] = useState(false);
// const headers = token ? { Authorization: `Bearer ${token}` } : {};
//   const fetchAllData = async () => {
//     setLoading(true);
//     try {
//       const [
//         approvableResponse,
//         approvedResponse,
//         sliderImagesResponse,
//         feedbackResponse,
//       ] =  await Promise.all([
//         axios.get("https://forumtest.onrender.com/api/auth/approvable", {
//           headers,
//         }),
//         axios.get("https://forumtest.onrender.com/api/auth/approved"),
//         axios.get("https://forumtest.onrender.com/api/auth/getSliderImages"),
//         axios.get("https://forumtest.onrender.com/api/auth/getFeedback", {
//           headers,
//         }),
//       ]);


//       setApprovableData(approvableResponse.data.data);
//       setApprovedData(approvedResponse.data.data);
//       setSliderIMG(sliderImagesResponse.data.data);
//       setFeedback(feedbackResponse.data.data);
//       console.log(approvedData)
//       console.log(SliderIMG)
//       // console.log(SliderIMG)
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add new slider image


//   // Fetch all data on mount
//   useEffect(() => {
//     fetchAllData();

//   },[refetch]);

//   return (
//     <ApiContext.Provider
//       value={{
//         approvableData,
//         approvedData,
//         SliderIMG,
//         feedback,
//         loading,
//         setRefetch,
//         fetchAllData, // To allow manual refresh
  
//       }}
//     >
//       {children}
//     </ApiContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ApiContext = createContext();

export const ContextAPI = ({ children }) => {
  const [approvableData, setApprovableData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [SliderIMG, setSliderIMG] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // API calls that don't require headers (token-based auth)
      const [approvedResponse, sliderImagesResponse] = await Promise.all([
        axios.get("https://forumtest.onrender.com/api/auth/approved"),
        axios.get("https://forumtest.onrender.com/api/auth/getSliderImages"),
      ]);

      setApprovedData(approvedResponse.data.data);
      setSliderIMG(sliderImagesResponse.data.data);

      // Only fetch these APIs if the token is available (requires authorization)
      if (token) {
        const [approvableResponse, feedbackResponse] = await Promise.all([
          axios.get("https://forumtest.onrender.com/api/auth/approvable", { headers }),
          axios.get("https://forumtest.onrender.com/api/auth/getFeedback", { headers }),
        ]);

        setApprovableData(approvableResponse.data.data);
        setFeedback(feedbackResponse.data.data);
      }

      console.log(approvedData);
      console.log(SliderIMG);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all data on mount
  useEffect(() => {
    fetchAllData();
  }, [refetch]);

  return (
    <ApiContext.Provider
      value={{
        approvableData,
        approvedData,
        SliderIMG,
        feedback,
        loading,
        setRefetch,
        fetchAllData, // To allow manual refresh
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};


