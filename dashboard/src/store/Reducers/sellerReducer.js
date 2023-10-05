import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_seller_request = createAsyncThunk(
  "product/get_seller_request",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-seller-request?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellerReducer = createSlice({
  name: "seller",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    sellers: [],
    totalSeller: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  extraReducers: {
    [get_seller_request.fulfilled]: (state, { payload }) => {
      state.sellers = payload.sellers;
      state.totalSeller = payload.totalSeller;
    },
  },
});
export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
