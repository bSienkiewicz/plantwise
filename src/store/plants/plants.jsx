import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPlants = createAsyncThunk(
    "plants/fetchPlants",
    async () => {
      const response = await axios.get(`${window.CORE_URL}/api/v1/plants`);
      return response.data;
    }
  );

export const plantsSlice = createSlice({
  name: "plants",
  initialState: {
    plants: [],
    loading: false,
    error: false,
  },
  reducers: {
    setPlants: (state, action) => {
      state.plants = action.payload;
    },
    setPlantsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPlantsError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlants.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPlants.fulfilled, (state, action) => {
        state.plants = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchPlants.rejected, (state) => {
        state.plants = [];
        state.loading = false;
        state.error = true;
      });
  }
});

export const {
  setPlants,
  setPlantsLoading,
  setPlantsError,
} = plantsSlice.actions;

export default plantsSlice.reducer;
