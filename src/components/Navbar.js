import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a custom dark theme with the specified colors
const darkTheme = createTheme({
  palette: {
    mode: "dark", // Dark mode enabled
    primary: {
      main: "#1e40af", // Deep indigo blue for primary elements
    },
    secondary: {
      main: "#00796b", // Vibrant orange for secondary elements like buttons
    },
    background: {
      default: "#121212", // Dark charcoal gray for the background
    },
    text: {
      primary: "#e4e4e7", // Light gray text color
    },
  },
});

const Navbar = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      {/* Applying the custom dark theme */}
      <AppBar position="sticky" sx={{ backgroundColor: "#121212" }}>
        <Container>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Left Section: Website Title */}
            <Button
              component={Link}
              to="/"
              color="inherit"
              sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
            >
              Article Hub
            </Button>

            {/* Center Section: Navigation Links */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button component={Link} to="/users" color="inherit">
                Users
              </Button>
              <Button component={Link} to="/profile" color="inherit">
                Profile
              </Button>
              <Button component={Link} to="/posts" color="inherit">
                Posts
              </Button>
              <Button component={Link} to="/posts/create" color="inherit">
                Create Post
              </Button>
            </Box>

            {/* Right Section: Authentication Links */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                variant="outlined"
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                color="secondary"
                variant="contained"
              >
                Sign Up
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
