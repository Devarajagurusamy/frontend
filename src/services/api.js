import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

// Login API: Authenticate user and return a token
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Error logging in"
    );
  }
};

// Get list of users (for admin or authenticated user)
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Error fetching users"
    );
  }
};

// Get a single user's data by ID
export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Error fetching user"
    );
  }
};

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Error creating user"
    );
  }
};

// Update an existing user's information
export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.patch(
      `${API_URL}/users/${userId}`,
      updatedData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Error updating user"
    );
  }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Error deleting user"
    );
  }
};
