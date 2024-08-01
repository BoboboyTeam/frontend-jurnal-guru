import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchDataJP = createAsyncThunk(
  "jurnalGuru/fetchDataJP",
  async (params, thunkAPI) => {
    try {
      const id = params?.id;
      const month = params?.month;
      console.log(params, "REDUX PARAMSSSSSSSS");
      const token = localStorage.getItem("access_token");
      const role = localStorage.getItem("role").toLowerCase();
      const link = `${process.env.BASE_URL}/${role}/filter/jurnal-teacher/date${
        id ? `${"/" + id}` : ""
      }`;
      let { data } = await axios({
        method: "get",
        url: link,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(link);
      console.log(month, "MONTH REDUX");
      console.log(data.dataJP[month], "<<<<REDUX");
      let jpData = data.dataJP[month];
      console.log(jpData, "JP DATA REDUX");
      jpData.gaji = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(jpData?.gaji);
      console.log(jpData, "JP DATA REDUX");
      return jpData;
    } catch (error) {
      throw error;
    }
  }
);

const jurnalGuruSlice = createSlice({
  name: "jurnalGuru",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    updateState: (state, action) => {
      console.log(action, "REDUX PAYLOAD UPDATE STATE");
      state.data = action.payload ? action.payload : [];
      console.log(state.data, "REDUX STATE UPDATE STATE");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataJP.pending, (state, action) => {
        state.loading = true;
        state.data = [];
      })
      .addCase(fetchDataJP.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action, "REDUX ACTION");
        state.data = action.payload;
        console.log(action.payload, "REDUX PAYLOAD");
        console.log(state.data, "REDUX STATE");
      })
      .addCase(fetchDataJP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

// Export updateState action
export const { updateState } = jurnalGuruSlice.actions;

export default jurnalGuruSlice.reducer;