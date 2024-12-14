import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ApiContext = createContext();

export const ContextAPI = ({ children }) => {
  const [approvableData, setApprovableData] = useState([]);


  const [approvedData, setApprovedData] = useState([]);
  const [SliderIMG, setSliderIMG] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); 
const [refetch, setRefetch] = useState(false);
const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        approvableResponse,
        approvedResponse,
        sliderImagesResponse,
        feedbackResponse,
      ] =  await Promise.all([
        axios.get("https://forumtest.onrender.com/api/auth/approvable", {
          headers,
          withCredentials: true, // Ensure credentials are sent
        }),
        axios.get("https://forumtest.onrender.com/api/auth/approved", {
          withCredentials: true, // Ensure credentials are sent
        }),
        axios.get("https://forumtest.onrender.com/api/auth/getSliderImages", {
          withCredentials: true, // Ensure credentials are sent
        }),
        axios.get("https://forumtest.onrender.com/api/auth/getFeedback", {
          headers,
          withCredentials: true, // Ensure credentials are sent
        }),
      ]);


      setApprovableData(approvableResponse.data.data);
      setApprovedData(approvedResponse.data.data);
      setSliderIMG(sliderImagesResponse.data.data);
      setFeedback(feedbackResponse.data.data);
      console.log(approvedData)
      console.log(SliderIMG)
      // console.log(SliderIMG)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add new slider image


  // Fetch all data on mount
  useEffect(() => {
    fetchAllData();

  },[refetch]);

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


