import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSuperHeroes } from "../../services/getSuperHeroes";

export const getHeroes = createAsyncThunk(
    "search/getHeroes",
    async (value) => {
        try{
            return getSuperHeroes(value)
        } catch (error) {
            return console.log(error)
        }
    }
)


const searchSlice = createSlice({
    name: 'search',
    initialState: {
        list: [], 
        status: null
    },
    reducers: {
        resetList: (state) =>  {
            state.list = []
        }
    }
    ,
    extraReducers: {
        [getHeroes.pending] : (state) => {
            state.status = "loading"
        },
        [getHeroes.fulfilled] : (state, {payload}) => {
            state.list = payload || []
            state.status = "success"
        },
        [getHeroes.rejected] : (state) => {
            state.status = "failed"
        }
    }
})

export const {resetList} = searchSlice.actions


export default searchSlice.reducer