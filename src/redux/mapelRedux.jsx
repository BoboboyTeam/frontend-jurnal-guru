import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchDataMapel = createAsyncThunk("mapel/fetchDataMapel",async(params,thunkAPI)=>{
    try{
        const token = localStorage.getItem("access_token");
        const role = localStorage.getItem("role").toLowerCase();
        const response = await axios({
            method:"get",
            url:`${process.env.BASE_URL}/${role}/mapel`,
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return response.data;
    }
    catch{
        throw error;
    }
}
)

const mapelSlice = createSlice({
    name:"mapel",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchDataMapel.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(fetchDataMapel.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchDataMapel.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error;
        })
    }
})


export default mapelSlice.reducer;