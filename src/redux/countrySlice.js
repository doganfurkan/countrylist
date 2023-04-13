import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("countries/getData", async () => {
  const res = await axios(`../../data.json`);
  return res.data;
});

export const countrySlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    regions:["Africa","America","Asia","Europe","Oceania"],
    regionFilter:"Europe",
    loading: false,
    theme:"light"
  },
  reducers: {
    changeTheme: (state) => {
      state.theme === "light" ? state.theme = "dark" : state.theme = "light"
    },
    setTheme: (state,action) => {
      state.theme = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.countries = action.payload;
    })
    .addCase(fetchData.pending, (state) => {
      state.loading = true;
    })
  },
});

export const { changeTheme, setTheme } = countrySlice.actions;

export default countrySlice.reducer;
