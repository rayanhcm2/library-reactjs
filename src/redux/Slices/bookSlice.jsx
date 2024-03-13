import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  book: [],
};
const storedData = JSON.parse(localStorage.getItem("booksData")) || [];
initialState.book = storedData;
const helperData = (action) => {
  return {
    id: uuidv4(),
    title: action.payload.title,
    author: action.payload.author,
  };
};
const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    ADD_BOOKS: (state, action) => {
      state.book = [...state.book, helperData(action)];
      localStorage.setItem("booksData", JSON.stringify(state.book));
    },
    DELETE_BOOK: (state, action) => {
      state.book = state.book.filter((book) => book.id !== action.payload.id);
      localStorage.setItem("booksData", JSON.stringify(state.book));
    },
    DELETE_ALL_BOOKS: (state) => {
      state.book = [];
      localStorage.setItem("booksData", JSON.stringify(state.book));
    },
  },
});
export const { ADD_BOOKS, DELETE_BOOK,DELETE_ALL_BOOKS } = bookSlice.actions;
export default bookSlice.reducer;
