import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import commentsReducer from "./commentsSlice";
import { composeWithDevTools } from "redux-devtools-extension";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },

  devTools: composeWithDevTools(),
  //   devTools: process.env.NODE_ENV !== 'production'
});

export default store;
