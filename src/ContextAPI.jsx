
// import  { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const ApiContext = createContext();

// export const ContextAPI = ({ children }) => {
//   const [approvableData, setApprovableData] = useState([]);
//   const [approvedData, setApprovedData] = useState([]);
//   const [SliderIMG, setSliderIMG] = useState([]);
//   const [feedback, setFeedback] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refetch, setRefetch] = useState(false);

//   const token = localStorage.getItem("token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   const fetchAllData = async () => {
//     setLoading(true);
//     try {
//       // API calls that don't require headers (token-based auth)
     
//       const sliderImagesResponse = await axios.get(
//         "https://forumserver-f93h.onrender.com/api/auth/getSliderImages"
//       );
//       setSliderIMG(sliderImagesResponse.data.data);

//       const approvedResponse = await axios.get(
//         "https://forumserver-f93h.onrender.com/api/auth/approved"
//       );
//       setApprovedData(approvedResponse.data.data);

//       // Only fetch these APIs if the token is available (requires authorization)
//       if (token) {
//         const [approvableResponse, feedbackResponse] = await Promise.all([
//           axios.get("https://forumserver-f93h.onrender.com/api/auth/approvable", {
//             headers,
//           }),
//           axios.get("https://forumserver-f93h.onrender.com/api/auth/getFeedback", {
//             headers,
//           }),
//         ]);

//         setApprovableData(approvableResponse.data.data);
//         setFeedback(feedbackResponse.data.data);
//       }

    
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch all data on mount
//   useEffect(() => {
//     fetchAllData();
//   }, [refetch]);

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

import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
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
      const sliderImagesResponse = await axios.get(
        "https://forumserver-f93h.onrender.com/api/auth/getSliderImages"
      );
      setSliderIMG(sliderImagesResponse.data.data);

      const approvedResponse = await axios.get(
        "https://forumserver-f93h.onrender.com/api/auth/approved"
      );
      setApprovedData(approvedResponse.data.data);

      if (token) {
        const [approvableResponse, feedbackResponse] = await Promise.all([
          axios.get("https://forumserver-f93h.onrender.com/api/auth/approvable", {
            headers,
          }),
          axios.get("https://forumserver-f93h.onrender.com/api/auth/getFeedback", {
            headers,
          }),
        ]);

        setApprovableData(approvableResponse.data.data);
        setFeedback(feedbackResponse.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

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
        fetchAllData,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// Add PropTypes validation for children
ContextAPI.propTypes = {
  children: PropTypes.node.isRequired, // Ensures `children` is a React node and required
};

export default ContextAPI;
