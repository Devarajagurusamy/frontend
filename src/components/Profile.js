import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Alert,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, logoutUser } from "../redux/slices/authSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  console.log("Redux user state:", user); // 🔥 Debug Redux Store

  if (loading) {
    return (
      <Typography sx={{ color: "#E0E0E0", textAlign: "center", mt: 5 }}>
        Loading...
      </Typography>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
        <Paper
          elevation={5}
          sx={{
            p: 4,
            backgroundColor: "#1E1E1E",
            color: "#E0E0E0",
            borderRadius: "12px",
          }}
        >
          <Alert severity="warning">No user data found. Please log in.</Alert>
          <Button
            onClick={() => navigate("/login")}
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "teal",
              "&:hover": { backgroundColor: "#00796B" },
            }}
          >
            Go to Login
          </Button>
        </Paper>
      </Container>
    );
  }

  // ✅ Handle Logout
  const handleLogout = () => {
    dispatch(logoutUser()).then(() => navigate("/login"));
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={5}
        sx={{
          p: 4,
          textAlign: "center",
          mt: 5,
          backgroundColor: "#1E1E1E",
          color: "#E0E0E0",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h4" gutterBottom color="teal">
          Profile
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Avatar
            src={user.picture || "https://via.placeholder.com/150"}
            alt="Profile Picture"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
            {user.name || "Unknown User"}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: "#B0B0B0" }}>
            {user.email || "No email provided"}
          </Typography>
        </Box>
      </Paper>

      <Button
        onClick={handleLogout} // 🔥 Logout directly
        color="primary"
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: "teal",
          "&:hover": { backgroundColor: "#00796B" },
        }}
      >
        Logout
      </Button>
    </Container>
  );
}

export default Profile;
