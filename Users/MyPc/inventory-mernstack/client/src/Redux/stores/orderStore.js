import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./orderSlice";
import customerSlice from "./customerSlice"
export const store = configureStore({
  reducer: {
    order: orderSlice,
    customer:customerSlice
    
  },
});
