import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import { composeWithDevTools } from "redux-devtools-extension";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },

  devTools: composeWithDevTools(),
  //   devTools: process.env.NODE_ENV !== 'production'
});

export default store;
