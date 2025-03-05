import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/slices/postsSlice";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state) => state.posts);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ title, content, author }))
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => console.error("Post creation error:", err));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, bgcolor: "#121212", borderRadius: 2 }}>
        <Typography variant="h4" color="#e4e4e7" gutterBottom>
          Create Post
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>

          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ mb: 2, backgroundColor: "#2c2c2c" }}
            InputLabelProps={{ style: { color: "#e4e4e7" } }} // Label color
            InputProps={{ style: { color: "#e4e4e7" } }} // Text color
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            multiline
            rows={4}
            sx={{ mb: 2, backgroundColor: "#2c2c2c" }}
            InputLabelProps={{ style: { color: "#e4e4e7" } }} // Label color
            InputProps={{ style: { color: "#e4e4e7" } }} // Text color
          />
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            sx={{ mb: 2, backgroundColor: "#2c2c2c" }}
            InputLabelProps={{ style: { color: "#e4e4e7" } }} // Label color
            InputProps={{ style: { color: "#e4e4e7" } }} // Text color
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{
              backgroundColor: "#1e40af",
              "&:hover": { backgroundColor: "#1565c0" },
              mt: 2,
            }}
          >
            {isLoading ? "Creating..." : "Create Post"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default CreatePost;
