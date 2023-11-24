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

//4. Lấy tin nhắn của seller trả về admin
export const get_sellers = createAsyncThunk(
  "chat/get_sellers",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/admin/get-sellers`, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//5. Gửi tin nhắn từ admin đến seller
export const send_message_sellers_admin = createAsyncThunk(
  "chat/send_message_sellers_admin",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/chat/admin/send-message-sellers-admin`,
        info,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//6. Lấy tin nhắn của admin trả về seller
export const get_admin_messages = createAsyncThunk(
  "chat/get_admin_message",
  async (receverId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-admin-messages/${receverId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//7. Lấy tin nhắn của seller trả về admin
export const get_seller_messages = createAsyncThunk(
  "chat/get_seller_messages",
  async (receverId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-seller-messages`, {
        withCredentials: true,
      });
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
      state.activeCustomers = payload;
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
    [get_sellers.fulfilled]: (state, { payload }) => {
      state.sellers = payload.sellers;
    },
    [send_message_sellers_admin.fulfilled]: (state, { payload }) => {
      state.seller_admin_message = [
        ...state.seller_admin_message,
        payload.message,
      ];
      state.successMessage = "Gửi tin nhắn thành công!";
    },
    [get_admin_messages.fulfilled]: (state, { payload }) => {
      state.seller_admin_message = payload.messages;
      state.currentSeller = payload.currentSeller;
    },
    [get_seller_messages.fulfilled]: (state, { payload }) => {
      state.seller_admin_message = payload.messages;
    },
  },
});

export const {
  messageClear,
  updateMessage,
  updateCustomer,
  updateSeller,
  updateAdminMessage,
  updateSellerMessage,
  activeStatus_update,
} = chatReducer.actions;
export default chatReducer.reducer;
