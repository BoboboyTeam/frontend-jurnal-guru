import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
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
      const role = localStorage.getItem("role");
      const link = `${process.env.BASE_URL}/${role}/filter/jurnal-guru/date${
        id ? `${"/" + id}` : ""
      }`;
      console.log(link);
      let { data } = await axios({
        method: "get",
        url: link,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(month, "MONTH REDUX");
      console.log(data.dataJP[6], "<<<<REDUX");
      const jpData = data.dataJP[month];
      jpData.gaji = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(jpData.gaji);
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
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataJP.pending, (state, action) => {
        state.loading = true;
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
