import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById, updatePost } from "../redux/slices/postsSlice";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

function EditPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postDetail, isLoading, error } = useSelector((state) => state.posts);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (postDetail) {
      setTitle(postDetail.title || "");
      setContent(postDetail.content || "");
    }
  }, [postDetail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePost({ id, title, content })).unwrap();
      navigate("/");
    } catch (err) {
      setErrorMessage("Failed to update post. Please try again.");
    }
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
          Edit Post
        </Typography>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isLoading}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#333333",
                color: "#e4e4e7",
              },
              "& .MuiInputLabel-root": {
                color: "#e4e4e7",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#1e40af",
                },
                "&:hover fieldset": {
                  borderColor: "#163b7b",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1e40af",
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Content"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={isLoading}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#333333",
                color: "#e4e4e7",
              },
              "& .MuiInputLabel-root": {
                color: "#e4e4e7",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#1e40af",
                },
                "&:hover fieldset": {
                  borderColor: "#163b7b",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1e40af",
                },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: 2,
              width: "100%",
              backgroundColor: "#1e40af",
              "&:hover": { backgroundColor: "#163b7b" },
            }}
          >
            {isLoading ? "Updating..." : "Update Post"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default EditPost;
