import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action for fetching comments for a specific post
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId) => {
    const response = await axios.get(`http://localhost:5000/api/comments/${postId}`);
    return response.data; // Return the comments array
  }
);

// Async action for adding a new comment
export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ postId, name, message }) => {
    const response = await axios.post(`http://localhost:5000/api/comments/${postId}`, { name, message });
    return response.data; // Return the newly added comment
  }
);

// Async action for deleting a comment
export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId) => {
    await axios.delete(`http://localhost:5000/api/comments/${commentId}`);
    return commentId; // Return the comment ID to delete it from the state
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add Comment
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      // Delete Comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(comment => comment._id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;