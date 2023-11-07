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

//3. Gửi tin nhắn từ seller đến khách hàng
export const send_message_customers = createAsyncThunk(
  "chat/send_message_customers",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/chat/seller/send-message-customers`,
        info,
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
    updateMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
    updateCustomer: (state, { payload }) => {
      state.activeCustomer = payload;
    },
    updateSeller: (state, { payload }) => {
      state.activeSellers = payload;
    },
    updateAdminMessage: (state, { payload }) => {
      state.seller_admin_message = [...state.seller_admin_message, payload];
    },
    updateSellerMessage: (state, { payload }) => {
      state.seller_admin_message = [...state.seller_admin_message, payload];
    },
    activeStatus_update: (state, { payload }) => {
      state.activeAdmin = payload.status;
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
    [send_message_customers.fulfilled]: (state, { payload }) => {
      let tempFriends = state.customers;
      let index = tempFriends.findIndex(
        (f) => f.fdId === payload.message.receverId
      );
      while (index > 0) {
        let temp = tempFriends[index];
        tempFriends[index] = tempFriends[index - 1];
        tempFriends[index - 1] = temp;
        index--;
      }
      state.customers = tempFriends;
      state.messages = [...state.messages, payload.message];
      state.successMessage = "Gửi tin nhắn thành công!";
    },
  },
});

export const { messageClear, updateMessage, updateCustomer, updateSeller, updateAdminMessage, updateSellerMessage, activeStatus_update } = chatReducer.actions;
export default chatReducer.reducer;
