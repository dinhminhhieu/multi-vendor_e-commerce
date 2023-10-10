import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import api from "../../api/api";

export const get_category = createAsyncThunk(
  "product/get_category",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-categorys");
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const homeReducer = createSlice({
    name: "home",
    initialState: {
        categorys: []
    },
    reducers: {

    },
    extraReducers: {

    }
})

export default homeReducer.reducer