import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const headers = token ? { Authorization: `Bearer ${token}` } : {};
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchFeedback = createAsyncThunk(
  "feedback/fetch",
  async (_, { rejectWithValue }) => {
    try {
      if (token) {
        const response = await axios.get(
          `${apiUrl}/api/auth/getFeedback`,
          { headers }
        );
        return response.data.data;
      } 
    } catch (error) {
      return rejectWithValue(
        error.response
          ? error.response.data
          : "error while fetching approved data"
      );
    }
  }
);


const feedbackSlice = createSlice({
  name: "feedback",
  initialState: { data: [], loading: false ,error:null},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchFeedback.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default feedbackSlice.reducer;
