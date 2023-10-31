import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

//1. Lấy dữ liệu dashboard cho seller
export const get_seller_dashboard_data = createAsyncThunk(
  "dashboard/get_seller_dashboard_data",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller/get-seller-dashboard-data`, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//2. Lấy dữ liệu dashboard cho admin
export const get_admin_dashboard_data = createAsyncThunk(
  "dashboard/get_admin_dashboard_data",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/get-admin-dashboard-data`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    totalSale: 0,
    totalOrder: 0,
    totalPendingOrder: 0,
    totalProduct: 0,
    totalSeller: 0,
    recentOrders: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [get_seller_dashboard_data.fulfilled]: (state, { payload }) => {
      state.totalSale = payload.totalSale;
      state.totalOrder = payload.totalOrder;
      state.totalPendingOrder = payload.totalPendingOrder;
      state.totalProduct = payload.totalProduct;
      state.recentOrders = payload.recentOrders;
    },
    [get_admin_dashboard_data.fulfilled]: (state, { payload }) => {
      state.totalSale = payload.totalSale;
      state.totalOrder = payload.totalOrder;
      state.totalSeller = payload.totalSeller
      state.totalProduct = payload.totalProduct;
      state.recentOrders = payload.recentOrders;
    },
  },
});

export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
