// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // ✅ Google Login (POST request)
// export const googleLogin = createAsyncThunk(
//   "auth/googleLogin",
//   async (token, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/auth/google",
//         { token },
//         { withCredentials: true }
//       );
//       console.log("authslice----->",response.data)
//       return response.data; // User data from backend
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Google login failed"
//       );
//     }
//   }
// );

// // ✅ Fetch user profile (GET request)
// export const fetchUserProfile = createAsyncThunk(
//   "auth/fetchUserProfile",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("http://localhost:3000/auth/profile", {
//         withCredentials: true,
//       });

//       console.log("Profile API Response:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Profile fetch error:", error.response?.data || error);
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch user"
//       );
//     }
//   }
// );

// // ✅ Normal Login (POST request)
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/auth/login",
//         credentials,
//         { withCredentials: true }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );

// // ✅ Logout user (POST request)
// export const logoutUser = createAsyncThunk(
//   "auth/logoutUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       await axios.post(
//         "http://localhost:3000/auth/logout",
//         {},
//         { withCredentials: true }
//       );
//       return null; // Reset user state
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Logout failed");
//     }
//   }
// );

// // ✅ Redux Slice
// const authSlice = createSlice({
//   name: "auth",
//   initialState: { user: null, loading: false, error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // ✅ Google Login Cases
//       .addCase(googleLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(googleLogin.fulfilled, (state, action) => {
//         console.log("User stored in Redux (Google Login):", action.payload);
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(googleLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ Normal Login Cases
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         console.log("User stored in Redux (Normal Login):", action.payload);
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ Fetch User Profile Cases
//       .addCase(fetchUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         console.log("User stored in Redux (Profile Fetch):", action.payload);
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ Logout Cases
//       .addCase(logoutUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default authSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Load user from localStorage
const loadUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error loading user from localStorage", error);
    return null;
  }
};

// ✅ Google Login (POST request)
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/google",
        { token },
        { withCredentials: true }
      );
      localStorage.setItem("user", JSON.stringify(response.data)); // Save user
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Google login failed"
      );
    }
  }
);

// ✅ Fetch user profile (GET request)
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/auth/profile", {
        withCredentials: true,
      });
      localStorage.setItem("user", JSON.stringify(response.data)); // Save user
      return response.data;
    } catch (error) {
      console.error("Profile fetch error:", error.response?.data || error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// ✅ Normal Login (POST request)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        credentials,
        { withCredentials: true }
      );
      localStorage.setItem("user", JSON.stringify(response.data)); // Save user
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Logout user (POST request)
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("user"); // Clear user data
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// ✅ Redux Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: loadUserFromLocalStorage(),
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Google Login Cases
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Normal Login Cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch User Profile Cases
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Logout Cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;