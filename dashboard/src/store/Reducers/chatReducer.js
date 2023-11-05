import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

//1. Lấy khách hàng đang trò chuyện trả về seller
export const get_customers = createAsyncThunk(
  "chat/get_customers",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/seller/get-customers/${sellerId}`, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//2. Lấy tin nhắn của khách hàng trả về seller
export const get_customer_messages = createAsyncThunk(
  "chat/get_customer_messages",
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/chat/seller/get-customer-messages/${customerId}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    successMessage: "",
    errorMessage: "",
    customers: [],
    messages: [],
    activeCustomers: [],
    activeSellers: [],
    messageNotification: [],
    activeAdmin: "",
    friends: [],
    seller_admin_message: [],
    currentSeller: {},
    currentCustomer: {},
    sellers: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [get_customers.fulfilled]: (state, { payload }) => {
      state.customers = payload.customers;
    },
    [get_customer_messages.fulfilled]: (state, { payload }) => {
      state.messages = payload.messages;
      state.currentCustomer = payload.currentCustomer;
    },
  },
});

export const { messageClear } = chatReducer.actions;
export default chatReducer.reducer;
