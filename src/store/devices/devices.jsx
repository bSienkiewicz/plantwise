import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDevices = createAsyncThunk(
    "devices/fetchDevices",
    async () => {
      const response = await axios.get(`${window.CORE_URL}/api/v1/devices`);
      return response.data;
    }
  );

export const devicesSlice = createSlice({
  name: "devices",
  initialState: {
    devices: [],
    loading: false,
    error: false,
  },
  reducers: {
    setDevices: (state, action) => {
      state.devices = action.payload;
    },
    setDevicesLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDevicesError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.devices = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchDevices.rejected, (state) => {
        state.devices = [];
        state.loading = false;
        state.error = true;
      });
  }
});

export const {
  setDevices,
  setDevicesLoading,
  setDevicesError,
} = devicesSlice.actions;

export default devicesSlice.reducer;
