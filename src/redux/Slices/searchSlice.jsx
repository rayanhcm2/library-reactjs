import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const fetchBooksByTitle = createAsyncThunk(
  "Books/fetchByTitleStatus",
  async (title, thunkAPI) => {
    try {
      const response = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=${title}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const searchSlice = createSlice({
  name: "search",
  initialState: { loading: false, fetchedBooks: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksByTitle.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooksByTitle.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedBooks = action.payload.items;
      })
      .addCase(fetchBooksByTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export { fetchBooksByTitle };
export default searchSlice.reducer;
