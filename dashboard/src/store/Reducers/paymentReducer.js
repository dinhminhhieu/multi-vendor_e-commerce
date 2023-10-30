import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

//1. Lấy seller yêu cầu thanh toán
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

//2. Gửi yêu cầu rút tiền
export const send_withdraw_request = createAsyncThunk(
  "payment/send_withdraw_request",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/payment/send-withdraw-request`, info, {
        withCredentials: true,
      });
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
    [get_seller_payment_request.fulfilled]: (state, { payload }) => {
      state.pendingWithdraw = payload.pendingWithdraw;
      state.successWithdraw = payload.successWithdraw;
      state.totalAmount = payload.totalAmount;
      state.withdrawAmount = payload.withdrawAmount;
      state.pendingAmount = payload.pendingAmount;
      state.availableAmount = payload.availableAmount;
    },
    [send_withdraw_request.pending]: (state, _) => {
      state.loader = true
    },
    [send_withdraw_request.rejected]: (state, {payload}) => {
      state.loader = false
      state.errorMessage = payload.message
    },
    [send_withdraw_request.fulfilled]: (state, {payload}) => {
      state.loader = false
      state.successMessage = state.message
      state.pendingWithdraw = [...state.pendingWithdraw, payload.withdraw]
      state.availableAmount = state.availableAmount - payload.withdraw.amount
      state.pendingAmount = payload.withdraw.amount
    }
  },
});

export const { messageClear } = paymentReducer.actions;
export default paymentReducer.reducer;
