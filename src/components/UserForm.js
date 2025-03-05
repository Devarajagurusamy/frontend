import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { createUser } from "../redux/slices/usersSlice";

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    dispatch(createUser({ name, email, password }))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: "center",
          mt: 5,
          bgcolor: "#121212",
          color: "#e4e4e7",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create User
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#333333",
                color: "#e4e4e7",
              },
              "& .MuiInputLabel-root": { color: "#e4e4e7" },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#333333",
                color: "#e4e4e7",
              },
              "& .MuiInputLabel-root": { color: "#e4e4e7" },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#333333",
                color: "#e4e4e7",
              },
              "& .MuiInputLabel-root": { color: "#e4e4e7" },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              width: "100%",
              backgroundColor: "#1e40af",
              "&:hover": { backgroundColor: "#163b7b" },
            }}
          >
            Create User
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default UserForm;
