import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostById, deletePost } from "../redux/slices/postsSlice";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

function PostDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    postDetail: post,
    isLoading,
    error,
  } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(id)).then(() => {
        alert("Post deleted successfully!");
        navigate("/");
      });
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress color="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!post) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, bgcolor: "#121212", color: "#e4e4e7" }}>
        <Typography variant="h4" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {post.content}
        </Typography>
        <Typography variant="subtitle1" color="#a3a3a3">
          Author: {post.author}
        </Typography>

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{
              backgroundColor: "#d32f2f",
              "&:hover": { backgroundColor: "#b71c1c" },
            }}
          >
            Delete Post
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: "#1e40af",
              "&:hover": { backgroundColor: "#4b6cb7" },
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default PostDetail;
