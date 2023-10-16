import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// 1.Lấy danh mục
export const get_category = createAsyncThunk(
  "product/get_category",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-category");
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

// 2. Lấy sản phẩm
export const get_products = createAsyncThunk(
  "product/get_products",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-products");
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const get_product = createAsyncThunk(
  "product/get_product",
  async (slug, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/get-product/${slug}`);
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

// 3. Sắp xếp theo giá
export const price_range_product = createAsyncThunk(
  "product/price_range_product",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/price-range-product");
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

//4. Truy vấn sản phẩm
export const query_products = createAsyncThunk(
  "product/query_products",
  async (query, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/query-products?category=${query.category}&&rating=${
          query.rating
        }&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${
          query.sortPrice
        }&&pageNumber=${query.pageNumber}&&searchValue=${
          query.searchValue ? query.searchValue : ""
        }`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

//5. Khách hàng review
export const customer_review = createAsyncThunk(
  "review/customer_review",
  async (info, { fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/customer/customer-review", info);
      return fulfillWithValue(data);
    } catch (error) {}
  }
);

//6. Lấy review của khách hàng
export const get_reviews = createAsyncThunk(
  "review/get_reviews",
  async ({ productId, pageNumber }, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {}
  }
);

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categorys: [],
    products: [],
    latest_product: [],
    topRating_product: [],
    discount_product: [],
    totalProduct: 0,
    parPage: 4,
    priceRange: {
      low: 1,
      high: 100,
    },
    product: {},
    relatedProducts: [],
    moreProducts: [],
    successMessage: "",
    errorMessage: "",
    totalReview: 0,
    rating_review: [],
    reviews: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [get_category.fulfilled]: (state, { payload }) => {
      state.categorys = payload.categorys;
    },
    [get_products.fulfilled]: (state, { payload }) => {
      state.products = payload.products;
      state.latest_product = payload.latest_product;
      state.topRating_product = payload.topRating_product;
      state.discount_product = payload.discount_product;
    },
    [get_product.fulfilled]: (state, { payload }) => {
      state.product = payload.product;
      state.relatedProducts = payload.relatedProducts;
      state.moreProducts = payload.moreProducts;
    },
    [price_range_product.fulfilled]: (state, { payload }) => {
      state.latest_product = payload.latest_product;
      state.priceRange = payload.priceRange;
    },
    [query_products.fulfilled]: (state, { payload }) => {
      state.products = payload.products;
      state.totalProduct = payload.totalProduct;
      state.parPage = payload.parPage;
    },
    [customer_review.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [get_reviews.fulfilled]: (state, { payload }) => {
      state.reviews = payload.reviews;
      state.totalReview = payload.totalReview;
      state.rating_review = payload.rating_review;
    },
  },
});

export const { messageClear } = homeReducer.actions;
export default homeReducer.reducer;
