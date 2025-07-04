import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action for fetching posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("http://localhost:5000/api/posts");
  return response.data;
});

// Async action for deleting a post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await axios.delete(`http://localhost:5000/api/posts/${id}`);
  return id; // Return the post ID to delete it from the state
});

// Async action for creating a post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData) => {
    const response = await axios.post(
      "http://localhost:5000/api/posts",
      postData
    );
    console.log("=================>response.data",response.data);
    return response.data;
  }
);

// Async action for updating a post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, updatedPost }) => {
    const response = await axios.put(
      `http://localhost:5000/api/posts/${postId}`,
      updatedPost
    );
    return response.data; // Return the updated post
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create Post
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      // Delete Post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post._id !== action.payload);
      })
      // Update Post
      .addCase(updatePost.fulfilled, (state, action) => {
        // Find the post and update it in the state
        const index = state.posts.findIndex((post) => post._id === action.payload._id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      });
  },
});

export default postsSlice.reducer;
