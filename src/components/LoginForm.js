// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   TextField,
//   Button,
//   Typography,
//   Container,
//   Box,
//   Paper,
// } from "@mui/material";
// import GoogleLoginComponent from "./GoogleLoginComponent";


// function LoginForm() {
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const credentials = { name, password };

//           axios.post("http://localhost:3000/auth/login", credentials, {
//         withCredentials: true,
//           })
            
//       .then((response) => {
//         console.log("Login successful", response.data.token);
        
//         navigate("/profile"); // Redirect after login
//       })
//       .catch((error) => {
//         console.error("Login failed:", error);
//         setErrorMessage("Invalid credentials. Please try again.");
//           });
    
//       };


//   return (
//     <Container maxWidth="xs">
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           marginTop: 4,
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             p: 4,
//             bgcolor: "#121212",
//             color: "#e4e4e7",
//             width: "100%",
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h4" gutterBottom>
//             Login
//           </Typography>

//           {errorMessage && (
//             <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
//               {errorMessage}
//             </Typography>
//           )}

//           <form onSubmit={handleLogin}>
//             <TextField
//               label="Username"
//               variant="outlined"
//               fullWidth
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               sx={{
//                 marginBottom: 2,
//                 "& .MuiInputBase-root": {
//                   backgroundColor: "#333",
//                   color: "#e4e4e7",
//                 },
//                 "& .MuiInputLabel-root": { color: "#e4e4e7" },
//               }}
//             />
//             <TextField
//               label="Password"
//               type="password"
//               variant="outlined"
//               fullWidth
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               sx={{
//                 marginBottom: 2,
//                 "& .MuiInputBase-root": {
//                   backgroundColor: "#333",
//                   color: "#e4e4e7",
//                 },
//                 "& .MuiInputLabel-root": { color: "#e4e4e7" },
//               }}
//             />
//             <Button
//               variant="contained"
//               fullWidth
//               type="submit"
//               sx={{
//                 backgroundColor: "#1e40af",
//                 "&:hover": { backgroundColor: "#163b7b" },
//                 marginTop: 1,
//               }}
//             >
//               Login
//             </Button>
//           </form>
//           <GoogleLoginComponent />
//         </Paper>
//       </Box>
//     </Container>
//   );
// }

// export default LoginForm;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice"; // Import Redux action
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import GoogleLoginComponent from "./GoogleLoginComponent";

function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = { name, password };

    dispatch(loginUser(credentials))
      .unwrap()
      .then(() => {
        navigate("/profile"); // Redirect after login
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            bgcolor: "#121212",
            color: "#e4e4e7",
            width: "100%",
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          
          {error && <Typography>{error.message}</Typography>} 
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{
                marginBottom: 2,
                "& .MuiInputBase-root": {
                  backgroundColor: "#333",
                  color: "#e4e4e7",
                },
                "& .MuiInputLabel-root": { color: "#e4e4e7" },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                marginBottom: 2,
                "& .MuiInputBase-root": {
                  backgroundColor: "#333",
                  color: "#e4e4e7",
                },
                "& .MuiInputLabel-root": { color: "#e4e4e7" },
              }}
            />
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                backgroundColor: "#1e40af",
                "&:hover": { backgroundColor: "#163b7b" },
                marginTop: 1,
              }}
              disabled={isLoading} // Disable button while logging in
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
          <GoogleLoginComponent />
          <Typography
            variant="body2"
            sx={{ marginTop: 2, textAlign: "center" }}
          >
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#1e90ff" }}>
              Signup
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default LoginForm;
