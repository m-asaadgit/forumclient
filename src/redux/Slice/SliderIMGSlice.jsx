import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchSliderIMG = createAsyncThunk(
  "sliderIMG/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/auth/getSliderImages`
      );
      console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response
          ? error.response.data
          : "error while fetching approved data"
      );
    }
  }
);
export const deleteSliderIMG = createAsyncThunk(
  "deleteSliderIMG/fetch",
  async ({ formId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/auth/deleteSliderImage/${formId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure `token` is defined
          },
        }
      );
            toast.success("slider image deleted successfully");
      
      return response.data.messege;
    } catch (error) {
      toast.fail("Error while deleting image ");

      return rejectWithValue(
        error.response ? error.response.data : "Error while deleting image "
      );
    }
  }
);

const sliderSlice = createSlice({
  name: "sliderIMG",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliderIMG.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSliderIMG.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchSliderIMG.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(deleteSliderIMG.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSliderIMG.fulfilled, (state, action) => {
        state.loading = false;
      
        state.data = state.data.filter(
          (form) => form._id !== action.meta.arg.formId
        );
      })
      .addCase(deleteSliderIMG.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sliderSlice.reducer;
