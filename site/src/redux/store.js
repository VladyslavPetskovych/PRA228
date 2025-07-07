import { configureStore } from "@reduxjs/toolkit";
import apartmentsReducer from "./apartmentsSlice";

const store = configureStore({
  reducer: {
    apartments: apartmentsReducer,
  },
});

export default store;
