import { configureStore } from "@reduxjs/toolkit";
import approvableReducer from "./Slice/approvableDataSlice";
import approvedReducer from "./Slice/approvedDataSlice";
import sliderReducer from "./Slice/SliderIMGSlice";
import feedbackReducer from "./Slice/feedbackSlice";
import maleApprovedReducer from "./Slice/publicApprovedData";
const store = configureStore({
  reducer: {
    approvableData: approvableReducer,
    approvedData: approvedReducer,
    sliderIMG: sliderReducer,
    feedback: feedbackReducer,
    maleApprovedData:maleApprovedReducer
  },
});

export default store;
