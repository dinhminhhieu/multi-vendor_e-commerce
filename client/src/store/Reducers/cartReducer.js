import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

//1. Thêm sản phẩm vào giỏ hàng
export const add_to_cart = createAsyncThunk(
  "cart/add_to_cart",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/add-to-cart", info);
      //   console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

//2. Lấy sản phẩm trong giỏ hàng
export const get_cart_products = createAsyncThunk(
  "cart/get_cart_products",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get-cart-products/${userId}`
      );
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//3. Xóa sản phẩm trong giỏ hàng
export const delete_cart_product = createAsyncThunk(
  "cart/delete_card_product",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete-card-product/${cartId}`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//4. Tăng
export const quantity_inc = createAsyncThunk(
  "cart/quantity_inc",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-inc/${cartId}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//5. Giảm
export const quantity_dec = createAsyncThunk(
  "cart/quantity_dec",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-dec/${cartId}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//6. Thêm vào danh sách yêu thích
export const add_to_wishlist = createAsyncThunk(
  "wishlist/add_to_wishlist",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/add-to-wishlist", info);
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//7. Lấy danh sách yêu thích
export const get_wishlist = createAsyncThunk(
  "wishlist/get_wishlist",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get-wishlist/${userId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//8. Xóa danh sách yêu thích
export const remove_wishlist = createAsyncThunk(
  "wishlist/remove_wishlist",
  async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/remove-wishlist/${wishlistId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart_products: [],
    cart_product_count: 0,
    buy_product_item: 0,
    wishlist_count: 0,
    wishlist: [],
    price: 0,
    errorMessage: "",
    successMessage: "",
    shipping_fee: 0,
    outofstock_products: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [add_to_cart.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
    },
    [add_to_cart.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
      state.cart_product_count = state.cart_product_count + 1;
    },
    [get_cart_products.fulfilled]: (state, { payload }) => {
      state.cart_products = payload.cart_products;
      state.price = payload.price;
      state.cart_product_count = payload.cart_product_count;
      state.shipping_fee = payload.shipping_fee;
      state.outofstock_products = payload.outOfStockProduct;
      state.buy_product_item = payload.buy_product_item;
    },
    [delete_cart_product.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [quantity_inc.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [quantity_dec.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [add_to_wishlist.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
    },
    [add_to_wishlist.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
      state.wishlist_count =
        state.wishlist_count > 0 ? state.wishlist_count + 1 : 1;
    },
    [get_wishlist.fulfilled]: (state, { payload }) => {
      state.wishlist = payload.wishlists;
      state.wishlist_count = payload.wishlistCount;
    },
    [remove_wishlist.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
      state.wishlist = state.wishlist.filter(
        (p) => p._id !== payload.wishlistId
      );
      state.wishlist_count = state.wishlist_count - 1;
    },
  },
});

export const { messageClear } = cartReducer.actions;
export default cartReducer.reducer;
