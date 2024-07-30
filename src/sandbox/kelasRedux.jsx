import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDataKelas = createAsyncThunk(
  "kelas/fetchDataKelas",
  async () => {
    try {
      const token = localStorage.getItem("access_token");
      const role = localStorage.getItem("role");
      const response = await axios({
        method: "get",
        url: `${process.env.BASE_URL}/${role}/kelas`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const kelasSlice = createSlice({
    name: "kelas",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchDataKelas.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(fetchDataKelas.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchDataKelas.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    },
    });

export default kelasSlice.reducer;