import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { updateUser } from "../redux/slices/usersSlice";

const inputStyles = {
  mb: 2,
  input: { color: "#e4e4e7" },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#2c2c2c",
    borderColor: "#1e40af",
  },
  "& .MuiInputLabel-root": { color: "#e4e4e7" },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#00796b",
  },
};

function EditUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);

  const [user, setUser] = useState({ name: "", email: "" });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const existingUser = users.find((u) => u._id === id);
    if (existingUser) {
      setUser({ name: existingUser.name, email: existingUser.email });
    } else {
      setErrorMessage("User not found.");
    }
  }, [id, users]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, userData: user }))
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) =>
        setErrorMessage("Failed to update user. Please try again.")
      );
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, bgcolor: "#121212", color: "#e4e4e7" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit User
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        {loading && <Typography>Loading...</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            variant="outlined"
            value={user.name}
            onChange={handleChange}
            required
            sx={inputStyles}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={user.email}
            onChange={handleChange}
            required
            sx={inputStyles}
          />
          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#1e40af",
                "&:hover": { backgroundColor: "#4b6cb7" },
              }}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update User"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default EditUser;
