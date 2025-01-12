
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const headers = token ? { Authorization: `Bearer ${token}` } : {};
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchApprovableData = createAsyncThunk(
  "approvableData/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/auth/approvable`, {
        headers,
      });
      return response.data.data;
    } catch (error) {
      console.log(error+"en")
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const approveFormFromRedux = createAsyncThunk(
  "unApprovedData/approveForm",
  async ({ formId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/auth/approve/${formId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.message; // Return success message
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Error while approving the form"
      );
    }
  }
);

export const disapproveFormFromRedux = createAsyncThunk(
  "unApprovedData/disapproveForm",
  async ({ formId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/auth/disapprove/${formId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.message; // Return success message
    } catch (error) {
      return rejectWithValue(
        error.response
          ? error.response.data
          : "Error while disapproving the form"
      );
    }
  }
);

const approvableSlice = createSlice({
  name: "approvableData",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApprovableData.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new fetch
      })
      .addCase(fetchApprovableData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchApprovableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch approvable data";
      })
      // Approve form
      .addCase(approveFormFromRedux.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveFormFromRedux.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
        state.data = state.data.filter(
          (form) => form._id !== action.meta.arg.formId
        ); // Remove approved form
      })
      .addCase(approveFormFromRedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Disapprove form
      .addCase(disapproveFormFromRedux.pending, (state) => {
        state.loading = true;
      })
      .addCase(disapproveFormFromRedux.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (form) => form._id !== action.meta.arg.formId
        ); // Remove unapproved form
      })
      .addCase(disapproveFormFromRedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default approvableSlice.reducer;
