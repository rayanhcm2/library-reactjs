import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./Slices/bookSlice";
import searchReducer from "./Slices/searchSlice";
const store = configureStore({
  reducer: {
    library: bookReducer,
    search: searchReducer,
  }
});
export default store;
