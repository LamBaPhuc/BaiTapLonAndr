import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { orderService } from "./orderService";

export const addProdToCart = createAsyncThunk(
  "order/cart/add",
  async (cartData, thunkAPI) => {
    try {
      return await orderService.addToCart(cartData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const getUserCart = createAsyncThunk(
  "order/cart/get",
  async (thunkAPI) => {
    try {
      return await orderService.getCart();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const getUserOrders = createAsyncThunk(
  "order/order/get",
  async (thunkAPI) => {
    try {
      return await orderService.getOrderByUserId();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const removeFrCart = createAsyncThunk(
  "order/cart/delete",
  async (id, thunkAPI) => {
    try {
      return await orderService.removeProductFromCart(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const updateFrCart = createAsyncThunk(
  "order/cart/update",
  async (updatedProduct, thunkAPI) => {
    try {
      return await orderService.updateProductQuantity(updatedProduct);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const addOrder = createAsyncThunk(
  "order/cart/checkout",
  async (order, thunkAPI) => {
    try {
      return await orderService.createOrder(order);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  orders: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProdToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProdToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProduct = action.payload;
      })
      .addCase(addProdToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userCart = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(removeFrCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFrCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.removedProduct = action.payload;
      })
      .addCase(removeFrCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateFrCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFrCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProduct = action.payload;
      })
      .addCase(updateFrCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedProduct = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cashOrderd = action.payload;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default orderSlice.reducer;
