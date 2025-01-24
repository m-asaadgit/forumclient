import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

const headers = token ? { Authorization: `Bearer ${token}` } : {};

export const fetchApprovedData = createAsyncThunk(
  "approvedData/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/auth/approved`,{
        headers
      });
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
export const deleteFormFromRedux = createAsyncThunk(
  "forms/delete",

  async ({ formId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/auth/delete/${formId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Form details successfully deleted");
      return response.data.message; // Return success message
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Error while approving the form"
      );
    }
  }
);

const approvedSlice = createSlice({
  name: "approvedData",
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
      .addCase(fetchApprovedData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApprovedData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchApprovedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFormFromRedux.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFormFromRedux.fulfilled, (state, action) => {
        state.loading = false;

        state.data = state.data.filter(
          (form) => form._id !== action.meta.arg.formId
        );
      })
      .addCase(deleteFormFromRedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default approvedSlice.reducer;
