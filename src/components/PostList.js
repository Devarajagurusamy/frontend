import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../redux/slices/postsSlice"; // Import deletePost action
import {
  Button,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

function PostList() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { posts, isLoading, error, totalPages } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts({ page, limit: 5 })); // Fetch posts with pagination
  }, [dispatch, page]);

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <Container sx={{ bgcolor: "#121212", color: "#e4e4e7", p: 3, mt: 6 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#f0f0f0" }}>
        Post List
      </Typography>

      <Box mb={2}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#3f51b5",
            color: "#fff",
            "&:hover": { backgroundColor: "#2c387e" },
          }}
          component={Link}
          to="/posts/create"
        >
          Create New Post
        </Button>
      </Box>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <List>
          {posts.map((post, index) => (
            <ListItem
              key={post._id}
              divider
              sx={{
                bgcolor: index % 2 ? "#212121" : "#282828",
              }}
            >
              <ListItemText
                primary={
                  <Link
                    to={`/posts/${post._id}`}
                    style={{
                      color: "#ffeb3b",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    {post.title}
                  </Link>
                }
              />
              <Box ml={2}>
                <Button
                  variant="outlined"
                  sx={{
                    color: "#4caf50",
                    borderColor: "#4caf50",
                    "&:hover": {
                      borderColor: "#388e3c",
                      backgroundColor: "#333",
                    },
                  }}
                  size="small"
                  component={Link}
                  to={`/posts/edit/${post._id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#f44336",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#d32f2f" },
                    ml: 1,
                  }}
                  size="small"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          variant="outlined"
          sx={{
            color: "#e4e4e7",
            borderColor: "#e4e4e7",
            "&:hover": { borderColor: "#3f51b5", backgroundColor: "#2c2c2c" },
          }}
          onClick={prevPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "#e4e4e7",
            borderColor: "#e4e4e7",
            "&:hover": { borderColor: "#3f51b5", backgroundColor: "#2c2c2c" },
          }}
          onClick={nextPage}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}

export default PostList;
