import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
const initialState = {
  data: [],
  loading: false,
  error: null,
};

const getDataJP = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const role = localStorage.getItem("role");
      const link = `${process.env.BASE_URL}/${role}/filter/jurnal-guru/date${
        id ? `${"/"+id }` : ""
      }`;
      console.log(link);
      let { data } = await axios({
        method: "get",
        url: link,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const thisMonth = new Date().getMonth();
      const jpData = data.dataJP[thisMonth];
      jpData.gaji = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        }).format(jpData.gaji);
      console.log(data.dataJP[thisMonth]);
      return (
        (
          <div className="w-[20rem]">
            <h1 className="font-bold text-xl underline">Gaji Bulan ini:</h1>
            <div className="pl-10">
            <p className="font-semibold text-[1.1rem]">Jumlah JP: {jpData?.jumlahJP}</p>
            <p className="font-semibold text-[1.1rem]">Total Gaji: {jpData?.gaji}</p>
            </div>
          </div>
        )
      );
    } catch (error) {
      throw error;
    }
  };

export const fetchDataJP = createAsyncThunk('jurnalGuru/fetchDataJP',async(params,thunkAPI)=>{
   try {
    const id = params?.id
    const month = params?.month
    console.log(params,"REDUX PARAMSSSSSSSS")
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
    const link = `${process.env.BASE_URL}/${role}/filter/jurnal-guru/date${
        id ? `${"/"+id }` : ""
      }`;
    console.log(link);
      let { data } = await axios({
        method: "get",
        url: link,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(month,"MONTH REDUX")
      console.log(data.dataJP[6],"<<<<REDUX")
      return data.dataJP[month];
   } catch (error) {
    throw error;
   }
})

const jurnalGuruSlice = createSlice({
  name: "jurnalGuru",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    updateState: (state, action) => {
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
        console.log(action,"REDUX ACTION")
        state.data = action.payload;
        console.log(action.payload,"REDUX PAYLOAD")
        console.log(state.data,"REDUX STATE")
      })
      .addCase(fetchDataJP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default jurnalGuruSlice.reducer;
