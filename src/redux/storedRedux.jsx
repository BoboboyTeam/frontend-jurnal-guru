import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const initialState ={
    data:[],
    loading:false,
    error:null
}

export const fetchData = createAsyncThunk("stored/fetchData",async(params,thunkAPI)=>{
    try{
        const token = localStorage.getItem("access_token");
        const role = localStorage.getItem("role").toLowerCase();
        const detail = params.detail;
        const id = params?.id;
        const link =`${process.env.BASE_URL}/${role}/${detail}${id ? `/${id}` : ""}`;
        const response = await axios({
            method:"get",
            url:link,
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        console.log(response.data,"<<<<<<<<<<<<FETCH STORED REDUX");
        return response.data;
    }
    catch{
        throw error;
    }
})

const storedSlice = createSlice({
    name:"stored",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchDataGuru.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(fetchDataGuru.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchDataGuru.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error;
        })
    }
})

export default storedSlice.reducer;