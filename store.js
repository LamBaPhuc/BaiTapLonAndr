import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./features/orders/orderSlice";
import productReducer from "./features/products/productSlice";
import authReducer from "./features/auth/authSlice";
export const store = configureStore({
  reducer: {
    orders: orderReducer,
    products: productReducer,
    auth: authReducer,
  },
});
