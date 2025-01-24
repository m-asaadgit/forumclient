import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const maleFetchApprovedData = createAsyncThunk(
  "male/approvedData/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/auth//male/approved`);
      return response.data.data; // Assuming this is the
      // payload you want to return
    } catch (error) {
      return rejectWithValue(
        error.response
          ? error.response.data
          : "Error while fetching approved data"
      );
    }
  }
);

// Delete Form Action


const maleApprovedSlice = createSlice({
  name: "maleApprovedData",
  initialState: {
    data: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch approvable data
      .addCase(maleFetchApprovedData.pending, (state) => {
        state.loading = true;
      })
      .addCase(maleFetchApprovedData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(maleFetchApprovedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
   
  },
});

export default maleApprovedSlice.reducer;
