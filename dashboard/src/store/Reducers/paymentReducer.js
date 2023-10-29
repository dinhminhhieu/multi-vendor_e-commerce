import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'

//1. Gửi yêu cầu thanh toán
export const get_seller_payment_request = createAsyncThunk(
  "payment/get_seller_payment_request",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/payment/get-seller-payment-request/${sellerId}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const paymentReducer = createSlice({
  name: "payment",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    pendingWithdraw: [],
    successWithdraw: [],
    totalAmount: 0,
    withdrawAmount: 0,
    pendingAmount: 9,
    availableAmount: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [get_seller_payment_request.fulfilled]: (state, {payload}) => {
        state.pendingWithdraw = payload.pendingWithdraw
        state.successWithdraw = payload.successWithdraw
        state.totalAmount = payload.totalAmount
        state.withdrawAmount = payload.withdrawAmount
        state.pendingAmount = payload.pendingAmount
        state.availableAmount = payload.availableAmount
    }
  },
});

export const {messageClear} = paymentReducer.actions
export default paymentReducer.reducer