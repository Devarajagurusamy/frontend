import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/posts";

// ✅ Create a new post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ title, content, author }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_URL,
        { title, content, author },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create post"
      );
    }
  }
);

// ✅ Update post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, title, content }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/${id}`,
        { title, content },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message || "Failed to update post");
    }
  }
);

// ✅ Fetch all posts with pagination
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page = 1, limit = 5 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}?page=${page}&limit=${limit}`
      );
      return response.data; // { data: [], totalPages }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch posts"
      );
    }
  }
);

// ✅ Fetch a single post by ID
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data; // { title, content, author, etc. }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch post"
      );
    }
  }
);




// ✅ Delete post with authentication
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        withCredentials: true, // ✅ Ensures cookies are sent
      });
      return id; // ✅ Return post ID to update Redux state
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Failed to delete post"
      );
    }
  }
);


const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    postDetail: null, // Store single post details
    totalPages: 1,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Handle createPost
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.unshift(action.payload); // Add the new post at the beginning
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ✅ Fetch all posts
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.data;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ✅ Fetch single post
      .addCase(fetchPostById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postDetail = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ✅ Delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✅ Update post
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postDetail = action.payload; // ✅ Ensure postDetail is updated
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ); // ✅ Update post in the list
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
