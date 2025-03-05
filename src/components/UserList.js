import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import { fetchUsers, deleteUser } from "../redux/slices/usersSlice";

function UserList() {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers()); // Fetch users when component mounts
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id)); // Dispatch delete action
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 3,
          bgcolor: "#121212", // Dark background
          p: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" sx={{ color: "#e4e4e7" }}>
          User List
        </Typography>
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          sx={{
            backgroundColor: "#1e40af",
            color: "white",
            "&:hover": { backgroundColor: "#162c7b" },
          }}
        >
          Create User
        </Button>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            bgcolor: "#2c2c2c",
            color: "#e4e4e7",
            borderRadius: 2,
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#1e1e1e" }}>
                <TableCell sx={{ color: "#e4e4e7" }}>
                  <strong>Name</strong>
                </TableCell>
                <TableCell sx={{ color: "#e4e4e7" }}>
                  <strong>Email</strong>
                </TableCell>
                <TableCell align="center" sx={{ color: "#e4e4e7" }}>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{ bgcolor: index % 2 ? "#202020" : "#2c2c2c" }}
                >
                  <TableCell sx={{ color: "#e4e4e7" }}>{user.name}</TableCell>
                  <TableCell sx={{ color: "#e4e4e7" }}>{user.email}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(user._id)}
                      sx={{
                        backgroundColor: "#ff9800",
                        color: "#121212",
                        "&:hover": { backgroundColor: "#e68900" },
                        mr: 1,
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      component={Link}
                      to={`/edit/${user._id}`}
                      variant="contained"
                      sx={{
                        backgroundColor: "#1e40af",
                        color: "white",
                        "&:hover": { backgroundColor: "#162c7b" },
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default UserList;
